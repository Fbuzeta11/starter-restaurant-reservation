async function checkStatusForCreate(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message: "This reservation is already seated or finished.",
    });
  }
  next();
}

async function checkStatusForUpdate(req, res, next) {
  const { status } = req.body.data;
  const { reservation } = res.locals;
  if (status === "cancelled") {
    return next();
  }
  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: "Cannot update a finished reservation",
    });
  }
  if (status !== "booked" && status !== "seated" && status !== "finished") {
    return next({
      status: 400,
      message: `Status has unknown value: ${status}. Please provide a valid status.`,
    });
  }
  next();
}

module.exports = { checkStatusForCreate, checkStatusForUpdate };
