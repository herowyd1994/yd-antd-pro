/** @format */

import { Props as FormProps } from '../useForm/types';

export interface Props<P> extends Omit<FormProps<P>, 'back'> {
    title?: string;
}
export interface Store {
    visible: boolean;
}
