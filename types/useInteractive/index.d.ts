import { ReactNode } from 'react';
import { ModalFuncProps } from 'antd';
declare const _default: (props?: ModalFuncProps) => {
    confirm: (content: ReactNode, title?: ReactNode, options?: ModalFuncProps) => Promise<void>;
    alert: (content: ReactNode, title?: ReactNode, options?: ModalFuncProps) => Promise<void>;
    destroy: (delay?: number) => Promise<void>;
};
export default _default;
