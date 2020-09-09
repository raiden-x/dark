export function getCookie(cname: string, cookies: string): string {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(cookies);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function getQueryParam(url: string, param: string): string {
  const urlParams = new URLSearchParams(url);
  return decodeURIComponent(urlParams.get(param) ?? '');
}
