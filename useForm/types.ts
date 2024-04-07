/** @format */

import { Props as TableProps } from '../useTable/types';
import { FormLayout } from 'antd/es/form/Form';

export interface Props<P> extends Pick<TableProps, 'updateUrl'> {
    layout?: FormLayout;
    span?: number;
    submitUrl?: string;
    formatParams?(params: Params<P>): Params<P>;
    done?(): any;
}
export type Params<P> = Record<string, any> & P;
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
