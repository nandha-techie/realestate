import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { loginUser } from "../../../services/Auth";
import { useAppContext } from "../../../context/AppContext";
import { setLocalStorageUser } from "../../utility/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  password: string;
  email: string;
};

const Login: React.FC<{}> = () => {
  const { user, setUser } = useAppContext();
  const submitButton = useRef<HTMLButtonElement>(null);
  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      //console.log(values);
      if (submitButton.current) {
        submitButton.current.disabled = true;
      }
      let response = await loginUser(values);
      console.log(response.success);
      if (response.success) {
        setLocalStorageUser({
          ...response.success.user,
          token: response.success.token,
        });
        setUser([
          {
            ...user,
            ...response.success.user,
            token: response.success.token,
          },
        ]);
        toast(response.success.message, {
          position: "top-right",
          type: "success",
          autoClose: 2000,
          onClose: () => navigate("/"),
        });
      }
      if (response.error) {
        // console.log(Object.values(response.error)[0]);
        let message: any = Object.values(response.error)[0];
        toast.warn(message);
        if (submitButton.current) {
          submitButton.current.disabled = false;
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <ToastContainer />
      <Container>
        <h2 className="text-center">Login</h2>
        <div className="d-flex justify-content-center">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <Form.Text className="text-danger">
                  {formik.errors.email}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <Form.Text className="text-danger">
                  {formik.errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <Button ref={submitButton} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
