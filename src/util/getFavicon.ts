// https://icons.favicone.com/i/www.google.com/favicon.ico
// https://www.google.com/s2/favicons?domain=${host}
export function getFavicon(url: string): string {
  const parsedUrl = new URL(url);
  const host = parsedUrl.hostname;
  return `https://www.google.com/s2/favicons?domain=${host}`;
}
