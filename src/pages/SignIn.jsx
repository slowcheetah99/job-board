import { string, object } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { initFirebase } from "../firebase";
import { signInWithEmailAndPassword as signUserIn } from "firebase/auth";
export default function SignIn() {
  const { auth } = initFirebase();
  const loginSchema = object({
    email: string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    password: string().required("Please enter your password"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

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
    const { email, password } = values;
    try {
      await signUserIn(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="max-w-full h-[90vh] mt-[10vh] bg-blue-100 pt-12">
      <div className="ml-24">
        <p className="text-lg font-bold text-gray-600 mb-2">Welcome Back</p>
        <h2 className="text-4xl font-bold text-[#1e1e1e]">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
        >
          <Form className="w-1/2 h-fit mt-4">
            <div className="w-full h-fit mb-8">
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
            </div>

            <div className="w-full h-fit mb-8">
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
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-md grid place-items-center box-content"
            >
              Sign In
            </button>
            <div className="mt-4">
              <span>Don't have an account? </span>
              <Link className="text-blue-500 font-bold p-2" to="/signup">
                Sign Up
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
