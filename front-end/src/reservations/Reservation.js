import React from "react";
import { formatAs12Hr } from "../utils/date-time";
import {Link} from "react-router-dom"

function Reservation({reservation, handleCancellation}){
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
        status,
      } = reservation;
      return (
        <tr key={reservation_id}>
          <td className="h-25 px-3">{reservation_id}</td>
          <td className="h-25 px-3">
            {first_name} {last_name}
          </td>
          <td className="h-25 px-3">{mobile_number}</td>
          <td className="h-25 px-3">{reservation_date}</td>
          <td className="h-25 px-3">{formatAs12Hr(reservation_time)}</td>
          <td className="h-25 px-3">{people}</td>
          <td className="h-25 px-3" data-reservation-id-status={reservation_id}>
            {status[0].toUpperCase() + status.slice(1)}
          </td>
          <td className="h-25 pr-1">
            {status === "booked" ? (
              <Link to={`/reservations/${reservation_id}/seat`}>
                <button>Seat</button>
              </Link>
            ) : null}
          </td>
          <td className="h-25 pr-1">
            {status === "booked" ? (
              <Link to={`/reservations/${reservation_id}/edit`}>
                <button>Edit</button>
              </Link>
            ) : null}
          </td>
          <td className="h-25 pr-1">
            {status === "booked" ? (
              <button
                data-reservation-id-cancel={reservation_id}
                onClick={() => handleCancellation(reservation_id)}
              >
                Cancel
              </button>
            ) : null}
          </td>
        </tr>
      );
}

export default Reservation