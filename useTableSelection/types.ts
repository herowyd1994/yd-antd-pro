/** @format */

export interface Props {
    rowKey?: string;
    type?: 'checkbox' | 'radio';
    defaultValue?: string | number | (string | number)[];
    onDisable?(record: Record<string, any>): boolean;
}
export interface Store {
    cache: Record<number, (string | number)[]>;
}
