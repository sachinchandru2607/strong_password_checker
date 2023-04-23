import { useState } from "react";
import getMinStepsForStrongPassword from "../Utils/PasswordValidator";
import { NotificationManager, NotificationContainer } from "react-notifications";
import { storePassword } from "../Utils/Service";
import 'react-notifications/lib/notifications.css';

const Login = () => {
  const [password, setPassword] = useState("");
  const [minSteps, setMinSteps] = useState("")

  const handlePasswordCheck = () => {
    if(password.trim()) {
        let val = getMinStepsForStrongPassword(password)
        setMinSteps(val)
        storePassword({
          "password" : password,
          "minsteps" : val
        }).then((res) => {
          NotificationManager.success("Record added in db successfully")
        }).catch((err) => {
          NotificationManager.error("Someting went wrong in saving in db")
        })
    }else{
        NotificationManager.warning("Please enter the password")
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ bordeRradius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className=" mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    Password Checker
                  </h2>
                  <p className="text-white-50 mb-5">
                    Please enter your password!
                  </p>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="password"
                      value={password}
                      data-testid= "password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setMinSteps("")
                      }}
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="minsteps"
                      id="minSteps"
                      className="form-control form-control-lg"
                      placeholder="minimum steps"
                      data-testid= "min-steps"
                      value={minSteps}
                      disabled={true}
                    />
                  </div>
                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    data-testid= "submit"
                    onClick={handlePasswordCheck}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </section>
  );
};

export default Login;
