function getCommonHeadChildren(
  { title, description }: { title: string; description: string },
) {
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" >
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
}

export { getCommonHeadChildren };
