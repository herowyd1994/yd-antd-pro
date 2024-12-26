import { Config, Store, Request } from './types';
declare const _default: <D>(url: string, params?: Record<string, any>, { immediate, interval, delay, deps, done: d, ...config }?: Config<D>) => {
    data: D;
    dispatch: (action: import("@yd/r-hooks/types/useStore/types").Action<Store<D>>) => Promise<Store<D>>;
    request: Request<D>;
    isLoading: boolean;
};
export default _default;
