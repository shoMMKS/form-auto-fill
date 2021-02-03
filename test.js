import { autoFill } from "form-auto-fill";

class customAutoFill extends autoFill {
  async handle({ id = "lastName", tagName = "INPUT" }) {
    if (tagName === "DIV" && id !== "root") {
      await this.page.click(`#${id}`);
      const item = await this.page.$("div[role='presentation']");
      if (item !== undefined) {
        const count = await this.page.$$eval(
          "div[role='presentation'] li",
          (elements) => elements.length
        );
        await this.page.click(
          `div[role='presentation'] li:nth-child(${
            Math.floor(Math.random() * count) + 1
          })`
        );
      }
    }
    await super.handle({ id, tagName });
  }
}

(async () => {
  const instance = new customAutoFill();
  await instance.run(process.argv[2]);
})();
