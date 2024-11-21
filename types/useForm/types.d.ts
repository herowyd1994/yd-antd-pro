import { Props as TableProps } from '../useTable/types';
import { Config } from '../useGet/types';
import { FormLayout } from 'antd/es/form/Form';
export interface Props<D> extends Pick<TableProps<any>, 'updateUrl'> {
    layout?: FormLayout;
    span?: number | string;
    delay?: number;
    toast?: boolean;
    submitUrl?: string;
    requestProps?: {
        url: string;
        params?: Record<string, any>;
        status?: Store['status'];
    } & Config<any>;
    formatParams?(params: Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
    done?(data: D): any;
}
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
