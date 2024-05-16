/** @format */

import { Props as TableProps } from '../useTable/types';
import { FormLayout } from 'antd/es/form/Form';

export interface Props<P> extends Pick<TableProps, 'updateUrl'> {
    layout?: FormLayout;
    span?: number | string;
    submitUrl?: string;
    formatParams?(params: Params<P>): Promise<Params<P>> | Params<P>;
    done?(data: any): void;
}
type Params<P> = Record<string, any> & P;
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
