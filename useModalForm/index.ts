/** @format */

import { Props, Store } from './types';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useForm } from '../index';
import { Store as FormStore } from '../useForm/types';

export default <P extends Record<string, any>>({ title = tip => tip, ...props }: Props<P>) => {
    const {
        formProps: { formRef, onFinish: finish, ...p },
        status,
        onFieldsValue,
        ...form
    } = useForm(props);
    const { visible, dispatch } = useStore<Store>({ visible: false });
    const onVisibleChange = (visible: boolean) => dispatch({ visible });
    const onFinish = async (params: P) => {
        await finish(params);
        onVisibleChange(false);
    };
    const onShow = async (
        params?: Record<string, any>,
        ctx?: FormStore['ctx'],
        status: FormStore['status'] = 'ADD'
    ) => {
        onVisibleChange(true);
        onFieldsValue(params, ctx, status);
    };
    useUpdate(() => !visible && formRef.current?.resetFields(), [visible]);
    return {
        modalFormProps: {
            ...p,
            formRef,
            visible,
            title: typeof title === 'function' ? title(status === 'ADD' ? '新增' : '编辑', status) : title,
            onVisibleChange,
            onFinish
        },
        status,
        onShow,
        ...form
    };
};
