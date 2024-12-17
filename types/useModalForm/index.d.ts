import { Props, Store } from './types';
import { Store as FormStore } from '../useForm/types';
declare const _default: <D>({ title, ...p1 }: Props<D>) => {
    onShow: (params?: Record<string, any>, ctx?: FormStore["ctx"], status?: FormStore["status"]) => Promise<void>;
    cache: Record<string, import("../useGet/types").Cache>;
    data: any;
    key: string;
    dispatch: (action: import("@yd/r-hooks/types/useStore/types").Action<import("../useGet/types").Store<any>>) => Promise<import("../useGet/types").Store<any>>;
    reset: (keys?: "*" | keyof import("../useGet/types").Store<D_1> | (keyof import("../useGet/types").Store<D_1>)[]) => Promise<import("../useGet/types").Store<any>>;
    onRequest: import("../useGet/types").Request<any>;
    getData: import("../useGet/types").GetData;
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
