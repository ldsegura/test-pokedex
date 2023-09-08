import React, { Fragment, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/section/Header";
import Footer from "../components/section/Footer/Footer";
import pagesContants from "../constants/pagesContants";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import _ from "lodash";
import authAction from "../actions/authAction";
import { useDispatch, useGlobalState } from "../store/StoreProvider";
import languageUtils from "../utils/languageUtils";
import localstorageConstants from "../constants/localstorageConstants";
import { useIntl } from "react-intl";

const LoginPage = () => {
  const { auth, locale } = useGlobalState();
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useReducer(
    (formData, newItem) => {
      return { ...formData, ...newItem };
    },
    { email: "", numberPhone: "", password: "" }
  );

  const doLogin = () => {
    const request = {
      identifier: "",
      password: "",
    };

    //TODO validar campos
    setErrorMessage("");

    if (_.isEmpty(formData.email)) {
      setErrorMessage(intl.formatMessage({ id: "login.formValidEmail" }));
      return true;
    }

    if (_.isEmpty(formData.password)) {
      setErrorMessage(intl.formatMessage({ id: "login.formValidPassword" }));
      return true;
    }

    request.identifier = formData.email;
    request.password = formData.password;

    try {
      authAction.get(
        request,
        dispatch,
        (response) => {
          console.log(response);
          window.localStorage.setItem(
            localstorageConstants.AUTH,
            JSON.stringify(response)
          );
          const location = {
            pathname: `${languageUtils.linksLocale(locale)}`,
            //search: `?${new URLSearchParams(query).toString()}`,
          };
          navigate(location);
        },
        (error) => {
          console.error(error.message);
          setErrorMessage(error.message);
        }
      );
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2
                  className="fw-700 display1-size display2-md-size mb-3"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({ id: "login.formWellcome" }),
                  }}
                />
                <form>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-mobile text-grey-500 pe-0"></i>
                    <input
                      value={formData.email}
                      onChange={(e) => {
                        setErrorMessage("");
                        setFormData({ email: e.target.value });
                      }}
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder={intl.formatMessage({
                        id: "login.formPlaceholderEmail",
                      })}
                    />
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      value={formData.password}
                      onChange={(e) => {
                        setErrorMessage("");
                        setFormData({ password: e.target.value });
                      }}
                      type="Password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder={intl.formatMessage({
                        id: "login.formPlaceholderPassword",
                      })}
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                  </div>
                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck5"
                    />
                    <label className="form-check-label font-xsss text-grey-500">
                      {`${intl.formatMessage({ id: "login.formlabelCheck" })} `}
                    </label>{" "}
                    <a
                      //href="/forgot"
                      href="#forgot"
                      className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                    >{`${intl.formatMessage({ id: "login.formlabelForgot" })} `}</a>
                  </div>
                  {errorMessage && (
                    <p className="text-danger mb-2">{errorMessage}</p>
                  )}
                </form>

                <div className="col-sm-12 p-0 text-left">
                  <div className="form-group mb-1">
                    <Button
                      onClick={doLogin}
                      disabled={auth.loading}
                      className="text-center style2-input fw-600 bg-dark w-100 text-white"
                    >
                      {auth.loading && intl.formatMessage({ id: "login.formLoading" })}
                      {!auth.loading && intl.formatMessage({ id: "login.formSend" })}
                    </Button>
                  </div>
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    {intl.formatMessage({ id: "login.formLabelCreateSession" })}{" "}
                    <Link to={`${languageUtils.linksLocale(locale)}${pagesContants.register}`} className="fw-700 ms-1">
                      {intl.formatMessage({ id: "login.formLabelCreateSessionLink" })}
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
