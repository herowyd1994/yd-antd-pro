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
var utils_1 = require("@yd/utils");
var antd_1 = require("antd");
exports.default = (function (_a) {
    var _b = _a.layout, layout = _b === void 0 ? 'horizontal' : _b, _c = _a.span, span = _c === void 0 ? 3 : _c, delay = _a.delay, _d = _a.toast, toast = _d === void 0 ? true : _d, submitUrl = _a.submitUrl, updateUrl = _a.updateUrl, _e = _a.request, _f = _e === void 0 ? { url: '' } : _e, url = _f.url, params = _f.params, s = _f.status, c1 = __rest(_f, ["url", "params", "status"]), done = _a.done, c2 = __rest(_a, ["layout", "span", "delay", "toast", "submitUrl", "updateUrl", "request", "done"]);
    var fetch = (0, index_1.useFetch)();
    var _g = (0, r_hooks_1.useStore)({
        status: 'ADD',
        ctx: {}
    }), status = _g.status, ctx = _g.ctx, $dispatch = _g.$dispatch;
    var formRef = (0, react_1.useRef)();
    var actionRef = (0, react_1.useRef)();
    var onFinish = (0, r_hooks_1.useLock)(function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, fetch[status === 'ADD' ? 'post' : 'put'](status === 'ADD' ? submitUrl : updateUrl, __assign(__assign({}, params), ctx), c2)];
                case 1:
                    res = _b.sent();
                    return [4, (done === null || done === void 0 ? void 0 : done(res))];
                case 2:
                    _b.sent();
                    return [4, ((_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload())];
                case 3:
                    _b.sent();
                    toast && antd_1.message.success("".concat(status === 'ADD' ? '提交' : '更新', "\u6210\u529F"));
                    return [2, res];
            }
        });
    }); }, delay).done;
    var onSave = function (params, status) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = status;
                    if (!_a) return [3, 2];
                    return [4, $dispatch({ status: status })];
                case 1:
                    _a = (_e.sent());
                    _e.label = 2;
                case 2:
                    _a;
                    _b = onFinish;
                    _c = [{}];
                    return [4, ((_d = formRef.current) === null || _d === void 0 ? void 0 : _d.validateFields())];
                case 3: return [2, _b.apply(void 0, [__assign.apply(void 0, [__assign.apply(void 0, _c.concat([(_e.sent())])), params])])];
            }
        });
    }); };
    var setFieldsValue = function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (params, ctx, status) {
            var _a;
            if (params === void 0) { params = {}; }
            if (ctx === void 0) { ctx = {}; }
            if (status === void 0) { status = 'EDIT'; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, $dispatch({ status: status, ctx: ctx })];
                    case 1:
                        _b.sent();
                        (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.setFieldsValue(params);
                        return [2];
                }
            });
        });
    };
    var request = (0, index_1.useCache)(url, params, __assign(__assign({}, c1), { immediate: !(0, utils_1.isNone)(params), done: function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, setFieldsValue(data, params, s)];
        }); }); } }));
    return __assign({ formProps: {
            formRef: formRef,
            onFinish: onFinish,
            layout: layout,
            labelCol: { span: span }
        }, status: status, actionRef: actionRef, onSave: onSave, setFieldsValue: setFieldsValue }, request);
});
