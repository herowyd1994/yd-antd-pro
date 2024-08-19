/** @format */

import { Props as TableProps } from '../useTable/types';
import { Config } from '../useGet/types';
import { FormLayout } from 'antd/es/form/Form';

export interface Props<P> extends Pick<TableProps, 'updateUrl'> {
    layout?: FormLayout;
    span?: number | string;
    delay?: number;
    submitUrl?: string;
    requestProps?: {
        url: string;
        params?: Record<string, any>;
        status?: Store['status'];
        formatData?<D>(data: any): D;
    } & Config;
    formatParams?(params: Params<P>): Promise<Params<P>> | Params<P>;
    done?(data: any): Promise<void> | void;
}
type Params<P> = Record<string, any> & P;
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
