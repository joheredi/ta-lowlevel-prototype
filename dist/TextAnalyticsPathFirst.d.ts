import { AnalyzeParameters, AnalyzeStatusParameters, CancelHealthJobParameters, EntitiesLinkingParameters, EntitiesRecognitionGeneralParameters, EntitiesRecognitionPiiParameters, HealthParameters, HealthStatusParameters, KeyPhrasesParameters, LanguagesParameters, SentimentParameters } from "./parameters";
import { Analyze202Response, Analyze400Response, Analyze500Response, AnalyzeStatus200Response, AnalyzeStatus404Response, AnalyzeStatus500Response, CancelHealthJob202Response, CancelHealthJob404Response, CancelHealthJob500Response, EntitiesLinking200Response, EntitiesLinking400Response, EntitiesLinking500Response, EntitiesRecognitionGeneral200Response, EntitiesRecognitionGeneral400Response, EntitiesRecognitionGeneral500Response, EntitiesRecognitionPii200Response, EntitiesRecognitionPii400Response, EntitiesRecognitionPii500Response, Health202Response, Health400Response, Health500Response, HealthStatus200Response, HealthStatus404Response, HealthStatus500Response, KeyPhrases200Response, KeyPhrases400Response, KeyPhrases500Response, Languages200Response, Languages400Response, Languages500Response, Sentiment200Response, Sentiment400Response, Sentiment500Response } from "./responses";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions } from "@azure/core-https";
interface Routes {
    "/analyze": {
        post(options: AnalyzeParameters): Promise<Analyze202Response | Analyze400Response | Analyze500Response>;
    };
    "/analyze/jobs/:jobId": {
        get(options?: AnalyzeStatusParameters): Promise<AnalyzeStatus200Response | AnalyzeStatus404Response | AnalyzeStatus500Response>;
    };
    "/entities/health/jobs": {
        post(options: HealthParameters): Promise<Health202Response | Health400Response | Health500Response>;
    };
    "/entities/health/jobs/:jobId": {
        get(options?: HealthStatusParameters): Promise<HealthStatus200Response | HealthStatus404Response | HealthStatus500Response>;
        delete(options?: CancelHealthJobParameters): Promise<CancelHealthJob202Response | CancelHealthJob404Response | CancelHealthJob500Response>;
    };
    "/entities/recognition/general": {
        post(options: EntitiesRecognitionGeneralParameters): Promise<EntitiesRecognitionGeneral200Response | EntitiesRecognitionGeneral400Response | EntitiesRecognitionGeneral500Response>;
    };
    "/entities/recognition/pii": {
        post(options: EntitiesRecognitionPiiParameters): Promise<EntitiesRecognitionPii200Response | EntitiesRecognitionPii400Response | EntitiesRecognitionPii500Response>;
    };
    "/entities/linking": {
        post(options: EntitiesLinkingParameters): Promise<EntitiesLinking200Response | EntitiesLinking400Response | EntitiesLinking500Response>;
    };
    "POST /keyPhrases": {
        post(options: KeyPhrasesParameters): Promise<KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response>;
    };
    "/languages": {
        post(options: LanguagesParameters): Promise<Languages200Response | Languages400Response | Languages500Response>;
    };
    "/sentiment": {
        post(options: SentimentParameters): Promise<Sentiment200Response | Sentiment400Response | Sentiment500Response>;
    };
}
declare type PathSegments<TRoutes> = AllPathSegments<keyof TRoutes>;
declare type AllPathSegments<TRoute> = TRoute extends `/${infer TBasePath}/${infer TSubPath}` ? `/${TBasePath}` | `/${TBasePath}${AllPathSegments<`/${TSubPath}`>}` : TRoute;
declare type SubRoutes<AvailableRoutes, SelectedRoute extends string> = AvailableRoutes extends `${SelectedRoute}${infer Tail}` ? "" extends Tail ? never : Tail : never;
declare type RouteParams<TRoute extends string> = TRoute extends `:${infer _Param}/${infer Tail}` ? [string, ...RouteParams<Tail>] : TRoute extends `:${infer _Param}` ? [string] : TRoute extends `${infer _Prefix}:${infer Tail}` ? RouteParams<`:${Tail}`> : [];
export declare type TextAnalyticsPathFirst<Prefix extends string, AvailableRoutes, SelectedRoute extends string> = {
    subclient(): TextAnalyticsPathFirst<`${Prefix}${SelectedRoute}`, SubRoutes<AvailableRoutes, SelectedRoute>, "">;
    subclient<T extends SubRoutes<AvailableRoutes, SelectedRoute>>(s: T, ...pathParams: RouteParams<T>): TextAnalyticsPathFirst<`${Prefix}${SelectedRoute}`, SubRoutes<AvailableRoutes, SelectedRoute>, T>;
} & (`${Prefix}${SelectedRoute}` extends keyof Routes ? Routes[`${Prefix}${SelectedRoute}`] : {});
export declare function createTextAnalyticsPathFirst(credentials: TokenCredential | KeyCredential, Endpoint: string, options?: PipelineOptions): TextAnalyticsPathFirst<"", PathSegments<Routes>, "">["subclient"];
export {};
//# sourceMappingURL=TextAnalyticsPathFirst.d.ts.map