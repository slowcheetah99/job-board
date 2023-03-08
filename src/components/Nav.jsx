import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineLogout, AiFillBell } from "react-icons/ai";
import { initFirebase } from "../firebase";

const navLinks = [
  {
    label: "Find Job",
    target: "/",
  },
  {
    label: "Profile",
    target: "/profile",
  },
];
export default function Nav() {
  const { pathname } = useLocation();
  const { auth } = initFirebase();
  function handleLogout() {
    auth.signOut();
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-[10%] bg-blue-50 flex justify-between px-12 shadow-md z-50">
      <div className="flex gap-x-20 items-center">
        <Link
          to="/"
          className="w-10 h-10 rounded-2xl text-sm text-white bg-blue-500 grid place-items-center"
        >
          J
        </Link>
        <ul className="list-none flex gap-x-6">
          {navLinks.map((nav, i) => {
            const isActive = pathname === nav.target;
            return (
              <li key={i} className="relative w-fit">
                <Link
                  className="px-4 py-2"
                  to={nav.target}
                  style={isActive ? { fontWeight: "bold" } : {}}
                >
                  {nav.label}
                </Link>
                <motion.div
                  className="absolute -bottom-5 w-full h-[2px] bg-blue-500 left-0"
                  animate={{
                    width: isActive ? "100%" : "0%",
                  }}
                  transition={{
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-[1.11rem] w-full h-[2px] bg-red-500 left-0"
                  animate={{
                    width: isActive ? "100%" : "0%",
                  }}
                  transition={{
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex gap-x-6 items-center">
        <Link
          to="/alerts"
          className="w-8 h-8 rounded-full bg-green-200 grid place-items-center"
        >
          <AiFillBell className="fill-green-700" />
        </Link>

        <Link
          to="/profile"
          className="w-8 h-8 rounded-full bg-blue-200 grid place-items-center"
        >
          <p className="text-sm text-blue-500 font-bold">N</p>
        </Link>

        <button
          className="p-2 bg-red-200 text-red-500 rounded-full"
          onClick={handleLogout}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </nav>
  );
}
