/** @format */

import { MethodFnConfig } from '@yd/fetch/types/types';
import { DependencyList } from 'react';

export interface Config<D = any> extends MethodFnConfig {
    immediate?: boolean;
    interval?: number;
    delay?: number;
    deps?: DependencyList;
    done?(data: D): any;
}
export type Request<D> = (params?: Record<string, any>) => Promise<Promise<D>>;
export interface Store<D> {
    data: D | undefined;
}
export interface Cache {
    url: string;
    params: Record<string, any>;
    config: Config;
    data: any;
    time: number;
}
