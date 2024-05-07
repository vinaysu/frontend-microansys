import React, { useEffect, useState } from 'react'
import List from './atom'
import { useRecoilState } from 'recoil'
import styles from './ExistedEnquiry.module.css'
import axios from 'axios'

function ExistedEnquiry() {

  // const [existedList, setExistedList] = useRecoilState(List)
  const [existedList, setExistedList] = useState([]);

  useEffect(() => {
    // Fetch existing enquiries from the server when the component mounts
    const fetchExistedEnquiries = async () => {
      try {
        const response = await axios.get('https://backend-microansys.onrender.com/api/list'); // Assuming your backend API endpoint is '/api/list'
        setExistedList(response.data);
      } catch (error) {
        console.error('Error fetching existing enquiries:', error);
      }
    };

    fetchExistedEnquiries(); // Call the fetchExistedEnquiries function when the component mounts
  }, []);


  return (
    <div className={styles.main} >
      <div className={styles.content} >
        {
          existedList.length !== 0 ?
            <div className={styles.enquiryList} >
              <table>
                <thead>

                  <th>S.No</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Mobile</th>
                  <th>Class</th>
                  <th>Board</th>

                </thead>


                {
                  existedList.map((ele, index) =>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{ele.enquirerName}</td>
                      <td>{ele.enquirerType}</td>
                      <td>{ele.enquirerMobile}</td>
                      <td>{ele.studentsClass}</td>
                      <td>{ele.studentsBoard}</td>
                    </tr>
                  )
                }
              </table>
            </div>
            : <center><h2>No enquiries yet Please Enquire Now </h2></center>
        }
      </div>
    </div>
  )
}

export default ExistedEnquiry
