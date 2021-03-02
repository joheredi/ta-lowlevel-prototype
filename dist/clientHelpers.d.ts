import { PipelineOptions, Pipeline, HttpsClient, PipelinePolicy } from "@azure/core-https";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
export declare function createDefaultPipeline(credential: TokenCredential | KeyCredential, options?: PipelineOptions): Pipeline;
export declare function getCachedDefaultHttpsClient(): HttpsClient;
/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export declare const keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";
export declare function keyCredentialAuthenticationPolicy(credential: KeyCredential): PipelinePolicy;
//# sourceMappingURL=clientHelpers.d.ts.map