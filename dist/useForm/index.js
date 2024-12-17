import { useRef } from 'react';
import { useLock, useStore } from '@yd/r-hooks';
import { useFetch, useGet } from '../index';
import { isNone } from '@yd/utils';
import { message } from 'antd';
export default ({ layout = 'horizontal', span = 3, delay, toast = true, submitUrl, updateUrl, request: { url, params, status: s, ...c1 } = { url: '' }, done, ...c2 }) => {
    const fetch = useFetch();
    const { status, ctx, dispatch } = useStore({
        status: 'ADD',
        ctx: {}
    });
    const formRef = useRef();
    const actionRef = useRef();
    const { done: onFinish } = useLock(async (params) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](status === 'ADD' ? submitUrl : updateUrl, { ...params, ...ctx }, c2);
        await done?.(res);
        await actionRef.current?.reload();
        toast && message.success(`${status === 'ADD' ? '提交' : '更新'}成功`);
        return res;
    }, delay);
    const onSave = async (params, status) => {
        status && (await dispatch({ status }));
        return onFinish({ ...(await formRef.current?.validateFields()), ...params });
    };
    const setFieldsValue = async (params = {}, ctx = {}, status = 'EDIT') => {
        await dispatch({ status, ctx });
        formRef.current?.setFieldsValue(params);
    };
    const request = useGet(url, params, {
        ...c1,
        immediate: !isNone(params),
        done: async (data) => setFieldsValue(data, params, s)
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
