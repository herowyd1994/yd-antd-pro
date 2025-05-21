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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var r_hooks_1 = require("@yd/r-hooks");
var index_1 = require("../index");
var antd_1 = require("antd");
exports.default = (function (_a) {
    var columns = _a.columns, _b = _a.pageSize, defaultPageSize = _b === void 0 ? 10 : _b, x = _a.width, requestUrl = _a.requestUrl, removeUrl = _a.removeUrl, updateUrl = _a.updateUrl, refs = _a.refs, _c = _a.formatParams, formatParams = _c === void 0 ? function (params) { return params; } : _c, _d = _a.formatData, formatData = _d === void 0 ? function (data) { return data; } : _d, props = __rest(_a, ["columns", "pageSize", "width", "requestUrl", "removeUrl", "updateUrl", "refs", "formatParams", "formatData"]);
    var _e = (0, index_1.useFetch)(), get = _e.get, del = _e.del, put = _e.put;
    var confirm = (0, index_1.useInteractive)().confirm;
    var _f = (0, r_hooks_1.useStore)({
        params: {},
        data: [],
        total: 0
    }), params = _f.params, data = _f.data, total = _f.total, $dispatch = _f.$dispatch;
    var actionRef = (0, react_1.useRef)();
    var request = function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, total;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, formatParams(__assign(__assign({}, params), { pageNum: params.current }))];
                case 1:
                    params = _b.sent();
                    return [4, get(requestUrl, params, __assign(__assign({}, props), { formatData: function (list) { return (Array.isArray(list) ? { list: list, total: list.length } : list); } })).catch(function () { return ({ list: [], total: 0 }); })];
                case 2:
                    _a = _b.sent(), data = _a.list, total = _a.total;
                    return [4, formatData(data)];
                case 3:
                    data = _b.sent();
                    $dispatch({ params: params, data: data, total: total });
                    return [2, {
                            data: data,
                            success: true,
                            total: total
                        }];
            }
        });
    }); };
    var onRemove = function (params_1, content_1) {
        var args_1 = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args_1[_i - 2] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([params_1, content_1], args_1, true), void 0, function (params, content, title, options) {
            var _a;
            var _b;
            if (title === void 0) { title = '确认删除'; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = content;
                        if (!_a) return [3, 2];
                        return [4, confirm(content, title, options)];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a;
                        return [4, del(removeUrl, params)];
                    case 3:
                        _c.sent();
                        return [4, ((_b = actionRef.current) === null || _b === void 0 ? void 0 : _b.reload())];
                    case 4:
                        _c.sent();
                        antd_1.message.success('删除成功');
                        return [2];
                }
            });
        });
    };
    var onUpdate = function (params_1, content_1) {
        var args_1 = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args_1[_i - 2] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([params_1, content_1], args_1, true), void 0, function (params, content, title, options) {
            var _a;
            var _b;
            if (title === void 0) { title = '确认更新'; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = content;
                        if (!_a) return [3, 2];
                        return [4, confirm(content, title, options)];
                    case 1:
                        _a = (_c.sent());
                        _c.label = 2;
                    case 2:
                        _a;
                        return [4, put(updateUrl, params)];
                    case 3:
                        _c.sent();
                        return [4, ((_b = actionRef.current) === null || _b === void 0 ? void 0 : _b.reload())];
                    case 4:
                        _c.sent();
                        antd_1.message.success('更新成功');
                        return [2];
                }
            });
        });
    };
    (0, r_hooks_1.useUpdate)(function () { return refs === null || refs === void 0 ? void 0 : refs.forEach(function (ref) { return (ref.current = actionRef.current); }); }, [actionRef.current]);
    return {
        tableProps: {
            actionRef: actionRef,
            columns: columns,
            request: request,
            search: { defaultCollapsed: false, labelWidth: 'auto' },
            pagination: { showSizeChanger: true, showQuickJumper: true, defaultPageSize: defaultPageSize },
            scroll: { x: x }
        },
        params: params,
        data: data,
        total: total,
        onRemove: onRemove,
        onUpdate: onUpdate
    };
});
