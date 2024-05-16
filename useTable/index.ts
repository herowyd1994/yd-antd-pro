/** @format */

import { ActionType } from '@ant-design/pro-components';
import { Props, Store, Params } from './types';
import { ReactNode, useRef } from 'react';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useFetch, useModal } from '../index';
import { message, ModalFuncProps } from 'antd';

export default <D extends Record<string, any>>({
    columns,
    pageSize: defaultPageSize = 10,
    width: x,
    requestUrl,
    removeUrl,
    updateUrl,
    refs,
    formatParams = (params) => params,
    formatData = (data) => data
}: Props<D>) => {
    const { get, del, put } = useFetch();
    const { confirm } = useModal();
    const { params, data, total, dispatch } = useStore<Store<D>>({
        params: {},
        data: [],
        total: 0
    });
    const actionRef = useRef<ActionType>();
    const request = async (params: Params) => {
        params = await formatParams(params);
        params = { ...params, pageNum: params.current };
        let { list: data, total } = await get(requestUrl!, params)
            .then((list) => (Array.isArray(list) ? { list, total: list.length } : list))
            .catch(() => ({ list: [], total: 0 }));
        data = await formatData(data);
        dispatch({ params, data, total });
        return { data, success: true, total };
    };
    const onRemove = async (
        params: Record<string, any>,
        content?: ReactNode,
        title: ReactNode = '确认删除',
        options?: ModalFuncProps
    ) => {
        content && (await confirm(content, title, options));
        await del(removeUrl!, params);
        await actionRef.current?.reloadAndRest?.();
        message.success('删除成功');
    };
    const onUpdate = async (
        params: Record<string, any>,
        content?: ReactNode,
        title: ReactNode = '确认更新',
        options?: ModalFuncProps
    ) => {
        content && (await confirm(content, title, options));
        await put(updateUrl!, params);
        await actionRef.current?.reloadAndRest?.();
        message.success('更新成功');
    };
    useUpdate(() => refs?.forEach((ref) => (ref.current = actionRef.current)), [actionRef.current]);
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
