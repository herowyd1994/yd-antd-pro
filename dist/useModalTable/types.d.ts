import { Props as TableProps } from '../useTable/types';
export interface Props<D> extends TableProps<D> {
    title?: string;
    width?: number;
    done?(params: Record<string, any>, data: D[], total: number): any;
}
export interface Store {
    visible: boolean;
}
