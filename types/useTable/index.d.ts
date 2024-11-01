import { ActionType } from '@ant-design/pro-components';
import { Props } from './types';
import { ReactNode } from 'react';
import { ModalFuncProps } from 'antd';
declare const _default: <D extends Record<string, any>>({ columns, pageSize: defaultPageSize, width: x, requestUrl, removeUrl, updateUrl, refs, formatParams, formatData }: Props<D>) => {
    tableProps: {
        actionRef: import("react").MutableRefObject<ActionType>;
        columns: import("@ant-design/pro-components").ProColumns[];
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
    params: Record<string, any>;
    data: D[];
    total: number;
    onRemove: (params: Record<string, any>, content?: ReactNode, title?: ReactNode, options?: ModalFuncProps) => Promise<void>;
    onUpdate: (params: Record<string, any>, content?: ReactNode, title?: ReactNode, options?: ModalFuncProps) => Promise<void>;
};
export default _default;
