import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import { render as renderLandingPage } from "./root.tsx";

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
  }

  return new Response("Page not found", {
    status: 404,
    statusText: "Not Found",
  });
}

serve(handler);
