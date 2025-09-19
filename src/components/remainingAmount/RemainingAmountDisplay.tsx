import { useSelector } from "react-redux"
import { useEffect } from "react";
export const RemainingAmountDisplay = () => {
  var remaining = useSelector((state: any) => state.budgeting.remainAmount);

  return (
    <span>{remaining !== null ? `$${remaining}` : "set budget first"}</span>
  )
}