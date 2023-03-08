import { string, object, ref } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { initFirebase } from "../firebase";
import { createUserWithEmailAndPassword as createUser } from "firebase/auth";
import { useEffect } from "react";
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
export default function SignUp({ user, setUser, data, setData }) {
  useEffect(() => {
    setData({
      username: "",
      type: "",
      email: "",
      image: "",
      bio: "",
      password: "",
      confirmPassword: "",
    });
  }, []);
  const { auth, firestore, createUserProfile } = initFirebase();
  const signUpSchema = object({
    username: string().required("Please enter your username"),
    email: string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    type: string().required("Please select your account type"),
    image: string().notRequired(),
    bio: string().min(20).max(200).notRequired(),
    password: string().required("Please enter your password"),
    confirmPassword: string()
      .required("")
      .oneOf([ref("password"), null], "Passwords do not match"),
  });

  const initialValues = { ...data };

  const renderError = (msg) => (
    <motion.p
      className="text-red-700 mt-2 font-bold"
      animate={{
        opacity:
          initialValues.email === "" || initialValues.password === "" ? 1 : 0,
        y: initialValues.email === "" || initialValues.password === "" ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      {msg}
    </motion.p>
  );

  async function onSubmit(values) {
    const { email, password, username, type, image, bio } = values;
    setData({ ...values });

    try {
      const res = await createUser(auth, email, password);
      createUserProfile(res.user, ...data);
      setData({
        username: "",
        type: "",
        email: "",
        image: "",
        bio: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="max-w-full h-fit mt-[10vh] bg-blue-100 py-12">
      <div className="ml-24">
        <motion.p
          className="text-lg font-bold text-gray-600 mb-2"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          Welcome Back
        </motion.p>
        <motion.h2
          className="text-4xl font-bold text-[#1e1e1e]"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          Sign Up
        </motion.h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={async (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          <Form className="w-1/2 h-fit mt-4">
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
              <label className="text-base font-bold mb-4" htmlFor="email">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                placeholder="Enter your email address"
              />
              <ErrorMessage name="email" render={renderError} />
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
              <label className="text-base font-bold mb-4" htmlFor="username">
                Username | Company Name
              </label>
              <Field
                name="username"
                type="text"
                className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                placeholder="Enter your username | company name"
              />
              <ErrorMessage name="username" render={renderError} />
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
              <label className="text-base font-bold mb-4" htmlFor="skills">
                Type
              </label>
              <Field
                name="type"
                as="select"
                className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
              >
                <option value="Employer">Employer</option>
                <option value="Seeker">Seeker</option>
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
                delay: 0.4,
              }}
            >
              <label className="text-base font-bold mb-4" htmlFor="image">
                Avatar
              </label>
              <Field
                name="image"
                type="file"
                className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                placeholder="Add your avatar"
              />
              <ErrorMessage name="image" render={renderError} />
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
              <label className="text-base font-bold mb-4" htmlFor="bio">
                Bio
              </label>
              <Field
                name="bio"
                as="textarea"
                className="w-full h-32 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50 whitespace-normal"
                placeholder="Describe yourself | your company"
              />
              <ErrorMessage name="bio" render={renderError} />
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
              <label className="text-base font-bold mb-4" htmlFor="password">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" render={renderError} />
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
              <label
                className="text-base font-bold mb-4"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="w-full h-12 p-4 ring-blue-300 border-none outline-none ring-2 rounded-md bg-blue-50"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" render={renderError} />
            </motion.div>

            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-md grid place-items-center box-content"
            >
              Sign Up
            </button>
            <div className="mt-4">
              <span>Don't have an account? </span>
              <Link to="/signin" className="text-blue-500 font-bold p-2">
                Sign In
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
