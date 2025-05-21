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
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var r_hooks_1 = require("@yd/r-hooks");
var utils_1 = require("@yd/utils");
var cache = {};
exports.default = (function (url, params, _a) {
    if (_a === void 0) { _a = {}; }
    var _b = _a.immediate, immediate = _b === void 0 ? true : _b, _c = _a.interval, interval = _c === void 0 ? 1500 : _c, delay = _a.delay, _d = _a.deps, deps = _d === void 0 ? [] : _d, d = _a.done, config = __rest(_a, ["immediate", "interval", "delay", "deps", "done"]);
    var get = (0, index_1.useFetch)().get;
    var _e = (0, r_hooks_1.useStore)({ data: void 0 }), data = _e.data, dispatch = _e.$dispatch;
    var _f = (0, r_hooks_1.useLock)(function (p) { return __awaiter(void 0, void 0, void 0, function () {
        var key, _a, data, time;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = __assign(__assign({}, params), p);
                    key = "".concat(url).concat((0, utils_1.transformUrlParams)(params));
                    !Reflect.has(cache, key) &&
                        Reflect.set(cache, key, { url: url, params: params, config: config, data: void 0, time: 0 });
                    _a = Reflect.get(cache, key), data = _a.data, time = _a.time;
                    if (!(Date.now() - time > interval)) return [3, 3];
                    return [4, get(url, params, config)];
                case 1:
                    data = _b.sent();
                    Reflect.set(cache, key, { url: url, params: params, config: config, data: data, time: Date.now() });
                    dispatch({ data: data });
                    return [4, (d === null || d === void 0 ? void 0 : d(data))];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2, data];
            }
        });
    }); }, delay), isLocking = _f.isLocking, done = _f.done;
    (0, r_hooks_1.useUpdate)(done, deps, Number(!immediate));
    return {
        data: data,
        isLocking: isLocking,
        dispatch: dispatch,
        request: done
    };
});
