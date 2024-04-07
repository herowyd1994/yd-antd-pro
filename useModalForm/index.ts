/** @format */

import { Props, Store } from './types';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useForm } from '../index';
import { useRef } from 'react';
import { ActionType } from '@ant-design/pro-components';
import { Store as FormStore } from '../useForm/types';

export default <P extends Record<string, any>>({ title, ...props }: Props<P>) => {
    const {
        formOpts: { formRef, onFinish: finish, ...opts },
        onSave,
        onFieldsValue
    } = useForm(props);
    const tableRef = useRef<ActionType>();
    const { visible, dispatch } = useStore<Store>({ visible: false });
    const onVisibleChange = (visible: boolean) => dispatch({ visible });
    const onFinish = async (params: P) => {
        await finish(params);
        await tableRef.current?.reloadAndRest?.();
        onVisibleChange(false);
    };
    const onAddShow = async (params?: Record<string, any>, ctx?: FormStore['ctx']) => {
        onVisibleChange(true);
        onFieldsValue(params, ctx, 'ADD');
    };
    const onEditShow = async (params?: Record<string, any>, ctx?: FormStore['ctx']) => {
        onVisibleChange(true);
        onFieldsValue(params, ctx, 'EDIT');
    };
    useUpdate(() => !visible && formRef.current?.resetFields(), [visible]);
    return {
        modalFormOpts: {
            ...opts,
            formRef,
            visible,
            title,
            onVisibleChange,
            onFinish
        },
        tableRef,
        onSave,
        onAddShow,
        onEditShow
    };
};
