/** @format */

import { routeNames } from '~/routes';
import { useLocation, useHistory } from 'react-router-dom';
import { throttle, transformUrlParams } from '@yd/utils';
import { MethodKeys, MethodFn } from './types';

export default <P extends Record<string, any>>(defaultParams?: P) => {
    const { query, ...location } = useLocation();
    const { go, goBack, goForward, ...history } = useHistory();
    const methods = (['push', 'replace'] as MethodKeys[]).reduce((obj, key) => {
        const fn: MethodFn<keyof typeof routeNames> = throttle((routeKey, query = {}, state) =>
            history[key]({
                pathname: routeNames[routeKey],
                search: transformUrlParams(query),
                state
            })
        );
        return { ...obj, [key]: fn };
    }, {} as Record<MethodKeys, MethodFn<keyof typeof routeNames>>);
    return {
        ...location,
        params: { ...defaultParams, ...query } as P,
        ...methods,
        go,
        goBack,
        goForward
    };
};
