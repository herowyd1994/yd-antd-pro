import { Props as TableProps } from '../useTable/types';
import { Config } from '../useCache/types';
import { FormLayout } from 'antd/es/form/Form';
export interface Props<D> extends Pick<TableProps, 'updateUrl'>, Omit<Config, 'immediate'> {
    layout?: FormLayout;
    span?: number | string;
    delay?: number;
    toast?: boolean;
    submitUrl?: string;
    request?: {
        url: string;
        params?: Record<string, any>;
        status?: Store['status'];
    } & Omit<Config, 'immediate' | 'done'>;
}
export interface Store {
    status: 'ADD' | 'EDIT';
    ctx: Record<string, any>;
}
