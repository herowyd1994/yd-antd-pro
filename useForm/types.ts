/** @format */

import { Props as TableProps } from '../useTable/types';

export interface Props<P> extends Pick<TableProps, 'updateUrl'> {
    submitUrl?: string;
    formatParams?(params: Params<P>): Params<P>;
    done?(): any;
}
export type Params<P> = Record<string, any> & P;
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
