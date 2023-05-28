export const getAuthData = (authHeader?: string) => {
  const bearer = authHeader?.split(" ")[0];
  const token = authHeader?.split(" ")[1];

  return {
    bearer,
    token,
  };
};
