import { useState, useEffect } from "react";

const usePriceUtil = () => {
  const [tireQuantity, setTireQuantity] = useState(1);
  const [price, setPrice] = useState(120.0);
  const [fee, setFee] = useState(19.96);
  const [taxRate] = useState(0.0885);
  const [balancePrice, setBalancePrice] = useState(17.99);
  const [rebuild, setRebuild] = useState(8.99);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = price * tireQuantity + fee + balancePrice + rebuild;
    setSubtotal(newSubtotal);
    const taxAmount = newSubtotal * taxRate;
    setTotal(newSubtotal + taxAmount);
  }, [tireQuantity, price, fee, balancePrice, rebuild, taxRate]);

  return {
    tireQuantity, setTireQuantity,
    price, setPrice,
    fee, setFee,
    taxRate,
    balancePrice, setBalancePrice,
    rebuild, setRebuild,
    subtotal,
    total
  };
};

export default usePriceUtil;