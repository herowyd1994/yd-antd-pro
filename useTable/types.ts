/** @format */

import { ProColumns } from '@ant-design/pro-components';
import { SearchConfig } from '@ant-design/pro-table/lib/components/Form/FormRender';
import { MutableRefObject } from 'react';
import { TablePaginationConfig } from 'antd';

export interface Props<D = any> {
    columns: ProColumns[];
    search?: false | SearchConfig;
    pagination?: false | TablePaginationConfig;
    requestUrl: string;
    removeUrl?: string;
    updateUrl?: string;
    refs?: MutableRefObject<any> | MutableRefObject<any>[];
    formatParams?(params: Params): Params;
    formatData?(data: any): D[];
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
