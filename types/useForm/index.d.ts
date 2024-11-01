import { Props, Store } from './types';
import { ActionType, ProFormInstance } from '@ant-design/pro-components';
declare const _default: <D>({ layout, span, delay, toast, submitUrl, updateUrl, requestProps: { url, params, status: s, formatData, ...props }, formatParams, done }: Props<D>) => {
    cache: Record<string, import("../useGet/types").Cache>;
    data: unknown;
    key: string;
    dispatch: (action: import("@yd/r-hooks/types/useStore/types").Action<import("../useGet/types").Store<unknown>>) => Promise<import("../useGet/types").Store<unknown>>;
    reset: (keys?: "*" | keyof import("../useGet/types").Store<D_1> | (keyof import("../useGet/types").Store<D_1>)[]) => Promise<import("../useGet/types").Store<unknown>>;
    onRequest: import("../useGet/types").Request<unknown>;
    getData: import("../useGet/types").GetData;
    formProps: {
        formRef: import("react").MutableRefObject<ProFormInstance>;
        onFinish: import("@yd/r-hooks/types/useLatest/types").Handler<Promise<Promise<any>>>;
        layout: import("antd/es/form/Form").FormLayout;
        labelCol: {
            span: string | number;
        };
    };
    status: "ADD" | "EDIT";
    actionRef: import("react").MutableRefObject<ActionType>;
    onSave: (params?: Record<string, any>, status?: Store["status"]) => Promise<any>;
    setFieldsValue: (params?: Record<string, any>, ctx?: Store["ctx"], status?: Store["status"]) => Promise<void>;
};
export default _default;
