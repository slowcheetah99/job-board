import {
  AiOutlineEdit as Edit,
  AiOutlineDelete as Delete,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { string, object, ref } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { initFirebase } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
export default function Profile() {
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();
  const { firestore } = initFirebase();
  const { data, setData, user, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  async function getUserDocument(uid) {
    if (uid) {
      const ref = doc(firestore, `Users/${user.uid}`);
      const snap = await getDoc(ref);
      if (snap) {
        localStorage.setItem("CURRENT_USER", JSON.stringify(snap.data()));
        const val = localStorage.getItem("CURRENT_USER");
        setUserInfo(JSON.parse(val));
      }
    }
    return;
  }

  useEffect(() => {
    const res = localStorage.getItem("CURRENT_USER");
    if (res) {
      setUserInfo(JSON.parse(res));
    } else {
      getUserDocument(user.uid);
    }
  }, []);

  //call this when modal is show to prompt deletion of account
  function handleDelete() {
    //use auth.signOut() to signOut user
    //delete user from localStorage
    //delete account from firebase
  }

  function handleUpdate() {
    //show form modal
    setShowUpdate(true);
    //validate
    //submit form and hide modal
  }

  return (
    <div className="w-screen min-h-screen bg-blue-100 pt-[5%]">
      <div className="banner w-full h-[20vh] bg-blue-200">
        <h1 className="text-right pt-12 mr-12">Banner</h1>
      </div>
      <div className="relative w-full h-[69.5vh] flex">
        <div className="flex profile">
          <div className="profile-meta absolute -top-20 left-12">
            <div className="w-40 h-40 rounded-full bg-green-400" />
            <div className="flex flex-col gap-y-4 absolute top-0 left-44">
              <div className="flex items-center gap-x-4">
                <p className="w-24 text-[#111] font-bold">Username:</p>
                <span className="whitespace-nowrap">
                  {userInfo?.username || "Username Not Set"}
                </span>
              </div>
              <div className="flex items-center gap-x-4">
                <p className="w-24 text-[#111] font-bold">Email:</p>
                <span>{userInfo?.email || "Email Not Set"}</span>
              </div>
            </div>
            <div className="flex gap-x-4 absolute top-24 left-44 whitespace-nowrap">
              <p className="font-bold w-24">Status</p>
              <p>{userInfo?.type || "Not Set"}</p>
            </div>
          </div>

          <p className="absolute top-24 left-12 w-1/2 h-fit">
            {userInfo?.bio ||
              "Bio Not Set. Click the edit button below to set it"}
          </p>
          <div className="flex absolute top-48 left-12 gap-x-8">
            <button
              type="button"
              className="w-fit h-fit px-6 rounded-md py-2 bg-blue-500 flex gap-x-2 items-center font-bold text-slate-100"
              onClick={handleUpdate}
            >
              <Edit />
              Edit
            </button>

            <button
              type="button"
              className="w-fit h-fit px-6 rounded-md py-2 bg-red-200 text-red-500 flex gap-x-2 items-center font-bold whitespace-nowrap"
              onClick={() => setShowDelete(true)}
            >
              <Delete />
              Delete Account
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between absolute right-12 h-full">
          {Array(3)
            .fill(1)
            .map((_, i) => (
              <div className="w-[40vw] h-32 bg-blue-300 mt-6" key={i} />
            ))}
        </div>
      </div>
      <motion.div
        className="absolute left-0 top-0 z-50 w-fit h-fit"
        animate={{
          x: showUpdate ? "0%" : "-100%",
        }}
        transition={{
          ease: [0.43, 0.13, 0.23, 0.96],
          duration: 0.5,
        }}
      >
        <UpdateModal
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          setData={setData}
          data={data}
        />
      </motion.div>
      <motion.div
        animate={{
          opacity: showUpdate ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="overlay absolute top-0 left-0 w-full h-full z-40 bg-[#111]/20 backdrop-blur-sm"
        style={{
          pointerEvents: showUpdate ? "auto" : "none",
          opacity: showUpdate ? 1 : 0,
        }}
      />
    </div>
  );
}

function UpdateModal({ setShowUpdate, showUpdate, data, setData }) {
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
  const profileSchema = object({
    email: string().email("Please enter a valid email address").notRequired(),
    type: string().notRequired(),
    image: string().notRequired(),
    bio: string().min(20).max(200).notRequired(),
    password: string().notRequired(),
    confirmPassword: string().oneOf(
      [ref("password"), null],
      "Passwords do not match"
    ),
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
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {msg}
    </motion.p>
  );

  async function onSubmit(values) {
    const { email, password, username, type, image, bio } = values;
    setData(values);
    try {
      // // const success = await signUserIn(auth, email, password);
      // if (success.user.uid) {
      //   localStorage.setItem("AUTH_USER", JSON.stringify(success.user));
      //   return navigate("/");
      // }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="max-w-full h-fit bg-blue-100 pt-12 pb-8">
      <button
        className="absolute top-6 right-6 text-2xl text-gray-600 p-4 ml-4"
        onClick={() => setShowUpdate(false)}
      >
        x
      </button>
      <div className="ml-24">
        <h2 className="text-4xl font-bold text-[#1e1e1e]">Edit Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
        >
          <Form className="w-full h-fit mt-4 pr-24">
            <div className="flex w-full justify-between gap-x-8 items-center">
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
            </div>
            <div className="flex w-full justify-between gap-x-8 items-center">
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
            </div>
            <div className="flex w-full gap-x-8 justify-between items-start">
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
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-md grid place-items-center box-content"
            >
              Sign In
            </button>
            <div className="mt-4">
              <span className="font-semibold text-[#111]/70">
                Only fill the fields you wish to change.
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
