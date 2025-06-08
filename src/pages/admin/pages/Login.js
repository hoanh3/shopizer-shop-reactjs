import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import AdminLayout from "../../../layouts/AdminLayout";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import WebService from '../../../util/webService';
import constant from '../../../util/constant';
import { setLocalData, getLocalData } from '../../../util/helper';
import { setLoader } from "../../../redux/actions/loaderActions";
import { setUser, getCountry, getShippingCountry, getState } from "../../../redux/actions/userAction";
import { connect } from "react-redux";
import { multilanguage } from "redux-multilanguage";

const loginForm = {
  username: {
    name: "username",
    validate: {
      required: {
        value: true,
        message: "Email is required"
      }
    }
  },
  loginPassword: {
    name: "loginPassword",
    validate: {
      required: {
        value: true,
        message: "Password is required"
      }
    }
  }
};

const LoginRegister = ({ merchant, strings, location, setLoader, setUser }) => {
  const { pathname } = location;
  const { addToast } = useToasts();
  const history = useHistory();
  const [isRemember, setIsRemember] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
    criteriaMode: "all"
  });

  const onSubmit = async (data) => {
    setLoader(true)
    try {
      let action = constant.ACTION.USER + constant.ACTION.LOGIN;
      let param = { "username": data.username, "password": data.loginPassword }
      let response = await WebService.post(action, param);
      if (response) {
        if (getLocalData('isRemember') === 'true') {
          setLocalData('loginEmail', data.username)
        } else {
          setLocalData('loginEmail', '')
        }
        addToast("You have successfully logged in to this website", { appearance: "success", autoDismiss: true });
        setUser(response)
        setLocalData('token', response.token)
        history.push('/admin')

      }
      setLoader(false)
    } catch (error) {
      addToast("Incorrect username or password", { appearance: "error", autoDismiss: true });
      setLoader(false)
    }
  };
  
  return (
    <Fragment>
      <MetaTags>
        <title>{merchant.name} | {strings["Login"]}</title>
      </MetaTags>
      <AdminLayout headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible">
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey={pathname.split("/admin/")[1]}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4> {strings["Login"]}</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit(onSubmit)} >
                              <div className="login-input">
                                <input
                                  type="text"
                                  name={loginForm.username.name}
                                  placeholder={strings["Email address"]}
                                  ref={register(loginForm.username.validate)}
                                />

                                {errors[loginForm.username.name] && <p className="error-msg">{errors[loginForm.username.name].message}</p>}
                              </div>
                              <div className="login-input">
                                <input
                                  type="text"
                                  className="user-password"
                                  name={loginForm.loginPassword.name}
                                  placeholder={strings["Password"]}
                                  ref={register(loginForm.loginPassword.validate)}
                                />
                                {errors[loginForm.loginPassword.name] && <p className="error-msg">{errors[loginForm.loginPassword.name].message}</p>}
                              </div>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" checked={isRemember} onChange={e => { setIsRemember(!isRemember); e.target.checked ? setLocalData('isRemember', true) : setLocalData('isRemember', false) }} />
                                  <label className="ml-10">{strings["Remember me"]}</label>
                                  <Link to={"/forgot-password"}>
                                    {strings["Forgot Password?"]}
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>{strings["Login"]}</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </Fragment >
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    shipCountryData: state.userData.shipCountry,
    cartItems: state.cartData.cartItems,
    currentLocation: state.userData.currentAddress,
    stateData: state.userData.state,
    defaultStore: state.merchantData.defaultStore,
    merchant: state.merchantData.merchant
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoader: (value) => {
      dispatch(setLoader(value));
    },
    setUser: (data) => {
      dispatch(setUser(data));
    },
    getCountry: () => {
       dispatch(getCountry());
    },
    getShippingCountry: (value) => {
      dispatch(getShippingCountry(value));
    },
    getState: (code) => {
      dispatch(getState(code));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(LoginRegister));