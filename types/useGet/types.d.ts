import { RequestConfig } from '@yd/fetch/types/types';
import { DependencyList } from 'react';
export interface Config<D> extends Partial<RequestConfig> {
    immediate?: boolean;
    defaultValue?: any;
    interval?: number;
    delay?: number;
    deps?: DependencyList;
    reset?: boolean;
    formatParams?(params: Record<string, any>): Promise<Record<string, any>> | Record<string, any>;
    formatData?(data: any): Promise<D> | D;
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
    config: Config<any>;
    data: any;
    time: number;
}
