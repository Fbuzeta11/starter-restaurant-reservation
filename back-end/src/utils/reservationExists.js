const reservationService = require("../reservations/reservations.service");

async function reservationExists(req, res, next) {
  const reservation_id =
    req.params.reservation_id || req.body.data.reservation_id;
  const found = await reservationService.read(reservation_id);
  if (found) {
    res.locals.reservation = found;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservation_id} does not exist.`,
  });
}

module.exports = reservationExists;
