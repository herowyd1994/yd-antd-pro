/** @format */

import { RequestConfig } from '@yd/fetch/types';
import { DependencyList } from 'react';

export interface Config<D = any, P = {}> extends Partial<RequestConfig> {
    immediate?: boolean;
    defaultValue?: any;
    interval?: number;
    delay?: number;
    deps?: DependencyList;
    reset?: boolean;
    formatParams?(params: Params<P>): Promise<Params<P>> | Params<P>;
    formatData?(data: any): Promise<D> | D;
    done?(data: D): any;
}
type Params<P = any> = Record<string, any> & P;
export type Request<D> = (params?: Record<string, any>) => Promise<D>;
export type GetData = <D>(string: string) => Promise<D>;
export interface Store<D> {
    data: D | undefined;
    key: string;
}
export interface Cache {
    url: string;
    params: Params;
    config: Config;
    data: any;
    time: number;
}
