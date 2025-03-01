import React, { createContext, useState, useEffect } from "react";
import useFormDateValidation from "../utils/formDateValidation";
import { validationSchema } from "../utils/formValidation";
import usePriceUtil from "../utils/tirePriceUtil";
import useCarSelection from "../utils/carSelectionUtil";

export const TireContext = createContext(null);

const TireProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const toggleForm = () => {
    setShow((prev) => !prev);
  };
  const [placement, setPlacement] = useState("end");
  const [view, setView] = useState("form");
  const [selectedTire, setSelectedTire] = useState(null);

  const [customerPurchase, setCustomerPurchase] = useState({
    firstName: '', lastName: '', email: '', phone: '', carMake: '', carModel: '',
    carProfile: '', carYear: '', wheelSize: '', tireSelection: '', tireQuantity: '',
    total: '', date: '', apptDate: ''
  });
  const [showModal, setShowModal] = useState(false);

  const { date, setDate, handleDate, getCurrentDate, getCurrentTime, formatTime } = useFormDateValidation();
  const { make, models, years, profiles, wheels, tires, selectedMake, selectedModel, selectedYear, selectedProfile, selectedWheel, loading, error,
    handleMakeChange, handleModelChange, handleYearChange, handleProfileChange, handleWheelChange, handleBackToForm, fetchCarDetails, setMakesFromCache } = useCarSelection();
  const { tireQuantity, setTireQuantity, price, setPrice, fee, setFee, taxRate, balancePrice, setBalancePrice, rebuild, setRebuild, subtotal, total } = usePriceUtil();

  useEffect(() => {
    const handleResize = () => setPlacement(window.innerWidth < 992 ? "start" : "end");
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cachedMakes = localStorage.getItem("carMakes");
    if (show && make.length === 0 && !cachedMakes) {
      fetchCarDetails();
    } else if (show && make.length === 0 && cachedMakes) {
      setMakesFromCache(JSON.parse(cachedMakes));
    }
  }, [show, make.length, fetchCarDetails, setMakesFromCache]);

  useEffect(() => {
    if (tires.length > 0 && view === "form") setView("tires");
  }, [tires, view]);

  const handleScheduleInstall = (tire) => {
    setSelectedTire(tire);
    setView("install");
  };

  const handlePurchase = async (values, { setSubmitting }) => {
    const currentDate = new Date();
    const apptDate = date.year && date.month && date.day && date.time 
      ? `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}T${date.time}:00`
      : currentDate.toISOString();
    const profileName = profiles.find(p => p.slug === selectedProfile)?.name || 'Unknown';

    const purchaseData = {
      firstName: values.firstName || '',
      lastName: values.lastName || '',
      email: values.email || '',
      phone: values.phone || '',
      carMake: selectedMake || 'Unknown',
      carModel: selectedModel || 'Unknown',
      carProfile: profileName,
      carYear: selectedYear || 'Unknown',
      wheelSize: selectedWheel || 'Unknown',
      tireSelection: selectedTire ? selectedTire.name : 'None',
      tireQuantity: tireQuantity || 1,
      total: total ? total.toFixed(2) : '0.00',
      date: new Date().toISOString(),
      apptDate: apptDate,
    };

    setCustomerPurchase(purchaseData);

    try {
      const response = await fetch('https://us-central1-sonoratiresinc.cloudfunctions.net/postCustomerPurchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Submission failed');

      setShowModal(true);
    } catch (error) {
      console.error('Error submitting purchase:', error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setView("form");
    toggleForm();
  };

  const sortedTires = [...tires].sort((a, b) => a.brand.localeCompare(b.brand));
  console.log(show);

  return (
    <TireContext.Provider value={{
      placement, view, setView, selectedTire, setSelectedTire,
      tireQuantity, setTireQuantity, price, setPrice, fee, setFee, taxRate,
      balancePrice, setBalancePrice, rebuild, setRebuild, subtotal, total,
      make, models, years, profiles, wheels, tires, selectedMake, selectedModel,
      selectedYear, selectedProfile, selectedWheel, loading, error, date, sortedTires, setDate,
      customerPurchase, showModal, show, toggleForm, setShowModal, getCurrentDate, getCurrentTime,
      handleDate, handleMakeChange, handleModelChange, handleYearChange,
      handleProfileChange, handleWheelChange, handleBackToForm, handleScheduleInstall,
      formatTime, validationSchema, handlePurchase, handleModalClose
    }}>
      {children}
    </TireContext.Provider>
  );
};

export default TireProvider;