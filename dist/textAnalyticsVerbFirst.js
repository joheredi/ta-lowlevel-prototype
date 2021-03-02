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
exports.createTextAnalyticsVerbFirst = void 0;
const core_https_1 = require("@azure/core-https");
const clientHelpers_1 = require("./clientHelpers");
const urlHelpers_1 = require("./urlHelpers");
function createTextAnalyticsVerbFirst(credentials, Endpoint, options) {
    const baseUrl = "{Endpoint}/text/analytics/v3.1-preview.3".replace(/{Endpoint}/g, Endpoint);
    const pipeline = clientHelpers_1.createDefaultPipeline(credentials, options);
    pipeline.removePolicy({ name: "exponentialRetryPolicy" });
    const client = {
        request: (route, ...args) => __awaiter(this, void 0, void 0, function* () {
            const argumentsDetails = extractArguments(args);
            const result = yield sendRequest(baseUrl, pipeline, route, argumentsDetails);
            return result;
        }),
        requestUnchecked: (route, ...args) => __awaiter(this, void 0, void 0, function* () {
            const argumentsDetails = extractArguments(args);
            const result = yield sendRequest(baseUrl, pipeline, route, argumentsDetails);
            return result;
        }),
    };
    return client;
}
exports.createTextAnalyticsVerbFirst = createTextAnalyticsVerbFirst;
function sendRequest(baseUrl, pipeline, route, argumentsDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const httpClient = clientHelpers_1.getCachedDefaultHttpsClient();
        const routeDetails = extractRouteDetails(route);
        const url = urlHelpers_1.buildRequestUrl(baseUrl, routeDetails.path, argumentsDetails.pathParameters, argumentsDetails.options);
        const headers = core_https_1.createHttpHeaders(Object.assign({ accept: "application/json", "content-type": "application/json" }, (argumentsDetails.options.headers
            ? argumentsDetails.options.headers.toJSON()
            : {})));
        let body = undefined;
        if (argumentsDetails.options.body) {
            body = JSON.stringify(argumentsDetails.options.body);
        }
        const request = core_https_1.createPipelineRequest({
            url: url.toString(),
            method: routeDetails.method,
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
function extractArguments(...args) {
    let options = {};
    let pathParameters = [];
    for (const arg of args) {
        if (Array.isArray(arg)) {
            for (const item of arg) {
                if (typeof item === "string") {
                    pathParameters.push(item);
                }
                else {
                    options = item;
                }
            }
        }
        break;
    }
    return {
        options,
        pathParameters,
    };
}
function extractRouteDetails(route) {
    if (!route) {
        throw new Error(`route cannot be undefined or empty`);
    }
    const parts = route.split(" ");
    const supportedMethods = [
        "GET",
        "PUT",
        "POST",
        "DELETE",
        "PATCH",
        "HEAD",
        "OPTIONS",
        "TRACE",
    ];
    if (parts.length !== 2) {
        throw new Error(`Unexpected route format for ${route}\n The expected format is "<VERB> <PATH>" i.e "POST /foo" `);
    }
    const [method, path] = parts;
    if (!supportedMethods.includes(method.toUpperCase())) {
        throw new Error(`Unexpected method: ${method}\n Supported methods: ${JSON.stringify(supportedMethods)} `);
    }
    return {
        method: method,
        path,
    };
}
// function buildRequestUrl<R extends keyof Routes>(
//   baseUrl: string,
//   routePath: string,
//   pathParameters: string[],
//   options: Routes[R]["options"] = {}
// ): string {
//   let path = routePath;
//   for (const pathParam of pathParameters) {
//     path = path.replace(/{.*?}/, pathParam);
//   }
//   const url = new URL(`${baseUrl}/${path}`);
//   if (options.queryParameters) {
//     const queryParams = options.queryParameters;
//     for (const key of Object.keys(queryParams)) {
//       url.searchParams.append(key, (queryParams as any)[key]);
//     }
//   }
//   return url.toString();
// }
