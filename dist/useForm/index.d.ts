import { Props, Store } from './types';
import { ActionType, ProFormInstance } from '@ant-design/pro-components';
declare const _default: <D>({ layout, span, delay, toast, submitUrl, updateUrl, request: { url, params, status: s, ...c1 }, done, ...c2 }: Props<D>) => {
    data: unknown;
    isLocking: boolean;
    dispatch: (action: import("@yd/r-hooks/dist/useStore/types").Action<import("../useCache/types").Store<unknown>>) => Promise<import("../useCache/types").Store<unknown>>;
    request: import("../useCache/types").Request<unknown>;
    formProps: {
        formRef: import("react").MutableRefObject<ProFormInstance>;
        onFinish: import("@yd/r-hooks/dist/useLatest/types").Handler<Promise<Promise<any>>>;
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
