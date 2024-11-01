import { Config } from './types';
export { useFetch } from '@yd/fetch';
export declare const createFetch: ({ mode, onLogout, onError, ...config }: Config) => (({ method, url, ...opts }: {
    [x: string]: any;
    method: any;
    url: any;
}) => any) & import("@yd/fetch/types/lib/request").Request;
