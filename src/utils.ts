export function makeWsURL(url: string) {
  const protocol = url.split("://")[0];
  return `${protocol == "wss" || protocol == "https" ? "wss" : "ws"}://${url.split("://")[1]}`;
}

export function makeHttpURL(url: string) {
  const protocol = url.split("://")[0];
  return `${protocol == "https" ? "https" : "https"}://${url.split("://")[1]}`;
}
