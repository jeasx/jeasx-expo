import isCrossSite, { crossSiteResponse } from "./@helpers/crossSite";

/**
 * Examples which were merged into others: old path -> new location.
 * Each path is matched exactly (a trailing slash is ignored).
 */
const REDIRECTS = {
  "/values": "/essentials#values",
  "/render-props": "/slots#render-props",
  "/aggregator": "/parallel",
  "/readable-stream": "/async-iterable",
  "/prettier": "/post-processing",
  "/cheerio": "/post-processing",
  "/negotiation": "/response#content-negotiation",
};

/**
 * @this {import("./types").ThisContext}
 * @param {import("./types").RouteProps} props
 */
export default async function ({ request, reply }) {
  // Old links to merged examples keep working.
  const target = REDIRECTS[request.path.replace(/\/+$/, "")];
  if (target) {
    return new Response(null, { status: 301, headers: { location: target } });
  }

  // Requests which change state (forms, fetch calls) must come from this site, so other
  // sites can't forge them (CSRF). GET and HEAD always pass, see "./@helpers/crossSite.js".
  if (isCrossSite(request)) {
    return crossSiteResponse();
  }

  // Prepare "this" context
  this.request = request;
  this.reply = reply;
}
