import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/HomePage.css";
import { ColorRing } from "react-loader-spinner";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function HomePage() {
  const [value, setValue] = useState();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [accept, setAccept] = useState(false);
  const [data, setData] = useState();
  const [txnId, setTxnId] = useState();
  const [dob, setDob] = useState(new Date());
  const [otpResponse,setOtpResponse] = useState();
const [name,setName] = useState('');
  const options = [
    'Male', 'Female', 'Others'
  ];
  var dropDownGenderValue = options[0];
  
  var otp;

  var password;
  var abhaId;

  useEffect(() => {
    SessionTokenGenerationApi();
  }, []);

  const SessionTokenGenerationApi = () => {
    const requestOptions = {
      method: "POST",  
    };
    // "proxy": "https://dev.ndhm.gov.in/gateway/v0.5",
    fetch("https://kas-api.swaasa.ai:8085/api/sessions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoader(false);
      });
  };

  const mobileOtpGenerationApi = () => {
    var token = data.sessionData.accessToken;
    axios
      .post(
        "/generateOtp",
        {
          mobile: value,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        if (response) {
          NotificationManager.success("Success", "OTP Sent", 2000);
          setTxnId(response?.data?.txnId);
          setPage(3);
          setAccept(false);
        }
      })
      .catch(function (error) {
        var message = error.response?.data?.details[0]?.message;
        NotificationManager.error(message, "Error", 5000, () => {
          alert("callback");
        });
      });
  };

  const mobileOtpVerificationApi = () => {
    var token = data.sessionData.accessToken;
    axios
      .post(
        "/verifyOtp",
        {
          otp: otp,
          txnId: txnId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        if (response) {
          // debuggers
          NotificationManager.success("Success", "OTP Verified", 2000);
          setOtpResponse(response.data)
          setPage(4)
        }
      })
      .catch(function (error) {
        var message = error.response?.data?.details[0]?.message;
        NotificationManager.error(message, "Error", 5000, () => {
          alert("callback");
        });
      });
  };
  const abhaIdGenerationApi = () => {
    var accesstoken = data.sessionData.accessToken;
    var token = otpResponse.token
    console.log(name);
    axios
      .post(
        "/createHealthId",
      //   {
      //     "address": "b-14 someshwar nagar",
      //     "dayOfBirth": 27,
      //     "districtCode": 603,
      //     "email": "example@demo.com",
      //     "firstName": "Kiran",
      //     "gender": "M",
      //     "healthId": "kiguen096478",
      //     "lastName": "Singh",
      //     "middleName": "",
      //     "monthOfBirth": "5",
      //     "name": "Kiran",
      //     "password": "India@143",
      //     "pincode": "",
      //     "profilePhoto": "",
      //     "stateCode": 35,
      //     "subdistrictCode": "",
      //     "token": token,
      //     "txnId": txnId,
      //     "villageCode": "",
      //     "wardCode": "",
      //     "yearOfBirth": 1996
      // },
        {
          "address": "h",
          "dayOfBirth": dob.getDate(),
          "districtCode": 603,
          "email": "",
          "firstName": name,
          "gender": dropDownGenderValue.charAt(0),
          "healthId": abhaId,
          "lastName": "",
          "middleName": "",
          "monthOfBirth": dob.getMonth() + 1,
          "name": name,
          "password": password,
          "pincode": "500056",
          "profilePhoto": "",
          "stateCode": 35,
          "subdistrictCode": "",
          
          "token": token,
          "txnId": txnId,
          "villageCode": "",
          "wardCode": "",
          "yearOfBirth": dob.getFullYear()
      },
        {
          headers: {
            Authorization: "Bearer " + accesstoken,
          },
        }
      )
      .then(function (response) {
        if (response) {
          NotificationManager.success("Success", "ID Created", 2000);
          // setPage(4)
        }
      })
      .catch(function (error) {
        var message = error.response?.data?.details[0]?.message;
        NotificationManager.error(message, "Error", 5000, () => {
          alert("callback");
        });
      });
  };
  const handleCheckBoxClicked = (e) => {
    setAccept(e.target.checked);
  };
  const handleGenderDropdown = (e) => {
    dropDownGenderValue = e.value
    console.log(dropDownGenderValue)
  };

const createAbhaIdButton = () => {
  abhaIdGenerationApi()
}
  const mobileClicked = () => {
    setPage(2);
  };
  const sendOtpClicked = (item) => {
    if (accept) mobileOtpGenerationApi();
  };
  const otpVerifyClicked = () => {
    mobileOtpVerificationApi();
  };
  const continueClicked = () => {
    setPage(5);
  };
  


  const otpHandler = (e) => {
    otp = e.target.value;
  };
  const nameHandler = (e) => {
    // debugger
    setName(e.target.value)
  };
   const passwordHandler = (e) => {
    password = e.target.value;
  };
  const abhaIdHandler = (e) => {
    abhaId= e.target.value;
  };
  return (
    <>
      {loader ? (
        <div className="loader">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
          />
        </div>
      ) : (
        <div className="mainContent">
          <div className="content ">
            <NotificationContainer />
            <div className="imageContent">
              <p className="imageContext-heading">
                Create Ayushman Bharat Health Account
              </p>
              <p className="imageContext-heading">(ABHA)</p>
              <p className="imageContext-text">
                Your unique digital health identity
              </p>
            </div>

            <div className="formContent">
              {page === 1 && (
                <div className="home">
                  <p className="formContent-heading">Create ABHA ID using</p>
                  <div className="formContent-button" onClick={mobileClicked}>
                    <p className="formContent-button-text">Mobile</p>
                  </div>
                  <div className="formContent-button">
                    <p className="formContent-button-text">AAdhar</p>
                  </div>
                </div>
              )}

              {page === 2 && (
                <div className="mobileNumber">
                  <p className="formContent-heading">
                    Create ABHA using Mobile
                  </p>
                  <p className="mobileNumber-text">Mobile number</p>

                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={value}
                    autoFocus={true}
                    onChange={setValue}
                  />

                  <input
                    className="checkboxAgreed"
                    type="checkbox"
                    value="accept"

                    onChange={handleCheckBoxClicked}
                  />
                  <label className="checkboxText" htmlFor="vehicle1">
                    I agree to Terms of use & Privacy policy
                  </label>
                  <div
                    className={accept ? "mobileNumber-button" : "disabled"}
                    onClick={sendOtpClicked}
                  >
                    <p className="mobileNumber-button-text">Send OTP</p>
                  </div>
                </div>
              )}

              {page === 3 && (
                <div className="OTPverification">
                  <p className="formContent-heading">Mobile verification</p>
                  <p className="mobileNumber-text">OTP sent to Mobile</p>
                  <input
                    className="textfield-otp"
                    type="text"
                    onChange={otpHandler}
                    autoFocus={true}
                  />
                  <div
                    className="mobileNumber-button"
                    onClick={otpVerifyClicked}
                  >
                    <p className="mobileNumber-button-text">Verify</p>
                  </div>
                </div>
              )}
              {page === 4 && (
                <div className="details">
                  <p className="formContent-heading">
                    Create ABHA using Mobile
                  </p>
                  {/* <p className="mobileNumber-text">Password</p>
                  <input className="textfield" type="password" /> */}
                  <p className="mobileNumber-text">Name</p>
                  <input className="textfield" type="text" onChange={nameHandler} autoFocus={true}/>

                  <p className="mobileNumber-text">Gender</p>
                  <Dropdown options={options} onChange={handleGenderDropdown} value={dropDownGenderValue} placeholder="Select Gender" />
                  <p className="mobileNumber-text">Date of birth</p>
                  <DatePicker onChange={setDob} value={dob} />
                  <div
                    className="mobileNumber-button"
                    onClick={continueClicked}
                  >
                    <p className="mobileNumber-button-text">Continue</p>
                  </div>
                </div>
              )}
               {page === 5 && (
                <div className="details">
                  <p className="formContent-heading">
                    Create ABHA using Mobile
                  </p>
                  {/* <p className="mobileNumber-text">Password</p>
                  <input className="textfield" type="password" /> */}
                  <p className="mobileNumber-text">ABHA ID</p>
                  <input className="textfield" type="text" autoFocus={true} onChange={abhaIdHandler} />

                  <p className="mobileNumber-text">Password</p>
                  <input className="textfield" type="password" onChange={passwordHandler}  />
                  <div
                    className="mobileNumber-button"
                    onClick={createAbhaIdButton}
                  >
                    <p className="mobileNumber-button-text">Continue</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
