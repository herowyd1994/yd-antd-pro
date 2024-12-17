/** @format */

import { RequestConfig } from '@yd/fetch/types/types';
import { DependencyList } from 'react';

export interface Config<D = any> extends Partial<RequestConfig<D>> {
    immediate?: boolean;
    defaultValue?: any;
    interval?: number;
    delay?: number;
    deps?: DependencyList;
    reset?: boolean;
    done?(data: D): any;
}
export type Request<D> = (params?: Record<string, any>) => Promise<Promise<D>>;
export type GetData = <D>(string: string) => Promise<Promise<D>>;
export interface Store<D> {
    data: D | undefined;
    key: string;
}
export interface Cache {
    url: string;
    params: Record<string, any>;
    config: Config;
    data: any;
    time: number;
}
