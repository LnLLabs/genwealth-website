import { createFileRoute } from "@tanstack/react-router";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import config from "../../keystatic.config";

const handler = makeGenericAPIRouteHandler({
  config,
  localBaseDirectory: process.cwd(),
});

async function handle({ request }: { request: Request }) {
  const result = await handler({
    method: request.method,
    url: request.url,
    headers: { get: (name) => request.headers.get(name) },
    json: () => request.json(),
  });
  const headers = new Headers();
  const rawHeaders = result.headers as
    HeadersInit | Record<string, string | string[] | undefined> | undefined;
  if (rawHeaders instanceof Headers) {
    rawHeaders.forEach((value, key) => headers.set(key, value));
  } else if (Array.isArray(rawHeaders)) {
    for (const [key, value] of rawHeaders) headers.append(key, value);
  } else if (rawHeaders) {
    for (const [key, value] of Object.entries(rawHeaders)) {
      if (typeof value === "string") headers.set(key, value);
      else if (Array.isArray(value)) value.forEach((item) => headers.append(key, item));
    }
  }
  const body = result.body instanceof Uint8Array ? new Uint8Array(result.body) : result.body;
  return new Response(body, {
    status: result.status ?? 200,
    ...(result.statusText ? { statusText: result.statusText } : {}),
    headers,
  });
}

export const Route = createFileRoute("/api/keystatic/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
      PUT: handle,
      DELETE: handle,
    },
  },
});
