import { Form, Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export const HandleAuht = ({ title, buttontext, submiting, isregister }) => {
  const [islogin, setislogn] = useState(
    JSON.parse(localStorage.getItem("islogin")) || false
  );
  const initialValues = isregister
    ? {
        name: "",
        email: "",
        password: "",
        country: "",
      }
    : {
        email: "",
        password: "",
      };

  const nav = useNavigate();

  const validationSchema = Yup.object(
    isregister
      ? {
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Minimum 6 character")
            .required("password is required"),
          country: Yup.string().required("country is required"),
        }
      : {
          email: Yup.string()
            .email("invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Minimum 6 character")
            .required("password is required"),
        }
  );
  const handleSubmit = async (values, { setSubmitting }) => {
    if (isregister) {
      try {
        const res = await api.post("/auth/signup", values);
        toast.success("signup successful!!!");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);

        localStorage.setItem("islogin", true);
        setislogn(true);
        nav("/");
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setSubmitting(false);
      }
    } else {
      try {
        const res = await api.post("/auth/login", values);
        toast.success("login successful!!!");
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);

        localStorage.setItem("islogin", true);
        setislogn(true);
        nav("/");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="max-w-screen-sm mx-auto border mt-4 shadow-lg ">
      <h1 className="text-center text-3xl font-mono">{title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className=" p-4">
            {isregister && (
              <>
                <div>
                  <label htmlFor="name">Name</label> <br />
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="border w-full px-3 rounded-md py-2 bg-gray-200"
                  />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="text-red-500"
                  />
                </div>
                <br />
              </>
            )}

            <div>
              <label htmlFor="email">Email</label> <br />
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="border w-full px-3 rounded-md py-2 bg-gray-200"
              />
              <ErrorMessage
                component="div"
                name="email"
                className="text-red-500"
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">Password</label> <br />
              <Field
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="border w-full px-3 rounded-md py-2 bg-gray-200"
              />
              <ErrorMessage
                component="div"
                name="password"
                className="text-red-500"
              />
            </div>
            <br />
            {isregister && (
              <>
                <div>
                  <label htmlFor="country">Country</label> <br />
                  <Field
                    id="country"
                    type="country"
                    name="country"
                    placeholder="Country"
                    className="border w-full px-3 rounded-md py-2 bg-gray-200"
                  />
                  <ErrorMessage
                    component="div"
                    name="country"
                    className="text-red-500"
                  />
                </div>
                <br />
              </>
            )}

            <button
              className="bg-green-600 hover:bg-green-800  rounded-md w-full py-2 text-white font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? `${submiting}` : `${buttontext}`}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
