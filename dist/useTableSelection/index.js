import { useStore } from '@yd/r-hooks';
import { useMemo, useRef } from 'react';
export default ({ rowKey = 'id', type = 'checkbox', defaultKeys = [], defaultRecords = [], onDisable = () => false } = {}) => {
    const { cache, dispatch, reset } = useStore({
        cache: { 1: { keys: defaultKeys, records: defaultRecords } }
    });
    const { rowKeys, rowRecords } = useMemo(() => Object.values(cache).reduce((obj, { keys, records }) => ({
        rowKeys: obj.rowKeys.concat(keys),
        rowRecords: obj.rowRecords.concat(records)
    }), { rowKeys: [], rowRecords: [] }), [cache]);
    const actionRef = useRef();
    const onChange = (keys, records) => {
        cache[type === 'radio' ? 1 : actionRef.current?.pageInfo?.current] = { keys, records };
        dispatch({ cache: { ...cache } });
    };
    const getCheckboxProps = (record) => ({ disabled: onDisable(record) });
    const setCheckboxValues = (keys, records) => dispatch({ cache: { 1: { keys, records } } });
    const delCheckboxKeys = (keys) => {
        if (keys === '*') {
            return reset('cache');
        }
        keys = (!Array.isArray(keys) ? [keys] : keys);
        Object.values(cache).forEach(value => {
            value.keys = value.keys.filter(item => !keys.includes(item));
            value.records = value.records.filter(item => !keys.includes(item[rowKey]));
        });
        return dispatch({ cache: { ...cache } });
    };
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
