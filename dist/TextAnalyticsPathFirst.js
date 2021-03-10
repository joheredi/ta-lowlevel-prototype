"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextAnalyticsPathFirst = void 0;
const urlHelpers_1 = require("./urlHelpers");
const core_https_1 = require("@azure/core-https");
const clientHelpers_1 = require("./clientHelpers");
const createTextAnalyticsPathFirst = (credentials, endpoint, options) => {
    const baseUrl = "{Endpoint}/text/analytics/v3.1-preview.3".replace(/{Endpoint}/g, endpoint);
    const pipeline = clientHelpers_1.createDefaultPipeline(credentials, options);
    pipeline.removePolicy({ name: "exponentialRetryPolicy" });
    const client = (path, ...args) => {
        return {
            subClient: (subPath, ...subPathArgs) => {
                const subClientPath = `${path}${subPath}`;
                return client(subClientPath, [...args, ...subPathArgs]);
            },
            get: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest("GET", url, pipeline, options);
            },
            post: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest("POST", url, pipeline, options);
            },
            put: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest("PUT", url, pipeline, options);
            },
            patch: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest("PATCH", url, pipeline, options);
            },
            delete: (options = {}) => {
                const url = urlHelpers_1.buildRequestUrl(baseUrl, path, args, options);
                return sendRequest("DELETE", url, pipeline, options);
            },
        };
    };
    return {
        path: client,
        pathUnckecked: client,
    };
};
exports.createTextAnalyticsPathFirst = createTextAnalyticsPathFirst;
function sendRequest(method, url, pipeline, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpClient = clientHelpers_1.getCachedDefaultHttpsClient();
        const headers = core_https_1.createHttpHeaders(Object.assign({ accept: "application/json", "content-type": "application/json" }, (options.headers ? options.headers.toJSON() : {})));
        let body = undefined;
        if (options.body) {
            body = JSON.stringify(options.body);
        }
        const request = core_https_1.createPipelineRequest({
            url: url.toString(),
            method,
            body,
            headers,
        });
        const result = yield pipeline.sendRequest(httpClient, request);
        return {
            request,
            headers: result.headers,
            status: result.status,
            body: JSON.parse(result.bodyAsText || "{}"),
        };
    });
}
