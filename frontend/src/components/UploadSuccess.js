import React from 'react';
import { Button, Result, Table, Alert } from 'antd';
import { useLocation } from 'react-router-dom';

const UploadSuccess = () => {
    const location = useLocation();
    const { new_people, old_people, source, is_existing } = location.state;
    console.log(new_people);

    const generateRender = (oldValue, existingValue, newValue, sourceValue) => {
        if (existingValue === 'update') {
            return (
                <>
                    <del>{oldValue}</del>{' '}
                    <span style={{ color: 'green' }}>
                        {newValue} ({sourceValue})
                    </span>
                </>
            );
        } else if (existingValue === 'new') {
            return (
                <span style={{ color: 'green' }}>
                    {newValue} ({sourceValue})
                </span>
            );
        }
        else {
            return (
                <>
                    {oldValue}
                </>
            )
        }
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => generateRender(old_people[index].name, is_existing[index].name, new_people[index].name, source[index].name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record, index) => generateRender(old_people[index].email, is_existing[index].email, new_people[index].email, source[index].email),
        },
        {
            title: 'Gmail',
            dataIndex: 'gmail',
            key: 'gmail',
            render: (text, record, index) => generateRender(old_people[index].gmail, is_existing[index].gmail, new_people[index].gmail, source[index].gmail),
        },
        {
            title: 'NetID',
            dataIndex: 'netid',
            key: 'netid',
            render: (text, record, index) => generateRender(old_people[index].netid, is_existing[index].netid, new_people[index].netid, source[index].netid),
        },
        {
            title: 'Unique ID',
            dataIndex: 'unique_id',
            key: 'unique_id',
            render: (text, record, index) => generateRender(old_people[index].unique_id, is_existing[index].unique_id, new_people[index].unique_id, source[index].unique_id),
        },
    ]

    // console.log('In uploadsuccess: ', new_people.length);

    return (
        <Result
            status="success"
            title="Successfully Uploaded csv file!"
            subTitle="Go back to the people list to see the latest results."
            extra={[
                <Button type="primary" href='/person'>
                    Go People List
                </Button>,
                <Button href='/person/csv'>Upload Again</Button>,
            ]}
        >
            {new_people.length !== 0 &&
                <div>
                    <Alert
                        message="Some information in the CSV file has been updated based on the Duke API "
                        description="Review the modified data below."
                        type="info"
                        showIcon
                    />
                    <Table columns={columns} dataSource={new_people} />
                </div>
            }
        </Result>
    )
};
export default UploadSuccess;