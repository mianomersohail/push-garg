import React from "react";
import { Formik, Field, Form } from "formik";
import "./Signup.css";
import Navbar from "../Nav/NavList";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer2.js/Footer2";
export default function CustomSignupFormik() {
  console.log('IM NAVIGATIO')
  return (
    <>
      <Navbar
        imgsrc={
          "https://t4.ftcdn.net/jpg/06/27/76/77/240_F_627767769_1rl3WsMnO8GuXic8C6I7aEnMWp0Mz5vc.jpg"
        }
        navlinameone={'Login'}
        linkone={'/userlogin'}
      />

      <div className="custom-signup-formik-container">
        <h1 className="custom-signup-title">Sign Up</h1>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            confirmpassword:""

          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className="custom-form">
            <div className="custom-form-group">
              <label htmlFor="">Full Name</label>
              <Field
                id=""
                name="fullname"
                placeholder="Doe"
                className="custom-input"
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="firstName">Email</label>
              <Field
                id="firstName"
                name="email"
                placeholder="jane@acme.com"
                className="custom-input"
              />
            </div>

            <div className="custom-form-group">
              <label htmlFor="lastName">Password</label>
              <Field
                id="lastName"
                type="password"
                name="password"
                placeholder="Doe"
                className="custom-input"
              />
            </div>

            <div className="custom-form-group">
              <label htmlFor="email">Confirm password</label>
              <Field
                id="email"
                name="confirmpassword"
                type="password"
                className="custom-input"
              />
            </div>

            <button type="submit" className="paid-btn-one">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
      <Footer />
    </>
  );
}
