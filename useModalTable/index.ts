/** @format */

import { useTable } from '../index';
import { useStore } from '@yd/r-hooks';
import { Props, Store } from './types';

export default <D extends Record<string, any>>({ title, width, ...props }: Props) => {
    const { tableProps } = useTable<D>(props);
    const { visible, dispatch } = useStore<Store>({ visible: false });
    const onShow = async () => {
        dispatch({ visible: true });
        tableProps.actionRef.current?.reloadAndRest();
    };
    const onClose = () => dispatch({ visible: false });
    return {
        modalProps: {
            title,
            width,
            visible,
            onClose
        },
        tableProps: {
            ...tableProps,
            manualRequest: true
        },
        onShow
    };
};
