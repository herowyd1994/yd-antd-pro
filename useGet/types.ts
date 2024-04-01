/** @format */

import { RequestConfig } from '@yd/fetch/types';
import { DependencyList } from 'react';

export interface Config<D = any> extends Partial<RequestConfig> {
    immediate?: boolean;
    defaultValue?: any;
    interval?: number;
    delay?: number;
    deps?: DependencyList;
    reset?: boolean;
    formatParams?(params: Record<string, any>): Record<string, any>;
    formatData?(data: any): D;
    done?(data: D): any;
}
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
