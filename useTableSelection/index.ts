/** @format */

import { Props, Store } from './types';
import { useStore } from '@yd/r-hooks';
import { useMemo, useRef } from 'react';
import { ActionType } from '@ant-design/pro-components';

export default ({
    rowKey = 'id',
    type = 'checkbox',
    defaultKeys = [],
    defaultRecords = [],
    onDisable = () => false
}: Props = {}) => {
    const { cache, dispatch, reset } = useStore<Store>({
        cache: { 1: { keys: defaultKeys, records: defaultRecords } }
    });
    const { rowKeys, rowRecords } = useMemo(
        () =>
            Object.values(cache).reduce(
                (obj, { keys, records }) => ({
                    rowKeys: obj.rowKeys.concat(keys),
                    rowRecords: obj.rowRecords.concat(records)
                }),
                { rowKeys: [], rowRecords: [] }
            ),
        [cache]
    );
    const actionRef = useRef<ActionType>();
    const onChange = (keys: (string | number)[], records: Record<string, any>[]) => {
        cache[type === 'radio' ? 1 : actionRef.current?.pageInfo.current] = { keys, records };
        dispatch({ cache: { ...cache } });
    };
    const getCheckboxProps = (record: Record<string, any>) => ({ disabled: onDisable(record) });
    return {
        tableSelectionProps: {
            rowKey,
            rowSelection: {
                type,
                selectedRowKeys: rowKeys,
                onChange,
                getCheckboxProps
            }
        },
        rowKeys,
        rowRecords,
        actionRef,
        reset
    };
};
