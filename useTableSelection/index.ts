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
    const setCheckboxValues = (keys: Keys, records: Record<string, any>[]) => {
        cache[1] = { keys, records };
        dispatch({ cache: { ...cache } });
    };
    const delCheckboxKeys = (keys: string | number | Keys | '*') => {
        if (keys === '*') {
            reset('cache');
            return;
        }
        keys = !Array.isArray(keys) ? [keys] : keys;
        Object.values(cache).forEach(value => {
            value.keys = value.keys.filter(item => !(keys as Keys).includes(item));
            value.records = value.records.filter(item => !(keys as Keys).includes(item[rowKey]));
        });
        dispatch({ cache: { ...cache } });
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
        setCheckboxValues,
        delCheckboxKeys
    };
};
