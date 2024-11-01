import { ActionType, ProColumns } from '@ant-design/pro-components';
import { MutableRefObject } from 'react';
export interface Props<D> {
    columns: ProColumns[];
    pageSize?: number;
    width?: number;
    requestUrl: string;
    removeUrl?: string;
    updateUrl?: string;
    refs?: MutableRefObject<ActionType>[];
    formatParams?(params: Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
    formatData?(data: Record<string, any>[]): Promise<D[]> | D[];
}
export interface Store<D> {
    params: Record<string, any>;
    data: D[];
    total: number;
}
