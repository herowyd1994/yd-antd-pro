import { Props as FormProps, Store as FormStore } from '../useForm/types';
export interface Props<D> extends FormProps<D> {
    title?: string | ((tip: string, status: FormStore['status']) => string);
}
export interface Store {
    visible: boolean;
}
