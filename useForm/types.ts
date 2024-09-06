/** @format */

import { Props as TableProps } from '../useTable/types';
import { Config } from '../useGet/types';
import { FormLayout } from 'antd/es/form/Form';

export interface Props<D1> extends Pick<TableProps<any>, 'updateUrl'> {
    layout?: FormLayout;
    span?: number | string;
    delay?: number;
    submitUrl?: string;
    requestProps?: {
        url: string;
        params?: Record<string, any>;
        status?: Store['status'];
        formatData?<D2>(data: any): D2;
    } & Config<any>;
    formatParams?(params: Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
    done?(data: D1): any;
}
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
