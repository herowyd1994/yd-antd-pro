/** @format */

import { Props, Store } from './types';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useForm } from '../index';
import { Store as FormStore } from '../useForm/types';

export default <D>({ title = tip => tip, ...props }: Props<D>) => {
    const {
        formProps: { formRef, onFinish: finish, ...p },
        status,
        setFieldsValue,
        ...form
    } = useForm(props);
    const { visible, dispatch } = useStore<Store>({ visible: false });
    const onVisibleChange = (visible: boolean) => dispatch({ visible });
    const onFinish = async (params: Record<string, any>) => {
        await finish(params);
        onVisibleChange(false);
    };
    const onShow = async (
        params?: Record<string, any>,
        ctx?: FormStore['ctx'],
        status: FormStore['status'] = 'ADD'
    ) => {
        onVisibleChange(true);
        setFieldsValue(params, ctx, status);
    };
    useUpdate(() => !visible && formRef.current?.resetFields(), [visible]);
    return {
        ...form,
        modalFormProps: {
            ...p,
            formRef,
            visible,
            title: typeof title === 'function' ? title(status === 'ADD' ? '新增' : '编辑', status) : title,
            onVisibleChange,
            onFinish
        },
        status,
        onShow
    };
};
