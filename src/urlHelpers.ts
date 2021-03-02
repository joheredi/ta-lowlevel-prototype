import { RequestParameters } from "./parameters";

export function buildRequestUrl(
  baseUrl: string,
  routePath: string,
  pathParameters: string[],
  options: RequestParameters = {}
): string {
  let path = routePath;
  for (const pathParam of pathParameters) {
    path = path.replace(/:([^\/]+)/, pathParam);
  }

  const url = new URL(`${baseUrl}/${path}`);

  if (options.queryParameters) {
    const queryParams = options.queryParameters;
    for (const key of Object.keys(queryParams)) {
      url.searchParams.append(key, (queryParams as any)[key]);
    }
  }

  return (
    url
      .toString()
      // Remove double forward slashes
      .replace(/([^:]\/)\/+/g, "$1")
  );
}
