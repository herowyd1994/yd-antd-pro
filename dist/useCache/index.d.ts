import { Config, Store, Request } from './types';
declare const _default: <D>(url: string, params?: Record<string, any>, { immediate, interval, delay, deps, done: d, ...config }?: Config<D>) => {
    data: D;
    isLocking: boolean;
    dispatch: (action: import("@yd/r-hooks/dist/useStore/types").Action<Store<D>>) => Promise<Store<D>>;
    request: Request<D>;
};
export default _default;
