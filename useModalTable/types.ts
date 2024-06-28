/** @format */

import { Props as TableProps } from '../useTable/types';

export interface Props<D = any> extends TableProps<D> {
    title?: string;
    width?: number;
}
export interface Store {
    visible: boolean;
}
