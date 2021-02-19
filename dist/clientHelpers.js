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
exports.keyCredentialAuthenticationPolicy = exports.keyCredentialAuthenticationPolicyName = exports.getCachedDefaultHttpsClient = exports.createDefaultPipeline = void 0;
const core_https_1 = require("@azure/core-https");
const core_auth_1 = require("@azure/core-auth");
let cachedHttpsClient;
const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";
function createDefaultPipeline(credential, options = {}) {
    const pipeline = core_https_1.createPipelineFromOptions(options);
    const credentialPolicy = core_auth_1.isTokenCredential(credential) ? core_https_1.bearerTokenAuthenticationPolicy({
        credential,
        scopes: DEFAULT_SCOPE,
    }) : keyCredentialAuthenticationPolicy(credential);
    pipeline.addPolicy(credentialPolicy);
    return pipeline;
}
exports.createDefaultPipeline = createDefaultPipeline;
function getCachedDefaultHttpsClient() {
    if (!cachedHttpsClient) {
        cachedHttpsClient = new core_https_1.DefaultHttpsClient();
    }
    return cachedHttpsClient;
}
exports.getCachedDefaultHttpsClient = getCachedDefaultHttpsClient;
const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
exports.keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";
function keyCredentialAuthenticationPolicy(credential) {
    return {
        name: exports.keyCredentialAuthenticationPolicyName,
        sendRequest(request, next) {
            return __awaiter(this, void 0, void 0, function* () {
                request.headers.set(API_KEY_HEADER_NAME, credential.key);
                return next(request);
            });
        },
    };
}
exports.keyCredentialAuthenticationPolicy = keyCredentialAuthenticationPolicy;
