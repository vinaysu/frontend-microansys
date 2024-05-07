import React from 'react'
import List from './atom'
import { useRecoilState } from 'recoil'
import styles from './ExistedEnquiry.module.css'

function ExistedEnquiry() {

  const [existedList, setExistedList] = useRecoilState(List)


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
