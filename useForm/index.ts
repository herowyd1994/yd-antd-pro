/** @format */

import { Props, Store } from './types';
import { useRef } from 'react';
import { useLock, useStore } from '@yd/r-hooks';
import { useFetch, useGet } from '../index';
import { isNone } from '@yd/utils';
import { ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';

export default <P extends Record<string, any>>({
    layout = 'horizontal',
    span = 3,
    submitUrl,
    updateUrl,
    requestProps: { url, params, status: s, formatData = (data) => data, ...props },
    formatParams = (params) => params,
    done
}: Props<P>) => {
    const fetch = useFetch();
    const { status, ctx, dispatch } = useStore<Store>({
        status: 'ADD',
        ctx: {}
    });
    const formRef = useRef<ProFormInstance>();
    const { done: onFinish } = useLock(async (params: P) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](
            status === 'ADD' ? submitUrl! : updateUrl!,
            await formatParams({ ...params, ...ctx })
        );
        done?.(res);
        message.success(`${status === 'ADD' ? '提交' : '更新'}成功`);
        return res;
    });
    const onSave = async (params?: Record<string, any>, status?: Store['status']) => {
        status && (await dispatch({ status }));
        return onFinish({ ...(await formRef.current?.validateFields()), ...params });
    };
    const onFieldsValue = async (
        params: Record<string, any> = {},
        ctx: Store['ctx'] = {},
        status: Store['status'] = 'EDIT'
    ) => {
        await dispatch({ status, ctx });
        formRef.current?.setFieldsValue(params);
    };
    useGet(url, params, {
        immediate: !isNone(params),
        done: async (data) => onFieldsValue(await formatData(data), params, s),
        ...props
    });
    return {
        formProps: {
            formRef,
            onFinish,
            layout,
            labelCol: { span }
        },
        onSave,
        onFieldsValue
    };
};
