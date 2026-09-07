"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [dateRange, setDateRange] = useState(initialState);
  const resetRange = () => setDateRange(initialState);

  return (
    <ReservationContext.Provider
      value={{ dateRange, setDateRange, resetRange }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("context was used  outside provider");
  return context;
}

export { ReservationProvider, useReservation };
