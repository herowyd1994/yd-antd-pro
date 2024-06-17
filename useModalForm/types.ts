/** @format */

import { Props as FormProps } from '../useForm/types';

export interface Props<P> extends FormProps<P> {
    title?: string | ((tip: string) => string);
}
export interface Store {
    visible: boolean;
}
