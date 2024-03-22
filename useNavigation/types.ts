/** @format */

export type MethodKeys = 'push' | 'replace';
export type MethodFn<K> = (
    routeKey: K,
    query?: Record<string, any>,
    state?: Record<string, any>
) => void;
