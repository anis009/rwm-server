export const responseMsg = (res, status, msg) => {
  return res.status(status).json({
    message: msg,
  });
};
