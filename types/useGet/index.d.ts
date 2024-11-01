import { Config, Store, Cache, Request, GetData } from './types';
declare const _default: <D>(url: string, params?: Record<string, any>, { immediate, defaultValue, interval, delay, deps, reset: r, formatParams, formatData, done, ...config }?: Config<D>) => {
    cache: Record<string, Cache>;
    data: D;
    key: string;
    dispatch: (action: import("@yd/r-hooks/types/useStore/types").Action<Store<D>>) => Promise<Store<D>>;
    reset: (keys?: "*" | keyof Store<D> | (keyof Store<D>)[]) => Promise<Store<D>>;
    onRequest: Request<D>;
    getData: GetData;
};
export default _default;
