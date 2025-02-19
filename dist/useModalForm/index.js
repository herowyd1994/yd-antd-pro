import { useStore, useUpdate } from '@yd/r-hooks';
import { useForm } from '../index';
export default ({ title = tip => tip, ...p1 }) => {
    const { formProps: { formRef, onFinish: finish, ...p2 }, status, setFieldsValue, ...form } = useForm(p1);
    const { visible, $dispatch } = useStore({ visible: false });
    const onVisibleChange = (visible) => $dispatch({ visible });
    const onFinish = async (params) => {
        await finish(params);
        onVisibleChange(false);
    };
    const onShow = async (params, ctx, status = 'ADD') => {
        onVisibleChange(true);
        setFieldsValue(params, ctx, status);
    };
    useUpdate(() => !visible && formRef.current?.resetFields(), [visible]);
    return {
        modalFormProps: {
            ...p2,
            formRef,
            visible,
            title: typeof title === 'function' ?
                title(status === 'ADD' ? '新增' : '编辑', status)
                : title,
            onVisibleChange,
            onFinish
        },
        status,
        ...form,
        onShow
    };
};
