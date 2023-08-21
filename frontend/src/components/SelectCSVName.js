import React, { useState, useEffect } from 'react';
import { Select } from 'antd'
import axios from 'axios';


const SelectCSVName = ({ onChange }) => {
    const [selectedOption, setSelectedOption] = useState(undefined);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchCsvFiles();
    }, []);

    const fetchCsvFiles = async () => {
        try {
            const response = await axios.get('/api/list_csv/');
            const formattedOptions = response.data.map(csvFile => ({
                value: csvFile.csv_title,
                label: csvFile.csv_title
            }));
            setOptions(formattedOptions);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching CSV files:', error);
        }
    }

    const handleChange = selected => {
        if (selected) {
            setSelectedOption(selected);
            onChange(selected);
            console.log("selected in selectcsvname:", selected);
        }
        else {
            setSelectedOption('');
            onChange('');
            console.log("selected in selectcsvname:", selected);
        }
    };

    const handleSearch = selected => {
        handleChange(selected);
        console.log("selected in handleSearch", selected);
        console.log("selectedOption in handleSearch", selectedOption);
    }

    const handleBlur = () => {
        console.log("selectedOption in handleBlur", selectedOption);
        if (selectedOption) {
            handleChange(selectedOption);
        }
    }

    return (
        <div>
            <Select
                allowClear
                showSearch
                showArrow
                placeholder="Enter name/choose one to overwrite"
                onChange={handleChange}
                onBlur={handleBlur}
                onSearch={handleSearch}
                value={selectedOption}
                style={{ width: 300 }}
                options={options}
            />
        </div>
    );
};

export default SelectCSVName;