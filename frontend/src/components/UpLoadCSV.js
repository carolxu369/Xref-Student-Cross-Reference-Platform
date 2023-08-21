import React, { useState, useRef } from 'react';
import axios from 'axios';
import SelectCSVName from './SelectCSVName.js';
import HeaderComponent from '../components/HeaderComponent';
import { Alert } from 'antd';
import { useNavigate } from "react-router-dom";


function handleUpload(selectedFile, columnMappings, courseName, overwriteConfirmation, setOverwriteConfirmation, setError, navigate) {
  console.log("selectedFile:", selectedFile);
  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile);

    for (const key in columnMappings) {
      formData.append(key, columnMappings[key]);
    }

    formData.append("courseName", courseName);
    formData.append('overwriteConfirmation', overwriteConfirmation);

    try {
      axios.post("/api/upload_csv/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log("File uploaded successfully!");
          const { duplicate, people_use_api, new_people, old_people, source, is_existing } = response.data;
          if (duplicate && duplicate === true) {
            console.log("handle overwrite");
            handleOverwriteConfirmation(selectedFile, columnMappings, courseName, overwriteConfirmation, setOverwriteConfirmation, setError, navigate);
            return;  // fix navigation bug
          }

          console.log('In uploadcsv: ', people_use_api);
          navigate("/person/csv-upload-success", { state: { people_use_api: people_use_api, new_people: new_people, old_people: old_people, source: source, is_existing: is_existing } });
        })
        .catch((error) => {
          const { field, error_msg, index, error_data } = error.response.data;
          console.error("File upload failed:", error.response);
          navigate("/person/csv-upload-failure", { state: { field: field, error_msg: error_msg, index: index, error_data: error_data } });
        });
    } catch (error) {
      // TODO: change later
      console.error("File upload failed:", error);
    }
  } else {
    console.log("No file selected.");
    setError('Please choose a CSV file to upload.');
  }
}

function handleOverwriteConfirmation(selectedFile, columnMappings, courseName, overwriteConfirmation, setOverwriteConfirmation, setError, navigate) {
  const confirmed = window.confirm('The csvfile already exists. Do you want to overwrite it?');
  if (confirmed) {
    setOverwriteConfirmation(true);
    handleUpload(selectedFile, columnMappings, courseName, true, setOverwriteConfirmation, setError, navigate);
  }
}

function CSVButton({ selectedFile, attributeData, courseName, overwriteConfirmation, setOverwriteConfirmation, setError, navigate }) {
  return (
    <div className="container mb-5">
      <button className=" up-csv-button" onClick={() => handleUpload(selectedFile, attributeData, courseName, overwriteConfirmation, setOverwriteConfirmation, setError, navigate)}>
        upload csv
      </button>
    </div>
  );
}

const UpLoadCSV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [attributeData, setAttributeData] = useState({
    name: "",
    email: "",
    gmail: "",
    netid: "",
    unique_id: "",
    grade: "",
  });

  const [courseName, setCourseName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [overwriteConfirmation, setOverwriteConfirmation] = useState(false);
  const [error, setError] = useState('')
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const attrDisplayMap = {
    name: 'Name',
    email: 'Email',
    gmail: 'Gmail',
    netid: 'NetID',
    unique_id: 'Duke Unique ID',
    grade: 'Course Grade',
  }

  function handleFileUpload(event) {
    setError('');
    const file = event.target.files[0];
    if (file) {
      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
      if (fileExtension !== 'csv') {
        setError('Please select a CSV file.');
        setSelectedFile(null);
        setFileContent(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        setFileContent(content);
        const fileName = file.name.split('.')[0];
        setCourseName(fileName);
      };
      reader.readAsText(file);
    }
    else if (fileContent) {
      setSelectedFile(null);
      setFileContent(null);
    }
  }

  const handleColumnMappingChange = (attribute, column) => {
    setAttributeData((prevData) => ({
      ...prevData,
      [attribute]: column,
    }));
  };

  const handleCourseNameChange = (selected) => {
    console.log(selected);
    setCourseName(selected);
  };

  const RuleInfo = () => {
    const dialogDom = document.querySelector('.rules-dialog')
    const closeDom = document.querySelector('.dialog-close')
    dialogDom.style.display = 'block'
    closeDom.onclick = function () {
      dialogDom.style.display = 'none'
    }
  }


  const RuleDisplay = () => {
    return (
      <>
        <div>
          <div className="ruled">
            <br></br>
            <h4 className="text-center"> Rules for Upload</h4>
            <h6>Upload csv to automatically save people's info</h6>
            <br></br>
            <div>
              <h6>1. Upload a CSV file</h6>
            </div>
            <div>
              <h6>2. Match csv columns with attributes</h6>
            </div>
            <div>
              <h6>3. Click upload button to see the results</h6>
            </div>
            <br></br>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <HeaderComponent />
      <div className="container">
        <div className="rule-container">
          <div>
            {RuleDisplay()}
          </div>
          {/* <div className = "container"> */}
          <div className="CSV-page">
            <h2 className="text-center"> Upload your CSV file here</h2>
            <br></br>
            <div className="App">
              <div className="card-body">
                <input className="form-control" ref={fileInputRef} type="file" accept="text/csv" onChange={handleFileUpload} />
                <br></br>

                {fileContent && (
                  <div>
                    {/* <h3>Column Mapping:</h3> */}
                    <div>
                      <div>
                        <span className="csvrow">Course Name:</span>
                      </div>

                      <SelectCSVName onChange={handleCourseNameChange} />
                    </div>
                    <br></br>

                    <div className="csv-table-container">
                      <table
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th className='csvtitle'>Attribute</th>
                            <th className='csvtitle'>CSV Column</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(attributeData).map((attribute) => (
                            <tr key={attribute}>
                              <td className="csvrow">{attrDisplayMap[attribute]}</td>
                              <td className="csvrow">
                                <select
                                  value={attributeData[attribute] || ''}
                                  className='csvrow'
                                  onChange={(e) => handleColumnMappingChange(attribute, e.target.value)}
                                >
                                  <option value="">Ignore</option>
                                  {fileContent.split('\n')[0].split(',').map((column, index) => (
                                    <option key={index} value={column}>
                                      {column}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert message={error} banner />
                )}

                <br></br>
                <CSVButton selectedFile={selectedFile} attributeData={attributeData} courseName={courseName} overwriteConfirmation={overwriteConfirmation} setOverwriteConfirmation={setOverwriteConfirmation} setError={setError} navigate={navigate} />
              </div>
            </div>
          </div>
          {/* {RuleDisplay()} */}
        </div>
        {/* {RuleDisplay()} */}
      </div>
    </>
  )
}

export default UpLoadCSV