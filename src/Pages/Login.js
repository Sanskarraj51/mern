import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (users) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };


  console.log(formValues);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    login();
  };

  function login() {
    if (Object.keys(validate(formValues)).length === 0) {
      setLoading(true);
      axios
        .post(`http://localhost:3200/login`, {
          email: formValues.email,
          password: formValues.password,
        })
        .then((res) => {
          if (res.data.statuscode == 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            setLoading(false);
            navigate("/");
          }else{
            setLoading(false)
            setErrors(res.data.message)
          }
        })
        .catch((error) => {
          console.log(error);
          setErrors(error.response.data.message)
          setLoading(false);
        });
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-autoloader bg-opacity-10 backdrop-blur-sm">
          <HashLoader color="#18BA60" width="20px" size={80} loading />
        </div>
      )}
      <div className="login">
        <div
          style={{
            background: "url(https://images.pexels.com/photos/12125024/pexels-photo-12125024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          }}
          className="login__left "
        ></div>

        <div className="login__right ">
          <div className="login__rightTop">
            <div className="flex flex-col  items-start ">
              <h2 className="top__title   ">Login</h2>

              <h2 className="top__description">Login to your Account </h2>

              <form
                onSubmit={(e) => handleSubmit(e)}
                className="login__rightForm"
              >
                <div className="form__top ">
                  <label className="">Email</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    className="form__input"
                    placeholder="Enter Your Email"
                  />
                  <div className="text-red-600 ">{formErrors.email}</div>
                </div>
                <div className="form__bottom ">
                  <label className="">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="form__input"
                    placeholder="Enter Your password"
                  />
                  <div className="text-red-600">{formErrors.password}</div>
                </div>

                <div className="checkbox__title text-red-600">{errors}</div>

                <Link to="/register">
                  <h2 className="checkbox__title  text-[#2370B5]  ">
                    Don't have an Account, Register here?{" "}
                  </h2>
                </Link>
                <div className="button__div  ">
                  <button className="w-56 h-12  bg-[#2370B5] justify-center items-center text-normal rounded-full font-bold text-white">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
