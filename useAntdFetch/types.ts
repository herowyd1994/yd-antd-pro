/** @format */

import { Config as FetchConfig } from '@yd/fetch/types';

export interface Config extends FetchConfig {
    mode?: 'history' | 'hash';
}
