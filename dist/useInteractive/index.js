import { Modal } from 'antd';
import { sleep } from '@yd/utils';
export default (props) => {
    const confirm = (content, title, options) => new Promise(resolve => Modal.confirm({
        title,
        content,
        ...props,
        ...options,
        onOk: () => resolve()
    }));
    const alert = (content, title, options) => new Promise(resolve => Modal.warning({
        title,
        content,
        okText: '关闭',
        ...props,
        ...options,
        onOk: () => resolve()
    }));
    const destroy = async (delay = 0) => {
        await sleep(delay);
        Modal.destroyAll();
    };
    return {
        confirm,
        alert,
        destroy
    };
};
