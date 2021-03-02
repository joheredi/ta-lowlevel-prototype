"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequestUrl = void 0;
function buildRequestUrl(baseUrl, routePath, pathParameters, options = {}) {
    let path = routePath;
    for (const pathParam of pathParameters) {
        path = path.replace(/:([^\/]+)/, pathParam);
    }
    const url = new URL(`${baseUrl}/${path}`);
    if (options.queryParameters) {
        const queryParams = options.queryParameters;
        for (const key of Object.keys(queryParams)) {
            url.searchParams.append(key, queryParams[key]);
        }
    }
    return (url
        .toString()
        // Remove double forward slashes
        .replace(/([^:]\/)\/+/g, "$1"));
}
exports.buildRequestUrl = buildRequestUrl;
