import { Props, Store } from './types';
import { Store as FormStore } from '../useForm/types';
declare const _default: <D>({ title, ...p1 }: Props<D>) => {
    onShow: (params?: Record<string, any>, ctx?: FormStore["ctx"], status?: FormStore["status"]) => Promise<void>;
    data: unknown;
    isLocking: boolean;
    dispatch: (action: import("@yd/r-hooks/dist/useStore/types").Action<import("../useCache/types").Store<unknown>>) => Promise<import("../useCache/types").Store<unknown>>;
    request: import("../useCache/types").Request<unknown>;
    actionRef: import("react").MutableRefObject<import("@ant-design/pro-table").ActionType>;
    onSave: (params?: Record<string, any>, status?: FormStore["status"]) => Promise<any>;
    modalFormProps: {
        formRef: import("react").MutableRefObject<import("@ant-design/pro-form").ProFormInstance>;
        visible: boolean;
        title: string;
        onVisibleChange: (visible: boolean) => Promise<Store>;
        onFinish: (params: Record<string, any>) => Promise<void>;
        layout: import("antd/es/form/Form").FormLayout;
        labelCol: {
            span: string | number;
        };
    };
    status: "ADD" | "EDIT";
};
export default _default;
