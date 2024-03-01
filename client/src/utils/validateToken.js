export const validateToken = () => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    const decodingToken = JSON.parse(atob(accessToken.split(".")[1]));

    if (decodingToken?.exp * 1000 < Date.now()) {
      return "Access Token Expired";
    }
  }
  return true;
};
