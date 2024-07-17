/** @format */

import { Keys, Props, Store } from './types';
import { useStore, useUpdate } from '@yd/r-hooks';
import { useRef } from 'react';
import { ActionType } from '@ant-design/pro-table';

export default ({
    rowKey = 'id',
    type = 'checkbox',
    defaultKeys = [],
    defaultRecords = [],
    onDisable = () => false
}: Props = {}) => {
    const { cache, rowKeys, rowRecords, dispatch, reset } = useStore<Store>({
        cache: { 1: { keys: defaultKeys, records: defaultRecords } },
        rowKeys: [],
        rowRecords: []
    });
    const actionRef = useRef<ActionType>();
    const onChange = (keys: (string | number)[], records: Record<string, any>[]) => {
        cache[type === 'radio' ? 1 : actionRef.current?.pageInfo?.current!] = { keys, records };
        dispatch({ cache: { ...cache } });
    };
    const getCheckboxProps = (record: Record<string, any>) => ({ disabled: onDisable(record) });
    const onRemove = (keys: string | number | Keys | '*') => {
        if (keys === '*') {
            return reset();
        }
        keys = !Array.isArray(keys) ? [keys] : keys;
        return dispatch({
            rowKeys: rowKeys.filter(key => !(keys as Keys).includes(key)),
            rowRecords: rowRecords.filter(record => !(keys as Keys).includes(record[rowKey]))
        });
    };
    useUpdate(() => {
        const { rowKeys, rowRecords } = Object.values(cache).reduce<Record<string, any[]>>(
            (obj, { keys, records }) => ({
                rowKeys: obj.rowKeys.concat(keys),
                rowRecords: obj.rowRecords.concat(records)
            }),
            { rowKeys: [], rowRecords: [] }
        );
        dispatch({ rowKeys, rowRecords });
    }, [cache]);
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
        onRemove
    };
};
