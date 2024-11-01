import { selectFile } from '@yd/utils';
import { read, writeFile, utils } from 'xlsx';
import { message } from 'antd';
import { useFetch } from '../index';
import { useLock } from '@yd/r-hooks';
export default ({ columns, filename = '文件', params, requestUrl, submitUrl, formatRequestParams = params => params, formatSubmitParams = formatRequestParams }) => {
    columns = columns.filter(({ hideInTable, valueType }) => !hideInTable && valueType !== 'option');
    const { get, post } = useFetch();
    const { done: d1 } = useLock(async (p) => {
        const { 0: file } = await selectFile('single', '.xlsx,.xls');
        const { Sheets, SheetNames } = read(await file.arrayBuffer());
        await post(submitUrl, await formatSubmitParams({
            ...utils.sheet_to_json(Sheets[SheetNames[0]]).map(item => columns.reduce((obj, { title, dataIndex, valueEnum }) => {
                let value = item[title];
                if (valueEnum) {
                    const res = Object.entries(valueEnum).find(([k, v]) => v === value);
                    value = res ? res[0] : value;
                }
                return { ...obj, [dataIndex]: value };
            }, {})),
            ...params,
            ...p
        }));
        message.success('导入成功');
    });
    const { done: d2 } = useLock(async (p) => {
        const { list } = await get(requestUrl, await formatRequestParams({ ...params, ...p }));
        const wb = utils.book_new();
        utils.book_append_sheet(wb, utils.aoa_to_sheet([
            columns.map(({ title }) => title),
            ...list.map((item, i) => columns.map(({ dataIndex, valueEnum, renderText, render }) => {
                const value = item[dataIndex];
                return (render ? render(null, item, i, undefined, {})
                    : renderText ? renderText(value, item, i, {})
                        : valueEnum ? valueEnum[value]
                            : value);
            }))
        ]), 'Sheet1');
        writeFile(wb, `${filename}.xlsx`, { bookType: 'xlsx' });
        message.success('导出成功');
    });
    return {
        onImport: d1,
        onExport: d2
    };
};
