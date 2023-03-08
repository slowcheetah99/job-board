import { string, object, date, array } from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { format } from "date-fns";
import { initFirebase } from "../firebase";
export default function CreateJob({ jobs, setJobs }) {
  const { firestore } = initFirebase();
  const jobSchema = object({
    description: string().required("Please enter your job's description"),
    dueOn: date().required("Please enter the job's due date"),
    experience: array().required(),
    location: string().required(),
    salary: string(),
    skills: array().required(),
    title: string().required("Please enter your job's title"),
    type: string().required("Please select your job's type"),
  });

  const initialValues = {
    description: "",
    dueOn: format(new Date(Date.now()), "yyyy-MM-dd"),
    experience: [""],
    location: "",
    salary: "",
    skills: [""],
    title: "",
    type: "remote",
  };

  const renderError = (msg) => (
    <motion.p className="text-red-700 mt-2 font-bold">{msg}</motion.p>
  );

  function onSubmit(values) {
    //get a reference to get the doc id
    const ref = doc(collection(firestore, "Jobs"));
    //making sure that the id we post to a specific id
    const jobDoc = doc(firestore, `Jobs/${ref.id}`);
    //write to firestore
    setDoc(jobDoc, { ...values });

    //we no longer need to use state to store our jobs as firestore's realtime features update it for us
  }
  return (
    <div className="absolute top-0 z-30 left-0 w-1/3 h-fit bg-slate-100 shadow-lg shadow-[#111]/20 flex flex-col justify-center items-center py-12">
      <motion.h2
        className="text-4xl font-bold text-[#1e1e1e]"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
      >
        Create Job
      </motion.h2>
      <Formik
        initialValues={initialValues}
        validationSchema={jobSchema}
        onSubmit={async (values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        <Form className="w-3/4 h-fit mt-4">
          <motion.div
            className="w-full h-fit mb-8"
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
              delay: 0,
            }}
          >
            <label className="text-base font-bold mb-4" htmlFor="title">
              Job Title
            </label>
            <Field
              name="title"
              type="text"
              className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
              placeholder="Enter your job's title"
            />
            <ErrorMessage name="title" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
            <label className="text-base font-bold mb-4" htmlFor="description">
              Job Description
            </label>
            <Field
              name="description"
              type="text"
              className="w-full h-40 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
              placeholder="Enter your job's description"
              as="textarea"
            />
            <ErrorMessage name="description" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
            <label className="text-base font-bold mb-4" htmlFor="password">
              Location
            </label>
            <Field
              name="location"
              type="text"
              className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
              placeholder="Enter your job's location"
            />
            <ErrorMessage name="location" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
            <label className="text-base font-bold mb-4" htmlFor="password">
              Salary
            </label>
            <Field
              name="salary"
              type="text"
              className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
              placeholder="Enter the job's salary"
            />
            <ErrorMessage name="salary" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
              delay: 0.4,
            }}
          >
            <label className="text-base font-bold mb-4" htmlFor="password">
              Due Date
            </label>
            <Field
              name="dueOn"
              type="date"
              className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
              placeholder="Enter the due date"
            />
            <ErrorMessage name="dueOn" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
              delay: 0.5,
            }}
          >
            <label className="text-base font-bold mb-4" htmlFor="skills">
              Skills
            </label>
            <FieldArray name="skills">
              {({ push, insert, remove, form }) => (
                <div className="w-full h-fit">
                  {form.values.skills.map((skill, index) => (
                    <div key={index} className="w-full h-12 relative mb-4">
                      <Field
                        name={`skills.${index}`}
                        className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                      />
                      {form.values.skills.length !== 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute bottom-0 right-6 rounded-r-md h-12 px-2 bg-blue-300 text-[#111]"
                        >
                          —
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="absolute bottom-0 right-0 rounded-r-md h-12 px-2 bg-blue-500 text-white"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <ErrorMessage name="skills" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
              delay: 0.6,
            }}
          >
            <label className="text-base font-bold mb-4" htmlFor="skills">
              Type
            </label>
            <Field
              name="type"
              as="select"
              className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
            >
              <option value="remote">Remote</option>
              <option value="onSite">On Site</option>
            </Field>
            <ErrorMessage name="type" render={renderError} />
          </motion.div>

          <motion.div
            className="w-full h-fit mb-8"
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
              delay: 0.7,
            }}
          >
            <label className="text-base font-bold mb-4" htmlFor="experience">
              Experience
            </label>
            <FieldArray name="experience">
              {({ push, insert, remove, form }) => (
                <div className="w-full h-fit">
                  {form.values.experience.map((xp, index) => (
                    <div key={index} className="w-full h-12 relative mb-4">
                      <Field
                        name={`experience.${index}`}
                        className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                      />
                      {form.values.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute bottom-0 right-6 rounded-r-md h-12 px-2 bg-blue-300 text-[#111]"
                        >
                          —
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="absolute bottom-0 right-0 rounded-r-md h-12 px-2 bg-blue-500 text-white"
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <ErrorMessage name="experience" render={renderError} />
          </motion.div>

          <button
            type="submit"
            className="w-full h-12 bg-blue-500 text-white rounded-md grid place-items-center box-content"
          >
            Create
          </button>
        </Form>
      </Formik>
    </div>
  );
}
