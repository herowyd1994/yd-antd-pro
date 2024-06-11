/** @format */

export interface Props {
    rowKey?: string;
    type?: 'checkbox' | 'radio';
    defaultKeys?: Keys;
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
}
export type Keys = (string | number)[];
