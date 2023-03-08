import { Sidebar, Main } from "../components/Home";
import { JobProvider } from "../context/JobContext";
import { useNavigate } from "react-router-dom";
import { CreateJob } from "../components";
import { useState, useEffect } from "react";
export default function Home() {
  return (
    <div className="max-w-full h-[90vh] bg-blue-100 mt-[10vh] relative">
      <Sidebar />
      <Main />
      <CreateJob />
    </div>
  );
}
