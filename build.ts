import * as esbuild from "https://deno.land/x/esbuild@v0.17.11/mod.js";

const outputDir = "./dist/";

await cleanDirectory(outputDir);

const buffer = await Deno.readFile("ga-analytics.js");

const { code:minifiedCode } = await esbuild.transform(buffer, {
    minify: true,
});

console.log(minifiedCode);

await Deno.mkdir(outputDir);
await Deno.writeTextFile(`${outputDir}ga-analytics.min.js`, minifiedCode);

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