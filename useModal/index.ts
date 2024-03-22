/** @format */

import { ReactNode } from 'react';
import { Modal, ModalFuncProps } from 'antd';
import { sleep } from '@yd/utils';

export default (props?: ModalFuncProps) => {
    const confirm = (content: ReactNode, title?: ReactNode, opts?: ModalFuncProps) =>
        new Promise<void>((resolve) =>
            Modal.confirm({
                title,
                content,
                ...props,
                ...opts,
                onOk: () => resolve()
            })
        );
    const alert = (content: ReactNode, title?: ReactNode, opts?: ModalFuncProps) =>
        new Promise<void>((resolve) =>
            Modal.warning({
                title,
                content,
                okText: '关闭',
                ...props,
                ...opts,
                onOk: () => resolve()
            })
        );
    const destroy = async (delay: number = 0) => {
        await sleep(delay);
        Modal.destroyAll();
    };
    return {
        confirm,
        alert,
        destroy
    };
};
