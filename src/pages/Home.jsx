import { Sidebar, Main } from "../components/Home";
import { JobProvider } from "../context/JobContext";
import { useNavigate } from "react-router-dom";
import { CreateJob } from "../components";
import { useState, useEffect } from "react";
export default function Home() {
  const [jobs, setJobs] = useState([]);
  return (
    <div className="max-w-full h-[90vh] bg-blue-100 mt-[10vh] relative">
      <Sidebar jobs={jobs} setJobs={setJobs} />
      <Main jobs={jobs} setJobs={setJobs} />
      <CreateJob jobs={jobs} setJobs={setJobs} />
    </div>
  );
}
