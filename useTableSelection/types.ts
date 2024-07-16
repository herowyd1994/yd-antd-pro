/** @format */

export interface Props {
    rowKey?: string;
    type?: 'checkbox' | 'radio';
    defaultKeys?: (string | number)[];
    defaultRecords?: Record<string, any>[];
    onDisable?(record: Record<string, any>): boolean;
}
export interface Store {
    cache: Record<
        number,
        {
            keys: (string | number)[];
            records: Record<string, any>[];
        }
    >;
    rowKeys: (string | number)[];
    rowRecords: Record<string, any>[];
}
