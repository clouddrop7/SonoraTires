import { useState } from 'react';

// functions for handle date validation when user sets an appointment date before making a purchase for tire selection.

const useFormDateValidation = () => {
  const [date, setDate] = useState({ month: "", day: "", year: "", time: "" });

  const handleDate = (e) => setDate({ ...date, [e.target.name]: e.target.value });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatTime = (time) => {
    if (!time) return "Not set";
    const [hours, minutes] = time.split(":");
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? "PM" : "AM";
    const adjustedHour = hourNum % 12 || 12;
    return `${adjustedHour}:${minutes} ${period}`;
  };

  return { date, setDate, handleDate, getCurrentDate, getCurrentTime, formatTime };
};

export default useFormDateValidation;