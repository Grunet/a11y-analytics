import * as esbuild from "https://deno.land/x/esbuild@v0.17.11/mod.js";

const buffer = await Deno.readFile("analytics.js");

const result = await esbuild.transform(buffer, {
    minify: true,
});

console.log(result);