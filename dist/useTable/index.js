import { useRef } from 'react';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useFetch, useInteractive } from '../index';
import { message } from 'antd';
export default ({ columns, pageSize: defaultPageSize = 10, width: x, requestUrl, removeUrl, updateUrl, refs, formatParams = params => params, formatData = data => data }) => {
    const { get, del, put } = useFetch();
    const { confirm } = useInteractive();
    const { params, data, total, dispatch } = useStore({
        params: {},
        data: [],
        total: 0
    });
    const actionRef = useRef();
    const request = async (params) => {
        params = await formatParams(params);
        params = { ...params, pageNum: params.current };
        let { list: data, total } = await get(requestUrl, params)
            .then(list => (Array.isArray(list) ? { list, total: list.length } : list))
            .catch(() => ({ list: [], total: 0 }));
        data = await formatData(data);
        dispatch({ params, data, total });
        return {
            data,
            success: true,
            total
        };
    };
    const onRemove = async (params, content, title = '确认删除', options) => {
        content && (await confirm(content, title, options));
        await del(removeUrl, params);
        await actionRef.current?.reload();
        message.success('删除成功');
    };
    const onUpdate = async (params, content, title = '确认更新', options) => {
        content && (await confirm(content, title, options));
        await put(updateUrl, params);
        await actionRef.current?.reload();
        message.success('更新成功');
    };
    useUpdate(() => refs?.forEach(ref => (ref.current = actionRef.current)), [actionRef.current]);
    return {
        tableProps: {
            actionRef,
            columns,
            request,
            search: { defaultCollapsed: false, labelWidth: 'auto' },
            pagination: { showSizeChanger: true, showQuickJumper: true, defaultPageSize },
            scroll: { x }
        },
        params,
        data,
        total,
        onRemove,
        onUpdate
    };
};
