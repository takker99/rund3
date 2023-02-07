// @ts-check
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

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

globalThis.addEventListener("load", () => {
  const params = new URLSearchParams(location.search);
  loadAllScripts(params.getAll("js"));
  loadAllStyles(params.getAll("css"));
});
