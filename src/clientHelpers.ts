import {
  createPipelineFromOptions,
  PipelineOptions,
  bearerTokenAuthenticationPolicy,
  Pipeline,
  DefaultHttpsClient,
  HttpsClient,
  PipelinePolicy,
  PipelineRequest,
  SendRequest,
  PipelineResponse,
} from "@azure/core-https";
import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";

let cachedHttpsClient: HttpsClient | undefined;
const DEFAULT_SCOPE = "https://cognitiveservices.azure.com/.default";

export function createDefaultPipeline(
  credential: TokenCredential | KeyCredential,
  options: PipelineOptions = {}
): Pipeline {
  const pipeline = createPipelineFromOptions(options);
  const credentialPolicy = isTokenCredential(credential) ? bearerTokenAuthenticationPolicy({
    credential,
    scopes: DEFAULT_SCOPE,
  }) : keyCredentialAuthenticationPolicy(credential);
  
  pipeline.addPolicy(
    credentialPolicy
  );

  return pipeline;
}

export function getCachedDefaultHttpsClient(): HttpsClient {
  if (!cachedHttpsClient) {
    cachedHttpsClient = new DefaultHttpsClient();
  }

  return cachedHttpsClient;
}

const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const keyCredentialAuthenticationPolicyName =
  "keyCredentialAuthenticationPolicy";

export function keyCredentialAuthenticationPolicy(
  credential: KeyCredential
): PipelinePolicy {
  return {
    name: keyCredentialAuthenticationPolicyName,
    async sendRequest(
      request: PipelineRequest,
      next: SendRequest
    ): Promise<PipelineResponse> {
      request.headers.set(API_KEY_HEADER_NAME, credential.key);
      return next(request);
    },
  };
}
