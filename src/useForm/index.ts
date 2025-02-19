/** @format */

import { Props, Store } from './types';
import { useRef } from 'react';
import { useLock, useStore } from '@yd/r-hooks';
import { useFetch, useCache } from '../index';
import { isNone } from '@yd/utils';
import { ActionType, ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';

export default <D>({
    layout = 'horizontal',
    span = 3,
    delay,
    toast = true,
    submitUrl,
    updateUrl,
    request: { url, params, status: s, ...c1 } = { url: '' },
    done,
    ...c2
}: Props<D>) => {
    const fetch = useFetch();
    const { status, ctx, $dispatch } = useStore<Store>({
        status: 'ADD',
        ctx: {}
    });
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const { done: onFinish } = useLock(async (params: Record<string, any>) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](
            status === 'ADD' ? submitUrl! : updateUrl!,
            { ...params, ...ctx },
            c2
        );
        await done?.(res);
        await actionRef.current?.reload();
        toast && message.success(`${status === 'ADD' ? '提交' : '更新'}成功`);
        return res;
    }, delay);
    const onSave = async (params?: Record<string, any>, status?: Store['status']) => {
        status && (await $dispatch({ status }));
        return onFinish({ ...(await formRef.current?.validateFields()), ...params });
    };
    const setFieldsValue = async (
        params: Record<string, any> = {},
        ctx: Store['ctx'] = {},
        status: Store['status'] = 'EDIT'
    ) => {
        await $dispatch({ status, ctx });
        formRef.current?.setFieldsValue(params);
    };
    const request = useCache(url, params, {
        ...c1,
        immediate: !isNone(params),
        done: async data => setFieldsValue(data, params, s)
    });
    return {
        formProps: {
            formRef,
            onFinish,
            layout,
            labelCol: { span }
        },
        status,
        actionRef,
        onSave,
        setFieldsValue,
        ...request
    };
};
