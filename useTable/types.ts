/** @format */

import { ProColumns } from '@ant-design/pro-components';
import { MutableRefObject } from 'react';

export interface Props<D = any> {
    columns: ProColumns[];
    pageSize?: number;
    width?: number;
    requestUrl: string;
    removeUrl?: string;
    updateUrl?: string;
    refs?: MutableRefObject<any> | MutableRefObject<any>[];
    formatParams?(params: Params): Promise<Params> | Params;
    formatData?(data: any): Promise<D[]> | D[];
}
export interface Params extends Record<string, any> {
    current: number;
    pageSize: number;
}
export interface Store<D> {
    params: Record<string, any>;
    data: D[];
    total: number;
}
