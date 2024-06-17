/** @format */

import { Props as FormProps, Store as FormStore } from '../useForm/types';

export interface Props<P> extends FormProps<P> {
    title?: string | ((tip: string, status: FormStore['status']) => string);
}
export interface Store {
    visible: boolean;
}
