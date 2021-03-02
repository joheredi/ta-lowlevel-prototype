import {
  AnalyzeParameters,
  AnalyzeStatusParameters,
  CancelHealthJobParameters,
  EntitiesLinkingParameters,
  EntitiesRecognitionGeneralParameters,
  EntitiesRecognitionPiiParameters,
  HealthParameters,
  HealthStatusParameters,
  KeyPhrasesParameters,
  LanguagesParameters,
  RequestParameters,
  SentimentParameters,
} from "./parameters";
import {
  Analyze202Response,
  Analyze400Response,
  Analyze500Response,
  AnalyzeStatus200Response,
  AnalyzeStatus404Response,
  AnalyzeStatus500Response,
  CancelHealthJob202Response,
  CancelHealthJob404Response,
  CancelHealthJob500Response,
  EntitiesLinking200Response,
  EntitiesLinking400Response,
  EntitiesLinking500Response,
  EntitiesRecognitionGeneral200Response,
  EntitiesRecognitionGeneral400Response,
  EntitiesRecognitionGeneral500Response,
  EntitiesRecognitionPii200Response,
  EntitiesRecognitionPii400Response,
  EntitiesRecognitionPii500Response,
  Health202Response,
  Health400Response,
  Health500Response,
  HealthStatus200Response,
  HealthStatus404Response,
  HealthStatus500Response,
  KeyPhrases200Response,
  KeyPhrases400Response,
  KeyPhrases500Response,
  Languages200Response,
  Languages400Response,
  Languages500Response,
  Sentiment200Response,
  Sentiment400Response,
  Sentiment500Response,
} from "./responses";
import { buildRequestUrl } from "./urlHelpers";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  createHttpHeaders,
  createPipelineRequest,
  HttpMethods,
  Pipeline,
  PipelineOptions,
} from "@azure/core-https";
import {
  createDefaultPipeline,
  getCachedDefaultHttpsClient,
} from "./clientHelpers";

interface Routes {
  "/analyze": {
    post(
      options: AnalyzeParameters
    ): Promise<Analyze202Response | Analyze400Response | Analyze500Response>;
  };
  "/analyze/jobs/:jobId": {
    get(
      options?: AnalyzeStatusParameters
    ): Promise<
      | AnalyzeStatus200Response
      | AnalyzeStatus404Response
      | AnalyzeStatus500Response
    >;
  };
  "/entities/health/jobs": {
    post(
      options: HealthParameters
    ): Promise<Health202Response | Health400Response | Health500Response>;
  };
  "/entities/health/jobs/:jobId": {
    get(
      options?: HealthStatusParameters
    ): Promise<
      | HealthStatus200Response
      | HealthStatus404Response
      | HealthStatus500Response
    >;
    delete(
      options?: CancelHealthJobParameters
    ): Promise<
      | CancelHealthJob202Response
      | CancelHealthJob404Response
      | CancelHealthJob500Response
    >;
  };
  "/entities/recognition/general": {
    post(
      options: EntitiesRecognitionGeneralParameters
    ): Promise<
      | EntitiesRecognitionGeneral200Response
      | EntitiesRecognitionGeneral400Response
      | EntitiesRecognitionGeneral500Response
    >;
  };
  "/entities/recognition/pii": {
    post(
      options: EntitiesRecognitionPiiParameters
    ): Promise<
      | EntitiesRecognitionPii200Response
      | EntitiesRecognitionPii400Response
      | EntitiesRecognitionPii500Response
    >;
  };
  "/entities/linking": {
    post(
      options: EntitiesLinkingParameters
    ): Promise<
      | EntitiesLinking200Response
      | EntitiesLinking400Response
      | EntitiesLinking500Response
    >;
  };
  "POST /keyPhrases": {
    post(
      options: KeyPhrasesParameters
    ): Promise<
      KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response
    >;
  };
  "/languages": {
    post(
      options: LanguagesParameters
    ): Promise<
      Languages200Response | Languages400Response | Languages500Response
    >;
  };
  "/sentiment": {
    post(
      options: SentimentParameters
    ): Promise<
      Sentiment200Response | Sentiment400Response | Sentiment500Response
    >;
  };
}

type PathSegments<TRoutes> = AllPathSegments<keyof TRoutes>;
type AllPathSegments<
  TRoute
> = TRoute extends `/${infer TBasePath}/${infer TSubPath}`
  ? `/${TBasePath}` | `/${TBasePath}${AllPathSegments<`/${TSubPath}`>}`
  : TRoute;

type SubRoutes<
  AvailableRoutes,
  SelectedRoute extends string
> = AvailableRoutes extends `${SelectedRoute}${infer Tail}`
  ? "" extends Tail
    ? never
    : Tail
  : never;

type RouteParams<
  TRoute extends string
> = TRoute extends `:${infer _Param}/${infer Tail}`
  ? [string, ...RouteParams<Tail>]
  : TRoute extends `:${infer _Param}`
  ? [string]
  : TRoute extends `${infer _Prefix}:${infer Tail}`
  ? RouteParams<`:${Tail}`>
  : [];

export type TextAnalyticsPathFirst<
  Prefix extends string,
  AvailableRoutes,
  SelectedRoute extends string
> = {
  subclient(): TextAnalyticsPathFirst<
    `${Prefix}${SelectedRoute}`,
    SubRoutes<AvailableRoutes, SelectedRoute>,
    ""
  >;
  subclient<T extends SubRoutes<AvailableRoutes, SelectedRoute>>(
    s: T,
    ...pathParams: RouteParams<T>
  ): TextAnalyticsPathFirst<
    `${Prefix}${SelectedRoute}`,
    SubRoutes<AvailableRoutes, SelectedRoute>,
    T
  >;
} & (`${Prefix}${SelectedRoute}` extends keyof Routes
  ? Routes[`${Prefix}${SelectedRoute}`]
  : {});

export function createTextAnalyticsPathFirst(
  credentials: TokenCredential | KeyCredential,
  Endpoint: string,
  options?: PipelineOptions
): TextAnalyticsPathFirst<"", PathSegments<Routes>, "">["subclient"] {
  const baseUrl = "{Endpoint}/text/analytics/v3.1-preview.3".replace(
    /{Endpoint}/g,
    Endpoint
  );

  const pipeline = createDefaultPipeline(credentials, options);
  pipeline.removePolicy({ name: "exponentialRetryPolicy" });

  const createSubClient = (mainPath: string) => (
    subPath?: string,
    ...pathParams
  ) => {
    let aggregateParams = [];
    let newPath = mainPath;

    if (pathParams && pathParams.length) {
      aggregateParams = [...aggregateParams, ...pathParams];
    }

    if (subPath) {
      newPath = `${mainPath}${subPath}`;
    }
    const subClient = createSubClient(newPath);
    return {
      get: (options: RequestParameters = {}) => {
        const url = buildRequestUrl(baseUrl, newPath, aggregateParams, options);
        return sendRequest("GET", url, pipeline, options);
      },
      post: (options: RequestParameters = {}) => {
        const url = buildRequestUrl(baseUrl, newPath, aggregateParams, options);
        return sendRequest("POST", url, pipeline, options);
      },
      delete: (options: RequestParameters = {}) => {
        const url = buildRequestUrl(baseUrl, newPath, aggregateParams, options);
        return sendRequest("DELETE", url, pipeline, options);
      },
      subclient: subClient,
    };
  };

  return createSubClient("") as any;
}

async function sendRequest(
  method: HttpMethods,
  url: string,
  pipeline: Pipeline,
  options?: RequestParameters
) {
  const httpClient = getCachedDefaultHttpsClient();

  const headers = createHttpHeaders({
    accept: "application/json",
    "content-type": "application/json",
    ...(options.headers ? options.headers.toJSON() : {}),
  });

  let body = undefined;

  if (options.body) {
    body = JSON.stringify(options.body);
  }

  const request = createPipelineRequest({
    url: url.toString(),
    method,
    body,
    headers,
  });

  const result = await pipeline.sendRequest(httpClient, request);

  return {
    request,
    headers: result.headers,
    status: result.status as any,
    body: JSON.parse(result.bodyAsText || "{}"),
  };
}
