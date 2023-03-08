import { useLayoutEffect, useState } from "react";
import { initFirebase } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { useJobContext } from "../../hooks/useJobContext";
import { spreadDocs } from "../../utils";
const tags = [
  "User Interface Design",
  "Figma",
  "Wireframing",
  "User Experience",
  "Prototyping",
];
export default function Main() {
  const [open, setOpen] = useState(false);
  const [activeJob, setActiveJob] = useState({});

  const { firestore } = initFirebase();
  const { dispatch, jobs, loading } = useJobContext();

  useLayoutEffect(() => {
    const jobSnapshots = collection(firestore, "Jobs");
    const unsubscribe = onSnapshot(jobSnapshots, (snapshot) => {
      const res = snapshot.docs.map(spreadDocs);
      if (res.length > 0) {
        dispatch({
          type: "GET_JOBS",
          payload: res,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  function handleClick(val) {
    setActiveJob(val);
    setOpen(true);
  }
  return (
    <center className="w-[72.5%] ml-[27.5%] bg-blue-50 h-fit px-12 py-8">
      <div className="w-full h-12 relative search">
        <input
          type="search"
          placeholder="Search by Title, Company or any job's keyword"
          className="absolute top-0 left-0 w-full h-full px-4 py-6 text-base text-gray-400 bg-transparent outline-none border-none ring-2 ring-offset-2 ring-blue-200 rounded-md"
        />
        <button
          type="submit"
          className="absolute top-1 right-4 px-8 py-2 bg-blue-500 text-white font-bold text-[0.95rem] rounded-md"
        >
          Find
        </button>
      </div>
      <section
        className="content mt-8 h-fit overflow-visible scroll"
        data-scroll={open ? "false" : "true"}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          jobs?.map((job, i) => (
            <motion.div
              className="w-full h-fit bg-blue-100 p-8 my-4 rounded-md cursor-pointer"
              key={i}
              onClick={() => handleClick(job)}
            >
              {console.log(jobs)}
              <motion.div
                className="content__header flex items-center gap-x-6 mb-4"
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              >
                <div className="w-16 h-16 rounded-md bg-blue-500" />
                <div>
                  <div className="flex items-center gap-x-2">
                    <h3 className="font-bold text-xl text-[#1e1e1e]">
                      {job.title}
                    </h3>
                    .
                    <span className="text-gray-600 text-sm font-medium">
                      2 Hours ago
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm text-left mt-1">
                    {job.salary} {job.type}
                    Hourly $100-$400 - Remote Friendly - Est Time 1 to 3 months{" "}
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="content__body w-full h-fit"
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                <p className="text-left text-sm text-[#1e1e1e]">
                  {job.description}
                </p>
                <div className="content__body--tags mt-4 text-left">
                  {job.skills?.map((tag, i) => (
                    <span
                      key={i}
                      className="w-fit h-fit px-3 py-1 rounded-full text-[#1e1e1e] bg-blue-200 text-xs mr-3 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="content__footer"
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <p className="text-left mt-4 text-sm font-medium text-gray-600">
                  {job.location}
                </p>
              </motion.div>
            </motion.div>
          ))
        )}
      </section>
      {open && (
        <>
          <JobOverlay open={open} />
          <JobModal open={open} setOpen={setOpen} activeJob={activeJob} />
        </>
      )}
    </center>
  );
}

function JobModal({ open, setOpen, activeJob }) {
  return (
    <motion.div
      className="fixed top-0 left-full w-6/12 h-full z-50 bg-blue-100 pb-8 overflow-y-scroll modal"
      animate={{
        x: open ? "-100%" : "100%",
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
    >
      <button
        className="absolute top-4 right-6 text-2xl text-gray-600 p-4 ml-4"
        onClick={() => setOpen(false)}
      >
        x
      </button>
      <motion.div
        className="content__header flex items-center gap-x-6 mb-4 mt-16 px-6"
        animate={{
          y: open ? 0 : 20,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: open ? 0.3 : 0.5,
        }}
      >
        <div className="w-16 h-16 rounded-md bg-blue-500" />
        <div>
          <h3 className="font-bold text-xl text-[#1e1e1e] text-left">
            {activeJob?.title}
          </h3>
          <div className="flex gap-x-2 items-center">
            <p>{activeJob?.location}</p>.
            <span className="text-gray-600 text-sm font-medium">
              2 Hours ago
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-full h-fit flex justify-between mt-8"
        animate={{
          y: open ? 0 : 20,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: open ? 0.4 : 0.5,
        }}
      >
        <div className="flex gap-x-2 rounded-md w-fit h-fit justify-start mx-6 p-4 ring-offset-0 ring-2 ring-blue-300">
          <div className="w-10 h-10 rounded-md bg-blue-200 border-2 border-blue-300" />
          <div className="text-gray-600 text-left">
            <p>{activeJob?.salary}</p>
            <p className="text-sm font-medium text-gray-600">Avg Salary</p>
          </div>
        </div>

        <div className="flex gap-x-2 rounded-md w-fit h-fit justify-start mx-6 p-4 ring-offset-0 ring-2 ring-blue-300">
          <div className="w-10 h-10 rounded-md bg-blue-200 border-2 border-blue-300" />
          <div className="text-left">
            <p className="font-bold text-[#1e1e1e]">{activeJob?.type}</p>
            <p className="text-sm font-medium text-gray-600">Job Type</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="about mt-8 text-left px-6"
        animate={{
          y: open ? 0 : 20,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: open ? 0.5 : 0.5,
        }}
      >
        <h3 className="text-[#1e1e1e] text-lg font-bold">About the Job</h3>
        <p className="text-sm text-[#1e1e1e]/80 mt-1">
          {activeJob?.description}
        </p>
      </motion.div>

      <motion.div
        className="experience text-left px-6 mt-6 w-full h-fit"
        animate={{
          y: open ? 0 : 20,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: open ? 0.6 : 0.5,
        }}
      >
        <h3 className="text-[#1e1e1e] text-lg font-bold mb-2">
          Required Experience
        </h3>
        <div className="flex flex-col gap-y-4">
          {activeJob?.experience?.map((experience, i) => (
            <div key={i} className="flex gap-x-2 items-center">
              <div className="w-6 h-6 rounded-full bg-blue-500" />
              <p className="text-sm text-gray-600">{experience}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="content__body--tags mt-8 text-left px-6"
        animate={{
          y: open ? 0 : 20,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: open ? 0.7 : 0.5,
        }}
      >
        <h3 className="text-[#1e1e1e] text-lg font-bold mb-2">
          Skills and Expertise
        </h3>
        <div className="flex flex-wrap">
          {activeJob?.skills?.map((tag, i) => (
            <span
              key={i}
              className="w-fit h-fit px-3 py-1 rounded-full text-[#1e1e1e] bg-blue-200 text-xs mr-3 font-medium mb-4"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.button
        className="bg-blue-500 sticky -bottom-8 left-0 w-[95%] h-fit py-4 text-white rounded-md"
        animate={{
          y: open ? 0 : 20,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
          delay: open ? 0.8 : 0.5,
        }}
      >
        Apply for this position
      </motion.button>
    </motion.div>
  );
}

const JobOverlay = ({ open }) => (
  <motion.div
    className="fixed top-0 left-0 w-full h-full bg-[#1e1e1e]/30 z-50"
    style={{
      pointerEvents: open ? "auto" : "none",
    }}
    animate={{
      opacity: open ? 1 : 0,
    }}
  >
    <p className="text-transparent">overlay</p>
  </motion.div>
);
