"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var r_hooks_1 = require("@yd/r-hooks");
var react_1 = require("react");
exports.default = (function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.rowKey, rowKey = _c === void 0 ? 'id' : _c, _d = _b.type, type = _d === void 0 ? 'checkbox' : _d, _e = _b.defaultKeys, defaultKeys = _e === void 0 ? [] : _e, _f = _b.defaultRecords, defaultRecords = _f === void 0 ? [] : _f, _g = _b.onDisable, onDisable = _g === void 0 ? function () { return false; } : _g;
    var _h = (0, r_hooks_1.useStore)({
        cache: { 1: { keys: defaultKeys, records: defaultRecords } }
    }), cache = _h.cache, $dispatch = _h.$dispatch, $reset = _h.$reset;
    var _j = (0, react_1.useMemo)(function () {
        return Object.values(cache).reduce(function (obj, _a) {
            var keys = _a.keys, records = _a.records;
            return ({
                rowKeys: obj.rowKeys.concat(keys),
                rowRecords: obj.rowRecords.concat(records)
            });
        }, { rowKeys: [], rowRecords: [] });
    }, [cache]), rowKeys = _j.rowKeys, rowRecords = _j.rowRecords;
    var actionRef = (0, react_1.useRef)();
    var onChange = function (keys, records) {
        var _a, _b;
        cache[type === 'radio' ? 1 : (_b = (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.pageInfo) === null || _b === void 0 ? void 0 : _b.current] = { keys: keys, records: records };
        $dispatch({ cache: __assign({}, cache) });
    };
    var getCheckboxProps = function (record) { return ({ disabled: onDisable(record) }); };
    var setCheckboxValues = function (keys, records) {
        return $dispatch({ cache: { 1: { keys: keys, records: records } } });
    };
    var delCheckboxKeys = function (keys) {
        if (keys === '*') {
            return $reset('cache');
        }
        keys = (!Array.isArray(keys) ? [keys] : keys);
        Object.values(cache).forEach(function (value) {
            value.keys = value.keys.filter(function (item) { return !keys.includes(item); });
            value.records = value.records.filter(function (item) { return !keys.includes(item[rowKey]); });
        });
        return $dispatch({ cache: __assign({}, cache) });
    };
    return {
        tableSelectionProps: {
            rowKey: rowKey,
            rowSelection: {
                type: type,
                selectedRowKeys: rowKeys,
                onChange: onChange,
                getCheckboxProps: getCheckboxProps
            }
        },
        rowKeys: rowKeys,
        rowRecords: rowRecords,
        actionRef: actionRef,
        setCheckboxValues: setCheckboxValues,
        delCheckboxKeys: delCheckboxKeys
    };
});
