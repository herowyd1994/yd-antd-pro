import { Props, Store } from './types';
declare const _default: <D extends Record<string, any>>({ title, width, done, ...props }: Props<D>) => {
    onShow: () => Promise<void>;
    onConfirm: () => Promise<void>;
    onRemove: (params: Record<string, any>, content?: import("react").ReactNode, title?: import("react").ReactNode, options?: import("antd").ModalFuncProps) => Promise<void>;
    onUpdate: (params: Record<string, any>, content?: import("react").ReactNode, title?: import("react").ReactNode, options?: import("antd").ModalFuncProps) => Promise<void>;
    tableProps: {
        manualRequest: boolean;
        actionRef: import("react").MutableRefObject<import("@ant-design/pro-table").ActionType>;
        columns: import("@ant-design/pro-table").ProColumns[];
        request: (params: Record<string, any>) => Promise<{
            data: any;
            success: boolean;
            total: any;
        }>;
        search: {
            defaultCollapsed: boolean;
            labelWidth: "auto";
        };
        pagination: {
            showSizeChanger: boolean;
            showQuickJumper: boolean;
            defaultPageSize: number;
        };
        scroll: {
            x: number;
        };
    };
    modalProps: {
        title: string;
        width: number;
        visible: boolean;
        onClose: () => Promise<Store>;
    };
};
export default _default;
