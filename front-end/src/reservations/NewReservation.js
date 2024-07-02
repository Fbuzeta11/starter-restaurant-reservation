import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(null);
  //handler form changes for the create form
  const handleChange = ({ target }) => {
    if (target.name === "people") {
      setFormData({
        ...formData,
        [target.name]: Number(target.value),
      });
    } else {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      event.preventDefault();

      //business rules validation for reservation data
      const [year, month, day] = formData.reservation_date.split("-");
      const [hours, minutes, seconds = 0] =
        formData.reservation_time.split(":");
      const reservationDateTime = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds
      );

      if (Date.now() - Date.parse(reservationDateTime) > 0) {
        throw new Error(
          "Selected time has passed. Reservation can only be made for a future time."
        );
      }
      if (reservationDateTime.getDay() === 2) {
        throw new Error("Sorry, We're closed on Tuesdays!");
      }
      if (Number(hours + minutes) < 1030) {
        throw new Error("Please select a time after 10:30AM.");
      }
      if (Number(hours + minutes) > 2130) {
        throw new Error("Please select a time before 9:30PM.");
      }
      if (formData.people < 1) {
        throw new Error("Reservation must have at least 1 guest.");
      }

      const response = await createReservation(
        formData,
        abortController.signal
      );
      setFormData(initialForm);
      const newDate = formatAsDate(response.reservation_date);
      history.push(`/dashboard?date=${newDate}`);
    } catch (error) {
      setFormErrors(error);
    }
  };

  return (
    <div>
      <h1>New Reservation</h1>
      <ErrorAlert error={formErrors} />
      <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}

export default NewReservation;
