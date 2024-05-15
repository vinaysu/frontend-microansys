import React, { useEffect, useState } from "react";
import List from "./atom";
import { useRecoilState } from "recoil";
import styles from "./ExistedEnquiry.module.css";
import axios from "axios";
import * as XLSX from "xlsx";

function ExistedEnquiry() {
  const [existedList, setExistedList] = useState([]);

  useEffect(() => {
    fetchExistedEnquiries();
  }, []);

  const fetchExistedEnquiries = async () => {
    try {
      const response = await axios.get(
        "https://backend-microansys.onrender.com/api/list"
      );
      setExistedList(response.data);
    } catch (error) {
      console.error("Error fetching existing enquiries:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(existedList);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "enquiries.xlsx");
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {existedList.length !== 0 ? (
          <div className={styles.enquiryList}>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Enquirer Name</th>
                  <th>Enquirer Relation</th>
                  <th>Student Name</th>
                  <th>Mobile Number</th>
                  <th>Class</th>
                  <th>Education Board</th>
                  <th>Enquiry Source</th>
                </tr>
              </thead>
              <tbody>
                {existedList.map((ele, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(ele.enquiredDate)}</td>
                    <td>{ele.enquirerName}</td>
                    <td>{ele.enquirerType}</td>
                    <td>{ele.studentName}</td>
                    <td>{ele.enquirerMobile}</td>
                    <td>{ele.studentsClass}</td>
                    <td>{ele.studentsBoard}</td>
                    <td>{ele.enquirySource}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={downloadExcel}>Download</button>
          </div>
        ) : (
          <center>
            <h2>No enquiries yet. Please Enquire Now.</h2>
          </center>
        )}
      </div>
    </div>
  );
}

export default ExistedEnquiry;

