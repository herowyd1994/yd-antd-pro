/** @format */

import { useFetch } from '../index';
import { useStore, useLock, useUpdate } from '@yd/r-hooks';
import { transformUrlParams } from '@yd/utils';
import { Config, Store, Cache } from './types';

const cache: Record<string, Cache> = {};

export default <D = any>(
    url: string,
    params?: Record<string, any>,
    {
        immediate = true,
        defaultValue,
        interval = 5000,
        delay,
        deps = [],
        formatParams = (params) => params,
        formatData = (data) => data,
        done,
        ...config
    }: Config<D> = {}
) => {
    const { get } = useFetch();
    const { data, key, dispatch, reset } = useStore<Store<D>>({
        data: void 0,
        key: ''
    });
    const { done: onRequest } = useLock(async (p?: Record<string, any>) => {
        params = { ...params, ...p };
        const key = `${url}${transformUrlParams(params)}`;
        const now = Date.now();
        !Reflect.has(cache, key) &&
            Reflect.set(cache, key, { url, params, config, data: void 0, time: 0 });
        let { data, time } = Reflect.get(cache, key);
        if (now - time > interval) {
            data = formatData(await getData(key));
            Reflect.set(cache[key], 'data', data);
            Reflect.set(cache[key], 'time', now);
        }
        dispatch({ data, key });
        done?.(data);
        return data;
    }, 0);
    const { done: getData } = useLock(async (key: string) => {
        if (!Reflect.has(cache, key)) {
            return;
        }
        const { url, params, config } = Reflect.get(cache, key);
        const data = await get(url, formatParams(params), config);
        return defaultValue && typeof defaultValue === 'object' ?
                Object.assign(defaultValue!, data)
            :   data;
    }, delay);
    useUpdate(onRequest, deps, Number(!immediate));
    return {
        cache,
        data,
        key,
        dispatch,
        reset,
        onRequest,
        getData
    };
};
