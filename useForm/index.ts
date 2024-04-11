/** @format */

import { Props, Store } from './types';
import { useRef } from 'react';
import { useLatest, useStore } from '@yd/r-hooks';
import { useFetch } from '../index';
import { ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';

export default <P extends Record<string, any>>({
    layout = 'horizontal',
    span = 3,
    submitUrl,
    updateUrl,
    formatParams = (params) => params,
    done
}: Props<P>) => {
    const fetch = useFetch();
    const { status, ctx, dispatch } = useStore<Store>({
        status: 'ADD',
        ctx: {}
    });
    const formRef = useRef<ProFormInstance>();
    const onFinish = useLatest(async (params: P) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](
            status === 'ADD' ? submitUrl! : updateUrl!,
            formatParams({ ...params, ...ctx })
        );
        done?.(res);
        message.success('保存成功');
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
    return {
        formOpts: {
            formRef,
            onFinish,
            layout,
            labelCol: { span }
        },
        onSave,
        onFieldsValue
    };
};
