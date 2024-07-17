/** @format */

export interface Props {
    rowKey?: string;
    type?: 'checkbox' | 'radio';
    defaultKeys?: Keys;
    defaultRecords?: Record<string, any>[];
    onDisable?(record: Record<string, any>): boolean;
}
export interface Store {
    cache: Record<
        number,
        {
            keys: Keys;
            records: Record<string, any>[];
        }
    >;
    rowKeys: Keys;
    rowRecords: Record<string, any>[];
}
export type Keys = (string | number)[];
