/** @format */

import { Props, Store } from './types';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useForm } from '../index';
import { useRef } from 'react';
import { ActionType } from '@ant-design/pro-components';

export default <P extends Record<string, any>>({ title, ...props }: Props<P>) => {
    const {
        formOpts: { formRef, onFinish: finish, ...opts },
        onSave,
        onAdd: add,
        onEdit: edit
    } = useForm({ ...props, back: false });
    const tableRef = useRef<ActionType>();
    const { visible, dispatch } = useStore<Store>({ visible: false });
    const onVisibleChange = (visible: boolean) => dispatch({ visible });
    const onFinish = async (params: P) => {
        await finish(params);
        await tableRef.current?.reloadAndRest?.();
        onVisibleChange(false);
    };
    const onAdd = async (params?: Record<string, any>) => {
        onVisibleChange(true);
        await add(params);
    };
    const onEdit = async (params?: Record<string, any>, ctx: Record<string, any> = {}) => {
        onVisibleChange(true);
        await edit(params, ctx);
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
        onAdd,
        onEdit
    };
};
