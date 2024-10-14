import React, { useContext, useEffect, useState, useRef } from "react";
import style from "./Login.module.scss";

import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/PuffLoader";

import { postRequest } from "utils/api";
import { UserContext } from "contexts/UserContextProvider";

import * as yup from "yup";

const override = css`
  display: block;
  margin: auto;
  border-color: white;
`;

export default function Login() {
  const User = useContext(UserContext);
  const inputRef = useRef();
  const history = useHistory();

  const [isError, setIsError] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  function handleSubmitForm(values, { setSubmitting }) {
    values = { ...values, fcmToken: User.fcmToken };
    console.log(values);
    postRequest("/auth/login", values)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("role", res.data.role);
        User.refresh();

        switch (res.data.role) {
          case "freelancer":
            history.push("/dashboard/assignments/biddings?page=1");
            break;
          case "client":
          case "admin":
            setIsError(true);
            break;
          default:
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setIsError(true);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.formWrapper}>
        <div className={style.title}>Log In to continue</div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmitForm(values, { setSubmitting });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={style.input}>
                <label>Email</label>
                <Field type="email" name="email">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Email"
                        {...field}
                        className={meta.touched && meta.error ? style.error : null}
                      />
                      {meta.touched && meta.error && (
                        <div className={style.errorMessage}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className={style.input}>
                <label>Password</label>
                <Field name="password">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <input
                        type="password"
                        placeholder="Password "
                        {...field}
                        className={meta.touched && meta.error ? style.error : null}
                      />
                      {meta.touched && meta.error && (
                        <div className={style.errorMessage}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              {isError && <div className={style.credError}>Incorrect Credentials</div>}

              <button disabled={isSubmitting}>
                {isSubmitting ? (
                  <ClipLoader color={"white"} loading={isSubmitting} css={override} size={30} />
                ) : (
                  "Submit"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
