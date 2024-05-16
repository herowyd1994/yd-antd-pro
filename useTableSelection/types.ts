/** @format */

export interface Props {
    rowKey?: string;
    type?: 'checkbox' | 'radio';
    defaultValue?: Value;
    onDisable?(record: Record<string, any>): boolean;
}
export interface Store {
    cache: Record<number, Value>;
}
type Value = (string | number)[];
