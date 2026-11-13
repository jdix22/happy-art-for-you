// Forces https and sends www.happyart.ca to happyart.ca; everything else is the static site.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === 'http:' || url.hostname.startsWith('www.')) {
      url.protocol = 'https:';
      url.hostname = url.hostname.replace(/^www\./, '');
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
