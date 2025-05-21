/** @format */

import { ActionType, ProColumns } from '@ant-design/pro-components';
import { MutableRefObject } from 'react';
import { MethodFnConfig } from '@yd/fetch/dist/types';

export interface Props<D = any> extends Omit<MethodFnConfig, 'formatData'> {
    columns: ProColumns[];
    pageSize?: number;
    width?: number;
    requestUrl: string;
    removeUrl?: string;
    updateUrl?: string;
    refs?: MutableRefObject<ActionType>[];
    formatData?(data: any): Promise<D[]> | D[];
}
export interface Store<D> {
    params: Record<string, any>;
    data: D[];
    total: number;
}
