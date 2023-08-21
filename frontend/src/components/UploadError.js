import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Paragraph, Text } = Typography;

const UploadError = () => {
    const location = useLocation();
    const { field, error_msg, index, error_data } = location.state;

    return (
        <Result
            status="error"
            title="Upload Failed"
            subTitle="Please check and modify the following information before reuploading."
            extra={[
                <Button type="primary" href='/person'>
                    Go People List
                </Button>,
                <Button href='/person/csv'>Upload Again</Button>,
            ]}
        >
            <div style={{ textAlign: 'left' }}>
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        The csv file you uploaded has the following error:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined style={{ color: 'red', verticalAlign: 'middle'}} /> Line {index + 1} : [{field} : {error_data}] : {error_msg}
                </Paragraph>
            </div>
        </Result>
    )
};

export default UploadError;