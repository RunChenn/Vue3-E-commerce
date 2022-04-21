const tokenName = 'hexToken';

const Cookies = {
  setCookie(cname, token, expired) {
    const cookieName = cname ? cname : tokenName;
    document.cookie = `${cookieName}=${token};expires=${new Date(expired)}; path=/`;
  },

  getCookie() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

    return token;
  },

  clearCookie(cname) {
    let d = new Date();
    d.setTime(-1);
    document.cookie = `${cname}=;expires=;`;
  },
};
export { Cookies, tokenName };
