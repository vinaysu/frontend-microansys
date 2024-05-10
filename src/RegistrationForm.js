import React, { useState, useEffect,useRef } from "react";
import styles from "./RegistrationForm.module.css";
import { TextField, Button, MenuItem } from "@mui/material";
import { useRecoilState } from "recoil";
import List from "./atom";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import ErrorIcon from "@mui/icons-material/Error";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios"; // Import axios

const RegistrationForm = () => {
  const [offlinePinColorMobile, setOfflinePinColorMobile] = useState(
    "rgba(0, 0, 0, 0.26)"
  );
  const [offlinePinColorWhatsapp, setOfflinePinColorWhatsapp] = useState(
    "rgba(0, 0, 0, 0.26)"
  );
  const [enquirySource, setEnquirySource] = useState("");

  const [formData, setFormData] = useState({
    enquirerType: "",
    enquirerName: "",
    enquirerMobile: "",
    enquirerWhatsapp: "",
    productEnquired: "",
    studentsClass: "",
    studentsBoard: "",
    studentName: "",
    ecenquirerType: false,
    ecenquirerName: false,
    ecenquirerMobile: false,
    ecenquirerWhatsapp: false,
    ecproductEnquired: false,
    ecstudentsClass: false,
    ecstudentsBoard: false,
    ecstudentName: false,
  });

  const [list, setList] = useRecoilState(List);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Save list data to MongoDB whenever it changes
    const saveList = async () => {
      try {
        await axios.post(
          "https://backend-microansys.onrender.com/api/formdata",
          list
        );
      } catch (error) {
        console.error("Error saving list data:", error);
      }
    };

    saveList(); // Call the saveList function whenever list changes
  }, [list]);

  useEffect(() => {
    // Fetch list data from MongoDB
    const fetchList = async () => {
      try {
        const response = await axios.get(
          "https://backend-microansys.onrender.com/api/list"
        );
        setList(response.data);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };

    fetchList(); // Call the fetchList function when the component mounts
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    const IndNum = /^[6-9]\d{9}$/;

    if (name === "enquirerMobile") {
      setOfflinePinColorMobile(IndNum.test(value) ? "green" : "red");
    }

    if (name === "enquirerWhatsapp") {
      setOfflinePinColorWhatsapp(IndNum.test(value) ? "green" : "red");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    const ecFormData = {};

    Object.keys(formData).forEach((key) => {
      ecFormData[`ec${key}`] = false;
    });

    setFormData((prevData) => ({
      ...prevData,
      ...ecFormData,
    }));

    const emptyFields = [];
    if (!formData.enquirerType) emptyFields.push("enquirerType");
    if (!formData.enquirerName) emptyFields.push("enquirerName");
    if (!formData.enquirerMobile) emptyFields.push("enquirerMobile");
    // if (!formData.enquirerWhatsapp) emptyFields.push('enquirerWhatsapp');
    if (!formData.productEnquired) emptyFields.push("productEnquired");
    if (!formData.studentsClass) emptyFields.push("studentsClass");
    if (!formData.studentsBoard) emptyFields.push("studentsBoard");
    if (!formData.studentName) emptyFields.push("studentName");

    if (emptyFields.length > 0) {
      alert("All fields are mandatory. Please fill in all fields.");
      // Focus on the first empty field
      const firstEmptyField = document.querySelector(
        `[name="${emptyFields[0]}"]`
      );

      if (firstEmptyField) firstEmptyField.focus();

      emptyFields.forEach((field) => {
        setFormData((prevData) => ({
          ...prevData,
          [`ec${field}`]: true,
        }));
      });

      return; // Prevent further execution
    }

    const IndNum = /^[6-9]\d{9}$/;

    if (!IndNum.test(formData.enquirerMobile)) {
      alert("Please enter a valid Mobile Number");
      return;
    }

    // Check if WhatsApp number is provided and validate it if it's not empty
    if (formData.enquirerWhatsapp && !IndNum.test(formData.enquirerWhatsapp)) {
      alert("Please enter a valid WhatsApp Number");
      return;
    }

    // if (!IndNum.test(formData.enquirerMobile) || !IndNum.test(formData.enquirerWhatsapp)) {
    //   alert('Please Enter a valid Mobile Number')
    //   return;
    // }

    // setList((prevList) => [...prevList, formData]);
    // Optionally, you can clear the form after submission
    try {
      // Make a POST request to your server to save the form data
      const formDataWithSource = {
        ...formData,
        enquirySource: enquirySource || "walkin", // Assuming you have declared enquirySource state
      };

      const response = await axios.post(
        "https://backend-microansys.onrender.com/api/formdata",
        formDataWithSource
      );
      console.log("Form data saved:", response.data);

      setList((prevList) => [...prevList, formData]);
      setFormData({
        enquirerType: "",
        enquirerName: "",
        enquirerMobile: "",
        enquirerWhatsapp: "",
        productEnquired: "",
        studentsClass: "",
        studentsBoard: "",
        studentName: "",
      });

      alert("Enquiry Submitted successfully");

      setShowContent(true);

      setTimeout(() => {
        setShowContent(false);
      }, 5000);
    } catch (error) {
      console.error("Error saving form data:", error);
      alert("Failed to submit form data. Please try again.");
    }
  }

  const date = new Date().toLocaleDateString();
  const enquirerType = [
    "Student",
    "Parent (Father)",
    "Parent (Mother)",
    "Parent (Guardian)",
    // Add more options as needed
  ];

  const products = ["Tution Center"];
  const classes = ["VI", "VII", "VIII", "IX", "X"];
  const boards = ["BSEAP", "BSETG", "CBSE"];

  const [isSent, setIsSent] = useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);

  const handleSendOtp = () => {
    // Logic to send OTP
    setIsSent(true);
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    alert("OTP verified successfully");
    setSubmitButtonDisabled(false);
    // Logic to verify OTP
    // If OTP is correct, proceed further
  };
  const handleChangeOtp = (index, value) => {

    if (/^\d*$/.test(value)) {
    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);

    if (value && index < otpInputRefs.current.length - 1) {
      otpInputRefs.current[index + 1].current.focus();
    }
  }

  };

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [sendOtpButtonDisabled, setSendOtpButtonDisabled] = useState(false);

  const otpInputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleEnquirySourceChange = (event) => {
    const source = event.target.value;
    setEnquirySource(source);

    if (source === "phone") {
      setSubmitButtonDisabled(false);
      setSendOtpButtonDisabled(true);
    } else {
      setSubmitButtonDisabled(true);
      setSendOtpButtonDisabled(false);
    }
  };

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <fieldset className={styles.fieldSet}>
          <legend>
            <h3>New Enquiry</h3>
          </legend>
          <div className={styles.dateNo}>
            <div>
              <span>
                Enquiry No:<b>{list.length + 1}</b>
              </span>
              <select
                value={enquirySource}
                onChange={handleEnquirySourceChange}
                title="Select the source of enquiry"
              >
                <option value="walkin">WalkIn</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <span>
              Enquiry Date:<b>{date} </b>
            </span>
          </div>
          <div className={styles.textFields}>
            <div className={styles.left}>
              {/* <Tooltip title="Select the Enquirer's relation with the Student" > */}
              <TextField
                select
                required
                className={styles.field}
                label={
                  formData.ecenquirerType ? (
                    <span style={{ color: "red" }}>Enquirer Type</span>
                  ) : (
                    "Enquirer Type"
                  )
                }
                variant="standard"
                name="enquirerType"
                onChange={handleChange}
                value={formData.enquirerType}
              >
                <MenuItem disabled value="">
                  Select the Enquirer's relation with the Student
                </MenuItem>
                {enquirerType.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              {/* </Tooltip> */}

              <TextField
                required
                className={styles.field}
                label={
                  formData.ecenquirerName ? (
                    <span style={{ color: "red" }}>Enquirer Name</span>
                  ) : (
                    "Enquirer Name"
                  )
                }
                variant="standard"
                placeholder="Enter the full name of the Enquirer"
                name="enquirerName"
                onChange={handleChange}
                value={formData.enquirerName}
              />

              <TextField
                required
                className={styles.field}
                label={
                  formData.ecenquirerMobile ? (
                    <span style={{ color: "red" }}>Enquirer Mobile Number</span>
                  ) : (
                    "Enquirer Mobile Number"
                  )
                }
                variant="standard"
                name="enquirerMobile"
                placeholder="Enter the 10 digits Mobile Number"
                onChange={handleChange}
                value={formData.enquirerMobile}
                // InputProps={{ // Here we're adding the icon within the input field
                //   endAdornment: (
                //     <OfflinePinIcon sx={{ color: offlinePinColorMobile }} />
                //   ),
                // }}

                InputProps={{
                  endAdornment:
                    formData.enquirerMobile && offlinePinColorMobile ? (
                      offlinePinColorMobile == "red" ? (
                        <Tooltip title="Enter a valid mobile number">
                          {" "}
                          <ErrorIcon
                            sx={{ color: offlinePinColorMobile }}
                          />{" "}
                        </Tooltip>
                      ) : (
                        <OfflinePinIcon sx={{ color: offlinePinColorMobile }} />
                      )
                    ) : null,
                }}
                inputProps={{
                  maxLength: 10, // Maximum length allowed
                }}
              />
              {/* <OfflinePinIcon sx={{ color: 'green' }} /> */}

              <TextField
                className={styles.field}
                label={
                  formData.ecenquirerWhatsapp ? (
                    <span style={{ color: "red" }}>
                      Enquirer Whatsapp Number (optional)
                    </span>
                  ) : (
                    "Enquirer Whatsapp Number (optional) "
                  )
                }
                variant="standard"
                name="enquirerWhatsapp"
                placeholder="Enter the 10 digits valid Mobile Number"
                onChange={handleChange}
                value={formData.enquirerWhatsapp}
                // InputProps={{ // Here we're adding the icon within the input field
                //   endAdornment: (
                //     <OfflinePinIcon sx={{ color: offlinePinColorWhatsapp }} />
                //   ),
                // }}

                InputProps={{
                  endAdornment:
                    formData.enquirerWhatsapp && offlinePinColorWhatsapp ? (
                      offlinePinColorWhatsapp == "red" ? (
                        <Tooltip title="Enter a valid mobile number">
                          {" "}
                          <ErrorIcon sx={{ color: offlinePinColorWhatsapp }} />
                        </Tooltip>
                      ) : (
                        <OfflinePinIcon
                          sx={{ color: offlinePinColorWhatsapp }}
                        />
                      )
                    ) : null,
                }}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </div>

            <div className={styles.right}>
              <TextField
                select
                required
                className={styles.field}
                label={
                  formData.ecproductEnquired ? (
                    <span style={{ color: "red" }}>Product Enquired for</span>
                  ) : (
                    "Product Enquired for"
                  )
                }
                variant="standard"
                name="productEnquired"
                onChange={handleChange}
                value={formData.productEnquired}
              >
                <MenuItem disabled value="">
                  Select the program in which the student wants to join
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product} value={product}>
                    {product}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                required
                className={styles.field}
                label={
                  formData.ecstudentsClass ? (
                    <span style={{ color: "red" }}>Student's Class</span>
                  ) : (
                    "Student's Class"
                  )
                }
                variant="standard"
                name="studentsClass"
                onChange={handleChange}
                value={formData.studentsClass}
              >
                <MenuItem disabled value="">
                  Select the Class in which the student studying in
                </MenuItem>
                {classes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                required
                className={styles.field}
                label={
                  formData.ecstudentsBoard ? (
                    <span style={{ color: "red" }}>Student's Board</span>
                  ) : (
                    "Student's Board"
                  )
                }
                variant="standard"
                name="studentsBoard"
                onChange={handleChange}
                value={formData.studentsBoard}
              >
                <MenuItem disabled value="">
                  Select the Board in which the student is studying in
                </MenuItem>
                {boards.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                className={styles.field}
                label={
                  formData.ecstudentName ? (
                    <span style={{ color: "red" }}>Student's Name</span>
                  ) : (
                    "Student's Name"
                  )
                }
                variant="standard"
                placeholder="Enter the full name of the student"
                name="studentName"
                onChange={handleChange}
                value={formData.studentName}
              />
            </div>
          </div>

          {showContent && (
            <span style={{ color: "green" }}>
              Enquiry submitted successfully{" "}
            </span>
          )}
          <div className={styles.bottom}>
            <div className={styles.otpSection}>
              {!isSent ? (
                <Button
                  disabled={sendOtpButtonDisabled}
                  onClick={handleSendOtp}
                  variant="contained"
                  color="primary"
                >
                  Send OTP
                </Button>
              ) : (
                <div className={styles.verifySection}>
                  {otpValue.map((value, index) => (
                    <TextField
                      sx={{ width: "40px" }}
                      key={index}
                      variant="outlined"
                      inputRef={otpInputRefs.current[index]}
                      value={value}
                      onChange={(e) => handleChangeOtp(index, e.target.value)}
                      inputProps={{ maxLength: 1 }}
                    />
                  ))}
                  <div className={styles.verifyButtonContainer}>
                    <span style={{ color: "green" }}>
                      OTP Sent successfully
                    </span>
                    <div>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={handleVerifyOtp}
                        variant="contained"
                        color="primary"
                      >
                        Verify OTP
                      </button>
                      <span
                        style={{
                          cursor: "pointer",
                          color: "red",
                          margin: "5px",
                        }}
                      >
                        resend ?
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <Button
                disabled={submitButtonDisabled}
                onClick={handleSubmit}
                variant="contained"
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegistrationForm;
