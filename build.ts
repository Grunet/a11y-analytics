import * as esbuild from "https://deno.land/x/esbuild@v0.17.11/mod.js";
import { gzip } from "https://deno.land/x/compress@v0.4.5/gzip/gzip.ts";

const outputDir = "./dist/";

await cleanDirectory(outputDir);

await esbuild.build({
    entryPoints: ['./ga-analytics.js'],
    outfile: './dist/ga-analytics.min.js',
    bundle: true,
    minify: true
  })

const minifiedCode = await Deno.readTextFile("./dist/ga-analytics.min.js");

console.log(minifiedCode);
console.log("");

const encoder = new TextEncoder();
const bytes = encoder.encode(minifiedCode);
const uint8Array = new Uint8Array(bytes);
const compressedBytes = gzip(uint8Array);

console.log(`Number of bytes: ${uint8Array.length}`);
console.log(`Number of bytes after gzip compression: ${compressedBytes.length}`);

// Directly pasting the minified JS into main.tsx doesn't work because it runs into issues with not escaping backticks, single quotes, and double quotes

// This takes the minified JS and adjusts it so that it can be pasted directly into a JS string defined with backticks
const backticksEscapedVersion = minifiedCode.replaceAll("`", "\\`").replaceAll("${","\\${");
await Deno.writeTextFile(`${outputDir}ga-escapedForBackticks.txt`, backticksEscapedVersion);

Deno.exit();


// Helper functions

async function cleanDirectory(path: string) {
    const [,error] = await functionalDenoOpen(path);
    if (error instanceof Deno.errors.NotFound) {
        //Do nothing, it's already cleaned
    } else {
        Deno.remove(path, { recursive: true});
    }
}

async function functionalDenoOpen(path: string) {
    let fileHandle;
    let error;

    try {
        fileHandle = await Deno.open(path);
    } catch (exception) {
        error = exception;
    }

    return [fileHandle, error];
}