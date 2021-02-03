import puppeteer from "puppeteer";
import fakerData from "./faker.js";

class autoFill {
  browser;
  page;
  constructor() {}

  async createPage() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async initialize(url) {
    await this.page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 5000,
    });
    await this.page.screenshot({ path: "screenShots/s1.png", fullPage: true });
  }

  async close() {
    await this.page.screenshot({ path: "screenShots/s2.png", fullPage: true });
    await this.page.click(`#submit`);
    await this.page.screenshot({ path: "screenShots/s3.png", fullPage: true });
    await this.page.waitForTimeout(1000);
    await this.browser.close();
  }

  async handle({ id = "lastName", tagName = "INPUT" }) {
    if (tagName === "INPUT") {
      await this.page.type(`#${id}`, fakerData[id]);
    }
  }

  async run(url) {
    await this.createPage();
    await this.initialize(url);
    const array = await this.page.$$eval("input, div", (elements) =>
      elements.map((element) => ({ id: element.id, tagName: element.tagName }))
    );
    const filteredArray = array.filter((v) => v.id !== "");
    for (var element of filteredArray) {
      await this.handle(element);
    }
    await this.close();
  }
}

export default autoFill;
