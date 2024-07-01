/** @format */

import { Props as TableProps } from '../useTable/types';

export interface Props<D = any> extends TableProps<D> {
    title?: string;
    width?: number;
    done?(params: Record<string, any>, data: D[], total: number): Promise<void> | void;
}
export interface Store {
    visible: boolean;
}
