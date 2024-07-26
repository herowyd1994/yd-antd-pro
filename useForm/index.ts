/** @format */

import { Props, Store } from './types';
import { useRef } from 'react';
import { useLock, useStore } from '@yd/r-hooks';
import { useFetch, useGet } from '../index';
import { isNone } from '@yd/utils';
import { ActionType, ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';

export default <P extends Record<string, any>>({
    layout = 'horizontal',
    span = 3,
    delay,
    submitUrl,
    updateUrl,
    requestProps: { url, params, status: s, formatData = data => data, ...props } = { url: '' },
    formatParams = params => params,
    done
}: Props<P>) => {
    const fetch = useFetch();
    const { status, ctx, dispatch } = useStore<Store>({
        status: 'ADD',
        ctx: {}
    });
    const formRef = useRef<ProFormInstance>();
    const actionRef = useRef<ActionType>();
    const { done: onFinish } = useLock(async (params: P) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](
            status === 'ADD' ? submitUrl! : updateUrl!,
            await formatParams({ ...params, ...ctx })
        );
        await actionRef.current?.reload();
        done?.(res);
        message.success(`${status === 'ADD' ? '提交' : '更新'}成功`);
        return res;
    }, delay);
    const onSave = async (params?: Record<string, any>, status?: Store['status']) => {
        status && (await dispatch({ status }));
        return onFinish({ ...(await formRef.current?.validateFields()), ...params });
    };
    const setFieldsValue = async (
        params: Record<string, any> = {},
        ctx: Store['ctx'] = {},
        status: Store['status'] = 'EDIT'
    ) => {
        await dispatch({ status, ctx });
        formRef.current?.setFieldsValue(params);
    };
    const request = useGet(url, params, {
        immediate: !isNone(params),
        done: async data => setFieldsValue(await formatData(data), params, s),
        ...props
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
