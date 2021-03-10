import { AnalyzeParameters, AnalyzeStatusParameters, CancelHealthJobParameters, EntitiesLinkingParameters, EntitiesRecognitionGeneralParameters, EntitiesRecognitionPiiParameters, HealthParameters, HealthStatusParameters, KeyPhrasesParameters, LanguagesParameters, SentimentParameters } from "./parameters";
import { Analyze202Response, Analyze400Response, Analyze500Response, AnalyzeStatus200Response, AnalyzeStatus404Response, AnalyzeStatus500Response, CancelHealthJob202Response, CancelHealthJob404Response, CancelHealthJob500Response, EntitiesLinking200Response, EntitiesLinking400Response, EntitiesLinking500Response, EntitiesRecognitionGeneral200Response, EntitiesRecognitionGeneral400Response, EntitiesRecognitionGeneral500Response, EntitiesRecognitionPii200Response, EntitiesRecognitionPii400Response, EntitiesRecognitionPii500Response, Health202Response, Health400Response, Health500Response, HealthStatus200Response, HealthStatus404Response, HealthStatus500Response, KeyPhrases200Response, KeyPhrases400Response, KeyPhrases500Response, Languages200Response, Languages400Response, Languages500Response, Sentiment200Response, Sentiment400Response, Sentiment500Response } from "./responses";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PipelineOptions, PipelineResponse } from "@azure/core-https";
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
    "/keyPhrases": {
        post(options: KeyPhrasesParameters): Promise<KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response>;
    };
    "/languages": {
        post(options: LanguagesParameters): Promise<Languages200Response | Languages400Response | Languages500Response>;
    };
    "/sentiment": {
        post(options: SentimentParameters): Promise<Sentiment200Response | Sentiment400Response | Sentiment500Response>;
    };
}
declare type RouteParams<TRoute extends string> = TRoute extends `:${infer _Param}/${infer Tail}` ? [string, ...RouteParams<Tail>] : TRoute extends `:${infer _Param}` ? [string] : TRoute extends `${infer _Prefix}:${infer Tail}` ? RouteParams<`:${Tail}`> : [];
declare type PathClient = <T extends keyof Routes>(path: T, ...args: RouteParams<T>) => PathReturn<T>;
declare type PathUncheckedResponse = PipelineResponse & {
    body: any;
};
declare type PathUnchecked = <T extends string>(path: T, ...args: RouteParams<T>) => {
    post(options: LanguagesParameters): Promise<PathUncheckedResponse>;
    put(options: LanguagesParameters): Promise<PathUncheckedResponse>;
    patch(options: LanguagesParameters): Promise<PathUncheckedResponse>;
    get(options: LanguagesParameters): Promise<PathUncheckedResponse>;
    delete(options: LanguagesParameters): Promise<PathUncheckedResponse>;
};
export declare type TextAnalyticsPathFirst = (creds: TokenCredential | KeyCredential, endpoint: string, options?: PipelineOptions) => {
    path: PathClient;
    pathUnckecked: PathUnchecked;
};
/**
 * Path return contains subclients if there are any subpaths available
 * Plus all the verbs supported by the path
 */
declare type PathReturn<T extends keyof Routes> = AllSubPaths<T> extends never ? Routes[T] : {
    subClient: <SubPath extends AllSubPaths<T>>(subPath: SubPath, ...args: RouteParams<SubPath>) => `${T}${SubPath}` extends keyof Routes ? PathReturn<`${T}${SubPath}`> : never;
} & Routes[T];
/** Gets all leaf nodes starting from BasePath */
declare type AllSubPaths<BasePath extends keyof Routes> = HasSubPaths<BasePath, keyof Routes>;
declare type HasSubPaths<BasePath extends keyof Routes, LeafRoutes extends keyof Routes> = LeafRoutes extends `${BasePath}/${infer SubRoute}` ? `/${SubRoute}` : never;
export declare const createTextAnalyticsPathFirst: TextAnalyticsPathFirst;
export {};
//# sourceMappingURL=TextAnalyticsPathFirst.d.ts.map