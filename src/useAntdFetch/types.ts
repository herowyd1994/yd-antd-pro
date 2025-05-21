/** @format */

import { Config as FetchConfig } from '@yd/fetch/dist/types';

export interface Config extends FetchConfig {
    mode?: 'history' | 'hash';
}
