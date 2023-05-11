import { getCommonHeadChildren } from "../../common/head.ts";
import { getSharedStyleTag } from "../../common/styles.ts";

const bodyContents = `TODO`;

function render() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${
    getCommonHeadChildren({
      title: "Consent",
      description:
        "Documentation for how to adjust Analytics for Accessibility to work with a consent framework",
    })
  }
        ${getSharedStyleTag()}
      <body>
        <main>
            ${bodyContents}
        </main>
      </body>
    </html>
  `;

  return {
    html,
  };
}

export { render };
