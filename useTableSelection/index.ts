/** @format */

import { Props, Store, Keys } from './types';
import { useStore } from '@yd/r-hooks';
import { useMemo, useRef } from 'react';
import { ActionType } from '@ant-design/pro-components';

export default ({
    rowKey = 'id',
    type = 'checkbox',
    defaultKeys = [],
    onDisable = () => false
}: Props = {}) => {
    const { cache, dispatch } = useStore<Store>({
        cache: { 1: { keys: defaultKeys, records: [] } }
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
    const onChange = (keys: Keys, records: Record<string, any>[]) => {
        cache[type === 'radio' ? 1 : actionRef.current?.pageInfo?.current] = { keys, records };
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
        actionRef
    };
};
