export function join (...urls) {
  return urls.map(url => {
    return url.replace(/(^\/)|(\/$)/g, '')
  }).join('/')
}
