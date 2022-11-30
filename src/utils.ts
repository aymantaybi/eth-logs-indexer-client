export function makeWsURL(url: string) {
  return `ws://${url.split("://")[1]}`;
}

export function makeHttpURL(url: string) {
  return `http://${url.split("://")[1]}`;
}
