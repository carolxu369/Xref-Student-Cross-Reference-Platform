import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';

const CsvFileList = () => {
    const [csvFiles, setCsvFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCsvFiles();
    }, []);

    const fetchCsvFiles = async () => {
        try {
            const response = await axios.get('api/list_csv/');
            setCsvFiles(response.data);
        } catch (error) {
            console.error('Error fetching CSV files:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/list_csv/', {
                params: { search: searchTerm },
            });
            setCsvFiles(response.data);
        } catch (error) {
            console.error('Error searching CSV files:', error);
        }
    };

    const handleDelete = async (csvFileId) => {
        try {
            await axios.delete(`/api/list_csv/${csvFileId}/`);
            fetchCsvFiles(); // Refresh the CSV file list after deletion
        } catch (error) {
            console.error('Error deleting CSV file:', error);
        }
    };

    return (
        <>
        <HeaderComponent />
        <div className="container">
            <div className="container mt-2 mb-2">
                <h4> Search csv here</h4>
                <input
                    type="text"
                    value={searchTerm}
                    placeholder = "Search by file name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="button-search " onClick={handleSearch}>Search</button>
                <button type="submit" className = "button-cancel" > Clear </button>
            </div>
            <div className="card-body">
                <table
                  width="100%"
                  border={1}
                  cellPadding={2}
                  cellSpacing={1}
                  // style={tableStyle}
                  className="table table-hover"
                  > 
                  <thead>
                      <tr>
                      <th>File name</th>
                      <th>Rename</th>
                      <th>Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                  {csvFiles.map((csvFile) => (
                          <tr key={csvFile.id}>
                          <td className='table-td'> {csvFile.csv_title} </td>
                          <td className='table-td'>  
                            <button className = "btn-action" onClick={() => handleDelete(csvFile.id)}> Rename </button>
                            {/*TODO renamefunction*/ }
                          </td>
                          <td className='table-td'>
                            <button className = "btn-action" onClick={() => handleDelete(csvFile.id)}> Delete </button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
        </>
    );

};

export default CsvFileList;