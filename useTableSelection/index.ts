/** @format */

import { Props, Store } from './types';
import { useStore } from '@yd/r-hooks';
import { useMemo, useRef } from 'react';
import { ActionType } from '@ant-design/pro-components';

export default ({
    rowKey = 'id',
    type = 'checkbox',
    defaultValue = [],
    onDisable = () => false
}: Props = {}) => {
    const { cache, dispatch } = useStore<Store>({
        cache: { 0: !Array.isArray(defaultValue) ? [defaultValue] : defaultValue }
    });
    const selectedRowKeys = useMemo(
        () => Object.values(cache).reduce((arr, keys) => [...arr, ...keys], []),
        [cache]
    );
    const tableRef = useRef<ActionType>();
    const onChange = (keys: (string | number)[]) => {
        cache[type === 'radio' ? 0 : tableRef.current!.pageInfo!.current] = keys;
        dispatch({ cache: { ...cache } });
    };
    const getCheckboxProps = (record: Record<string, any>) => ({ disabled: onDisable(record) });
    return {
        tableSelectionProps: {
            rowKey,
            rowSelection: {
                type,
                selectedRowKeys,
                onChange,
                getCheckboxProps
            }
        },
        rowKeys: selectedRowKeys,
        tableRef
    };
};
