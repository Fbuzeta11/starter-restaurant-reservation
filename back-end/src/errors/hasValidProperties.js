const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_id",
  "reservation_date",
  "reservation_time",
  "status",
  "people",
  "table_name",
  "capacity",
  "created_at",
  "updated_at",
];

function hasValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

module.exports = hasValidProperties;
