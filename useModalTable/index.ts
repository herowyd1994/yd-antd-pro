/** @format */

import { useTable } from '../index';
import { useStore } from '@yd/r-hooks';
import { Props, Store } from './types';
import { sleep } from '@yd/utils';

export default <D extends Record<string, any>>({ title, width, done, ...props }: Props<D>) => {
    const { tableProps, data, params, total, ...table } = useTable<D>(props);
    const { visible, dispatch } = useStore<Store>({ visible: false });
    const onShow = async () => {
        dispatch({ visible: true });
        await sleep(100);
        tableProps.actionRef.current?.reload();
    };
    const onClose = () => dispatch({ visible: false });
    const onConfirm = async () => {
        await done?.(params, data, total);
        dispatch({ visible: false });
    };
    return {
        ...table,
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
        onShow,
        onConfirm
    };
};
