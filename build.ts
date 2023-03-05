import * as esbuild from "https://deno.land/x/esbuild@v0.17.11/mod.js";

const outputDir = "./dist/";

await cleanDirectory(outputDir);

const buffer = await Deno.readFile("analytics.js");

const result = await esbuild.transform(buffer, {
    minify: true,
});

console.log(result.code);

await Deno.mkdir(outputDir);
await Deno.writeTextFile(`${outputDir}analytics.min.js`, result.code);


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