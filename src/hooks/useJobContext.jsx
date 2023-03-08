import { useContext } from "react";
import { JobContext } from "../context/JobContext";
export function useJobContext() {
  const context = useContext(JobContext);
  if (!context) throw Error("Must be in Job Context");
  return context;
}
