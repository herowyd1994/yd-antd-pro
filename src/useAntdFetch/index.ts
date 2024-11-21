/** @format */

import { createFetch as create } from '@yd/fetch';
import { sleep, throttle } from '@yd/utils';
import { Config } from './types';
import { message } from 'antd';

export { useFetch } from '@yd/fetch';
export const createFetch = ({
    mode = 'hash',
    onLogout = async () => {
        await sleep(150);
        localStorage.removeItem('Authorization');
        if (mode === 'hash') {
            return (location.hash = '#/login');
        }
        location.href = `${location.origin}/login`;
    },
    onError = ({ errMsg }) => message.error(errMsg),
    ...config
}: Config) =>
    create({
        onLogout: throttle(onLogout),
        onError,
        ...config
    });
