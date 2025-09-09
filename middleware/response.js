export default function responseMiddleware(req, res, next) {
  res.success = (data = null, status = 200, meta = null) => {
    const payload = { status: "success", code: status };
    if (data !== null) payload.data = data;
    if (meta !== null) payload.meta = meta;
    return res.status(status).json(payload);
  };

  res.error = (
    message = "Internal server error",
    status = 500,
    details = null
  ) => {
    const payload = { status: "error", code: status, message };
    if (details !== null) payload.details = details;
    return res.status(status).json(payload);
  };

  next();
}
