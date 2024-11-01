import { Keys, Props, Store } from './types';
import { ActionType } from '@ant-design/pro-table';
declare const _default: ({ rowKey, type, defaultKeys, defaultRecords, onDisable }?: Props) => {
    tableSelectionProps: {
        rowKey: string;
        rowSelection: {
            type: "checkbox" | "radio";
            selectedRowKeys: any[];
            onChange: (keys: (string | number)[], records: Record<string, any>[]) => void;
            getCheckboxProps: (record: Record<string, any>) => {
                disabled: boolean;
            };
        };
    };
    rowKeys: any[];
    rowRecords: any[];
    actionRef: import("react").MutableRefObject<ActionType>;
    setCheckboxValues: (keys: Keys, records: Record<string, any>[]) => Promise<Store>;
    delCheckboxKeys: (keys: string | number | Keys | "*") => Promise<Store>;
};
export default _default;
