import React from "react";
import { finishTable } from "../utils/api";
//import {deletePartyFromTable } from "../utils/api"

function Tables({ loadDashboard, tables, setReservationsError }) {
  const handleFinish = async (table_id) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Is this table ready to seat new guests?\nThis cannot be undone."
        )
      ) {
        await finishTable(table_id, abortController.signal);
        //await deletePartyFromTable(table_id, abortController.signal);
        await loadDashboard();
      }
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  };

  const rows = tables.map((table) => {
    const finishButton = (
      <button
        data-table-id-finish={table.table_id}
        onClick={() => handleFinish(table.table_id)}
      >
        Finish
      </button>
    );

    return (
      <tr key={table.table_id}>
        <td className="px-3">{table.table_name}</td>
        <td className="px-3">{table.capacity}</td>
        <td className="px-3" data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </td>
        <td className="px-3">{table.reservation_id ? finishButton : null}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th className="px-3">Table</th>
          <th className="px-3">Capacity</th>
          <th className="px-3">Availability</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Tables;
