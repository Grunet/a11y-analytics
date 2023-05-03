import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import { render as renderLandingPage } from "./website/root.tsx";

function handler(req) {
  const { html } = renderLandingPage();

  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}

serve(handler);
