/** @format */

import { useLocation, useHistory } from 'react-router-dom';
import { throttle, transformUrlParams } from '@yd/utils';
import { MethodKeys, MethodFn } from './types';

export default <R extends Record<string, string>, P extends Record<string, any>>(
    routes?: R,
    defaultParams?: P
) => {
    const { query, ...location } = useLocation();
    const { go, goBack, goForward, ...history } = useHistory();
    const methods = (['push', 'replace'] as MethodKeys[]).reduce(
        (obj, key) => {
            const fn: MethodFn<keyof R> = throttle((routeKey, query = {}, state) =>
                history[key]({
                    pathname: routes![routeKey],
                    search: transformUrlParams(query),
                    state
                })
            );
            return { ...obj, [key]: fn };
        },
        {} as Record<MethodKeys, MethodFn<keyof R>>
    );
    return {
        ...location,
        params: { ...defaultParams, ...query } as P,
        ...methods,
        go,
        goBack,
        goForward
    };
};
