import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";

async function getRenderedDocument(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content();
  await browser.close();

  const dom = new JSDOM(html);
  return dom.window.document;
}

export default getRenderedDocument;
