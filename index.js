// @ts-check
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import htm from "https://cdn.jsdelivr.net/npm/htm@3.1.1/+esm";
import * as Preact from "https://cdn.jsdelivr.net/npm/preact@10.12.0/+esm";
import * as Hooks from "https://cdn.jsdelivr.net/npm/preact@10.12.0/hooks/+esm";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.8.2/+esm";
globalThis.htmPreact = { html: htm.bind(Preact.h), ...Preact, ...Hooks };
globalThis.d3 = d3;

/** @param {string} url
 * @return {Promise<void>}
 */
const loadScript = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });

/** @param {string} url
 * @return {Promise<void>}
 */
const loadStyle = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("link");
    script.rel = "stylesheet";
    script.href = url;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });

/** load all scripts one by one
 * @param {string[]} urls
 * @return {Promise<void>}
 */
const loadAllScripts = async (urls) => {
  for (const url of urls) {
    await loadScript(url);
  }
};

/** load all styles one by one
 * @param {string[]} urls
 * @return {Promise<void>}
 */
const loadAllStyles = async (urls) => {
  for (const url of urls) {
    await loadStyle(url);
  }
};

const params = new URLSearchParams(location.search);
loadAllScripts(params.getAll("js"));
loadAllStyles(params.getAll("css"));
