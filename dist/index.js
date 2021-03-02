"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextAnalyticsPathFirst = exports.createTextAnalyticsVerbFirst = void 0;
var textAnalyticsVerbFirst_1 = require("./textAnalyticsVerbFirst");
Object.defineProperty(exports, "createTextAnalyticsVerbFirst", { enumerable: true, get: function () { return textAnalyticsVerbFirst_1.createTextAnalyticsVerbFirst; } });
var TextAnalyticsPathFirst_1 = require("./TextAnalyticsPathFirst");
Object.defineProperty(exports, "createTextAnalyticsPathFirst", { enumerable: true, get: function () { return TextAnalyticsPathFirst_1.createTextAnalyticsPathFirst; } });
__exportStar(require("./models"), exports);
__exportStar(require("./parameters"), exports);
__exportStar(require("./responses"), exports);
