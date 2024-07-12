/** @format */

import { ProColumns } from '@ant-design/pro-table';

export interface Props {
    columns: ProColumns[];
    filename?: string;
    params?: Record<string, any>;
    requestUrl?: string;
    submitUrl?: string;
    formatParams?(params: Record<string, any>): Record<string, any>;
}
export type Handler = (params?: Record<string, any>) => Promise<void>;
