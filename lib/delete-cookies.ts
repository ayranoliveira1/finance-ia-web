export const deleteCookie = (name: string, path = '/', domain?: string) => {
  let cookie = `${name}=; Max-Age=0; path=${path}`
  if (domain) {
    cookie += `; domain=${domain}`
  }
  document.cookie = cookie
}
