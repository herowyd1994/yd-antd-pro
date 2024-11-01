import { useRef } from 'react';
import { useLock, useStore } from '@yd/r-hooks';
import { useFetch, useGet } from '../index';
import { isNone } from '@yd/utils';
import { message } from 'antd';
export default ({ layout = 'horizontal', span = 3, delay, toast = true, submitUrl, updateUrl, requestProps: { url, params, status: s, formatData = data => data, ...props } = { url: '' }, formatParams = params => params, done }) => {
    const fetch = useFetch();
    const { status, ctx, dispatch } = useStore({
        status: 'ADD',
        ctx: {}
    });
    const formRef = useRef();
    const actionRef = useRef();
    const { done: onFinish } = useLock(async (params) => {
        const res = await fetch[status === 'ADD' ? 'post' : 'put'](status === 'ADD' ? submitUrl : updateUrl, await formatParams({ ...params, ...ctx }));
        await actionRef.current?.reload();
        await done?.(res);
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
        immediate: !isNone(params),
        done: async (data) => setFieldsValue(await formatData(data), params, s),
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
