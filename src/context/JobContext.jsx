import { createContext, useReducer } from "react";
const initialState = {
  jobs: [],
  user: {},
  loading: true,
  data: {
    username: "",
    type: "",
    email: "",
    image: "",
    bio: "",
    password: "",
    confirmPassword: "",
  },
};
export const JobContext = createContext(initialState);

export function JobProvider({ children }) {
  function jobReducer(action, state) {
    switch (action.type) {
      case "GET_JOBS":
        return {
          ...state,
          loading: false,
          jobs: action.payload,
        };

      case "SET_JOBS":
        return {
          ...state,
          jobs: action.payload,
        };

      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };

      default:
        return {
          ...state,
        };
    }
  }

  const [state, dispatch] = useReducer(jobReducer, initialState);
  return (
    <JobContext.Provider value={{ ...state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
}
