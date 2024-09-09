/** @format */

import { ProColumns } from '@ant-design/pro-table';

export interface Props {
    columns: ProColumns[];
    filename?: string;
    params?: Record<string, any>;
    requestUrl?: string;
    submitUrl?: string;
    formatRequestParams?(
        params: Record<string, any>
    ): Promise<Record<string, any>> | Record<string, any>;
    formatSubmitParams?(
        params: Record<string, any>
    ): Promise<Record<string, any>> | Record<string, any>;
}
export type Handler = (params?: Record<string, any>) => Promise<void>;
