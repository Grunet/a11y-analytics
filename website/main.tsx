import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import { render as renderLandingPage } from "./pages/index.tsx";
import { render as renderFuturePage } from "./pages/future/index.tsx";
import { render as renderDocsPage } from "./pages/docs/index.tsx";
import { render as renderDocsConsentPage } from "./pages/docs/consent/index.tsx";

function handler(req: Request) {
  const method = req.method;
  const pathname = (new URL(req.url)).pathname;

  if (method === "GET") {
    if (pathname === "/") {
      const { html } = renderLandingPage();

      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    }

    if (pathname === "/future/") {
      const { html } = renderFuturePage();

      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    }

    if (pathname === "/docs/") {
      const { html } = renderDocsPage();

      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    }

    if (pathname === "/docs/consent/") {
      const { html } = renderDocsConsentPage();

      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    }
  }

  return new Response("Page not found", {
    status: 404,
    statusText: "Not Found",
  });
}

serve(handler);
