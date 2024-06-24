const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasRequiredProperties = require("../errors/hasRequiredProperties");
const reservationExists = require("../utils/reservationExists");
const statusUpdate = require("../utils/statusUpdate")

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}


async function tableNameIsValid(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "The table_name must be longer than 2 characters.",
    });
  }
  next();
}


async function capacityIsValid(req, res, next) {
  if (typeof req.body.data.capacity !== "number") {
    return next({
      status: 400,
      message: "The capacity of the table must be a number.",
    });
  }
  next();
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}


async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const found = await service.read(table_id);
  if (found) {
    res.locals.table = found;
    return next();
  }
  next({ status: 404, message: `Table with id: ${table_id} does not exist.` });
}


async function checkIfOccupiedOrSeated(req, res, next) {
  const {table,reservation} = res.locals
  if (table.reservation_id) {
    return  next({
    status: 400,
    message: "Table is already occupied. Please select a new table.",
  });
  }
  if(reservation.status === "seated"){
    return next({status:400, message : "Reservation is already seated."})
  }
  next();
}

async function checkCapacity(req, res, next) {
  const people = res.locals.reservation.people;
  const capacity = res.locals.table.capacity;
  if (people > capacity) {
    return next({
      status: 400,
      message: "This reservation exceeds the capacity of the selected table.",
    });
  }
  next();
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const data = await service.update(updatedTable);
  res.status(200).json({ data });
}


async function checkIfFree(req,res,next){
  if(!res.locals.table.reservation_id){
    return next({status:400, message: "Table is not occupied. Cannot finish a free table!"})
  }
  next();
}

async function destroy(req,res){
  const finishedTable = {
    reservation_id : null,
    table_id : res.locals.table.table_id
  }
  await service.update(finishedTable)
  res.status(200).json({})
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasRequiredProperties("table_name", "capacity")),
    asyncErrorBoundary(tableNameIsValid),
    asyncErrorBoundary(capacityIsValid),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(hasRequiredProperties("reservation_id")),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(checkIfOccupiedOrSeated),
    asyncErrorBoundary(checkCapacity),
    asyncErrorBoundary(statusUpdate),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(tableExists),asyncErrorBoundary(checkIfFree), asyncErrorBoundary(statusUpdate),asyncErrorBoundary(destroy)]
};