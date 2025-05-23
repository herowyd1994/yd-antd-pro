/** @format */

import { ActionType } from '@ant-design/pro-components';
import { Props, Store } from './types';
import { ReactNode, useRef } from 'react';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useFetch, useInteractive } from '../index';
import { message, ModalFuncProps } from 'antd';

export default <D extends Record<string, any>>({
    columns,
    pageSize: defaultPageSize = 10,
    width: x,
    requestUrl,
    removeUrl,
    updateUrl,
    refs,
    formatParams = params => params,
    formatData = data => data,
    ...props
}: Props<D>) => {
    const { get, del, put } = useFetch();
    const { confirm } = useInteractive();
    const { params, data, total, $dispatch } = useStore<Store<D>>({
        params: {},
        data: [],
        total: 0
    });
    const actionRef = useRef<ActionType>();
    const request = async (params: Record<string, any>) => {
        params = await formatParams({ ...params, pageNum: params.current });
        let { list: data, total } = await get(requestUrl!, params, {
            ...props,
            formatData: list => (Array.isArray(list) ? { list, total: list.length } : list)
        }).catch(() => ({ list: [], total: 0 }));
        data = await formatData(data);
        $dispatch({ params, data, total });
        return {
            data,
            success: true,
            total
        };
    };
    const onRemove = async (
        params: Record<string, any>,
        content?: ReactNode,
        title: ReactNode = '确认删除',
        options?: ModalFuncProps
    ) => {
        content && (await confirm(content, title, options));
        await del(removeUrl!, params);
        await actionRef.current?.reload();
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
        await actionRef.current?.reload();
        message.success('更新成功');
    };
    useUpdate(() => refs?.forEach(ref => (ref.current = actionRef.current)), [actionRef.current]);
    return {
        tableProps: {
            actionRef,
            columns,
            request,
            search: { defaultCollapsed: false, labelWidth: 'auto' as 'auto' },
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
