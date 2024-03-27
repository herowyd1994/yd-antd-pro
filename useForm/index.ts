/** @format */

import { Props, Store, Params } from './types';
import { useRef } from 'react';
import { useLatest, useStore } from '@yd/r-hooks';
import { useFetch } from '../index';
import { ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';

export default <P extends Record<string, any>>({
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
    const onFinish = useLatest(async (params: Params<P>) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](
            status === 'ADD' ? submitUrl! : updateUrl!,
            formatParams({ ...params, ...ctx })
        );
        await done?.();
        message.success('保存成功');
        return res;
    });
    const onSave = async (params?: Record<string, any>, status?: Store['status']) => {
        status && (await dispatch({ status }));
        onFinish({ ...params, ...(await formRef.current?.validateFields()) });
    };
    const onAdd = async (params: Record<string, any> = {}, ctx: Record<string, any> = {}) => {
        await dispatch({ status: 'ADD', ctx });
        formRef.current?.setFieldsValue(params);
    };
    const onEdit = async (params: Record<string, any> = {}, ctx: Record<string, any> = {}) => {
        await dispatch({ status: 'EDIT', ctx });
        formRef.current?.setFieldsValue(params);
    };
    return {
        formOpts: {
            formRef,
            onFinish,
            layout: 'horizontal',
            labelCol: { span: 3 }
        },
        onSave,
        onAdd,
        onEdit
    };
};
