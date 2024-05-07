import React, { useState, useEffect } from 'react';
import styles from './RegistrationForm.module.css';
import { TextField, Button, MenuItem } from '@mui/material';
import { useRecoilState } from 'recoil';
import List from './atom'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'; // Import axios



const RegistrationForm = () => {


  const [offlinePinColorMobile, setOfflinePinColorMobile] = useState('rgba(0, 0, 0, 0.26)');
  const [offlinePinColorWhatsapp, setOfflinePinColorWhatsapp] = useState('rgba(0, 0, 0, 0.26)');

  const [formData, setFormData] = useState({
    enquirerType: '',
    enquirerName: '',
    enquirerMobile: '',
    enquirerWhatsapp: '',
    productEnquired: '',
    studentsClass: '',
    studentsBoard: '',
    ecenquirerType: false,
    ecenquirerName: false,
    ecenquirerMobile: false,
    ecenquirerWhatsapp: false,
    ecproductEnquired: false,
    ecstudentsClass: false,
    ecstudentsBoard: false,
  });

  const [list, setList] = useRecoilState(List);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Save list data to MongoDB whenever it changes
    const saveList = async () => {
      try {
        await axios.post('https://backend-microansys.onrender.com/api/formdata', list);
      } catch (error) {
        console.error('Error saving list data:', error);
      }
    };

    saveList(); // Call the saveList function whenever list changes
  }, [list]);



  useEffect(() => {
    // Fetch list data from MongoDB
    const fetchList = async () => {
      try {
        const response = await axios.get('https://backend-microansys.onrender.com/api/list');
        setList(response.data);
      } catch (error) {
        console.error('Error fetching list data:', error);
      }
    };

    fetchList(); // Call the fetchList function when the component mounts
  }, []);




  function handleChange(event) {
    const { name, value } = event.target;

    const IndNum = /^[6-9]\d{9}$/

    if (name === 'enquirerMobile') {
      setOfflinePinColorMobile(IndNum.test(value) ? 'green' : 'red');
    }

    if (name === 'enquirerWhatsapp') {
      setOfflinePinColorWhatsapp(IndNum.test(value) ? 'green' : 'red');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }



  async function handleSubmit() {

    const ecFormData = {};

    Object.keys(formData).forEach(key => {
      ecFormData[`ec${key}`] = false;
    });

    setFormData(prevData => ({
      ...prevData,
      ...ecFormData
    }));


    const emptyFields = [];
    if (!formData.enquirerType) emptyFields.push('enquirerType');
    if (!formData.enquirerName) emptyFields.push('enquirerName');
    if (!formData.enquirerMobile) emptyFields.push('enquirerMobile');
    if (!formData.enquirerWhatsapp) emptyFields.push('enquirerWhatsapp');
    if (!formData.productEnquired) emptyFields.push('productEnquired');
    if (!formData.studentsClass) emptyFields.push('studentsClass');
    if (!formData.studentsBoard) emptyFields.push('studentsBoard');


    if (emptyFields.length > 0) {
      alert('All fields are mandatory. Please fill in all fields.');
      // Focus on the first empty field
      const firstEmptyField = document.querySelector(`[name="${emptyFields[0]}"]`);
      if (firstEmptyField) firstEmptyField.focus();
      emptyFields.forEach(field => {
        setFormData(prevData => ({
          ...prevData,
          [`ec${field}`]: true
        }));
      });

      return; // Prevent further execution
    }

    const IndNum = /^[6-9]\d{9}$/

    if (!IndNum.test(formData.enquirerMobile) || !IndNum.test(formData.enquirerWhatsapp)) {
      alert('Please Enter the valid Mobile Number')
      return;
    }


    // setList((prevList) => [...prevList, formData]);
    // Optionally, you can clear the form after submission
    try {
      // Make a POST request to your server to save the form data
      const response = await axios.post('https://backend-microansys.onrender.com/api/formdata', formData);
      console.log('Form data saved:', response.data);

      setList((prevList) => [...prevList, formData]);
      setFormData({
        enquirerType: '',
        enquirerName: '',
        enquirerMobile: '',
        enquirerWhatsapp: '',
        productEnquired: '',
        studentsClass: '',
        studentsBoard: '',
      });

      alert('Details Submitted successfully');

      setShowContent(true);

      setTimeout(() => {
        setShowContent(false);
      }, 5000);

    } catch (error) {
      console.error('Error saving form data:', error);
      alert('Failed to submit form data. Please try again.');
    }

  }


  const date = new Date().toLocaleDateString()
  const enquirerType = [
    'Student',
    'Father',
    'Mother',
    'Guardian'
    // Add more options as needed
  ];

  const products = ['Tution Center'];
  const classes = ['VI', 'VII', 'VIII', 'IX', 'X'];
  const boards = ['BSEAP', 'BSETG', 'CBSE'];

  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <fieldset className={styles.fieldSet}>
          <legend>
            <h2>New Enquiry</h2>
          </legend>
          <div className={styles.dateNo} >
            <span>Enquiry No:<b>{list.length + 1}</b></span>
            <span>Enquiry Date:<b>{date} </b></span>
          </div>
          <div className={styles.textFields} >

            <div className={styles.left} >
              <TextField
                select
                required
                className={styles.field}
                label={
                  formData.ecenquirerType ? (
                    <span style={{ color: 'red' }}>Enquirer Type</span>
                  ) : (
                    "Enquirer Type"
                  )
                }
                variant="standard"
                name="enquirerType"
                onChange={handleChange}
                value={formData.enquirerType}
              >
                {enquirerType.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>


              <TextField required className={styles.field}
                label={
                  formData.ecenquirerName ? (
                    <span style={{ color: 'red' }}>Enquirer Name</span>
                  ) : (
                    "Enquirer Name"
                  )
                }
                variant="standard"
                placeholder='Enter the Full Name'
                name="enquirerName"
                onChange={handleChange}
                value={formData.enquirerName}
              />

              <TextField required className={styles.field}
                label={
                  formData.ecenquirerMobile ? (
                    <span style={{ color: 'red' }}>Enquirer Mobile</span>
                  ) : (
                    "Enquirer Mobile"
                  )
                }
                variant="standard"
                name="enquirerMobile"
                placeholder='Enter the 10 digits Mobile Number'
                onChange={handleChange}
                value={formData.enquirerMobile}
                // InputProps={{ // Here we're adding the icon within the input field
                //   endAdornment: (
                //     <OfflinePinIcon sx={{ color: offlinePinColorMobile }} />
                //   ),
                // }}

                InputProps={{
                  endAdornment: formData.enquirerMobile && offlinePinColorMobile ? offlinePinColorMobile == 'red' ? <Tooltip title="Enter the valid mobile number"> <ErrorIcon sx={{ color: offlinePinColorMobile }} /> </Tooltip> : (<OfflinePinIcon sx={{ color: offlinePinColorMobile }} />) : null,
                }}

                inputProps={{
                  maxLength: 10, // Maximum length allowed
                }}


              />
              {/* <OfflinePinIcon sx={{ color: 'green' }} /> */}

              <TextField required className={styles.field}
                label={
                  formData.ecenquirerWhatsapp ? (
                    <span style={{ color: 'red' }}>Enquirer Whatsapp</span>
                  ) : (
                    "Enquirer Whatsapp"
                  )
                }
                variant="standard"
                name="enquirerWhatsapp"
                placeholder='Enter the 10 digits Mobile Number'
                onChange={handleChange}
                value={formData.enquirerWhatsapp}

                // InputProps={{ // Here we're adding the icon within the input field
                //   endAdornment: (
                //     <OfflinePinIcon sx={{ color: offlinePinColorWhatsapp }} />
                //   ),
                // }}

                InputProps={{
                  endAdornment: formData.enquirerWhatsapp && offlinePinColorWhatsapp ? offlinePinColorWhatsapp == 'red' ? <Tooltip title="Enter the valid mobile number"> <ErrorIcon sx={{ color: offlinePinColorWhatsapp }} /></Tooltip> : (<OfflinePinIcon sx={{ color: offlinePinColorWhatsapp }} />) : null,
                }}
                inputProps={{
                  maxLength: 10,
                }}

              />

            </div>



            <div className={styles.right} >
              <TextField
                select
                required
                className={styles.field}
                label={
                  formData.ecproductEnquired ? (
                    <span style={{ color: 'red' }}>Product Enquired</span>
                  ) : (
                    "Product Enquired"
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
                    <span style={{ color: 'red' }}>Student's Class</span>
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
                    <span style={{ color: 'red' }}>Student's Board</span>
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
                  Select the Board in which the student studying in
                </MenuItem>
                {boards.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

            </div>

          </div>

          {showContent && (


            <span style={{ color: 'green' }} >Details Successfully Submitted</span>

          )}

          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit} variant="outlined"  >
              SUBMIT
            </Button>
          </div>

        </fieldset>
      </form>
    </div>
  );
};

export default RegistrationForm;



