/** @format */

import { Config as FetchConfig } from '@yd/fetch/types/types';

export interface Config extends FetchConfig {
    mode?: 'history' | 'hash';
}
