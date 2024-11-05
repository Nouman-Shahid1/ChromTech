export const setCookie = function (cname, cvalue, expiresIn) {
  const d = new Date();
  d.setTime(d.getTime() + expiresIn * 1000);

  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCookie = function (cname) {
  if (typeof document === "undefined") return "";

  const ca = document.cookie.split(";");

  const token = ca.find((c) => {
    return c.replace(" ", "").split("=")[0] === cname;
  });

  if (!token) return "";

  return token.split("=")[1];
};

export const deleteCookie = function (cname) {
  const expires = "expires=" + "Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `${cname}=${""};${expires};path=/`;
};
