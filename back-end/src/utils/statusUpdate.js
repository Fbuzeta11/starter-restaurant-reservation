const reservationService = require("../reservations/reservations.service")

async function statusUpdate(req,res,next){
    let updatedReservation
    if(req.method === "PUT"){ 
        updatedReservation = {  
            ...res.locals.reservation,
            status : "seated"
        }
    }
    if(req.method === "DELETE"){
        updatedReservation = {
            reservation_id : res.locals.table.reservation_id,
            status : "finished"
        }
    }
    await reservationService.update(updatedReservation)
    next();
}

module.exports = statusUpdate