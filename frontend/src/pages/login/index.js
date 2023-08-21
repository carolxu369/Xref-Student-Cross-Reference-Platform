import './index.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cookie from 'react-cookies'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Login() {

  const [currentUser, setCurrentUser] = useState();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const username = 'tylerbletsch';

  // useEffect(() => {
  //   client.get("/api/user/")
  //   .then(function(res) {
  //     setCurrentUser(true);
  //   })
  //   .catch(function(error) {
  //     setCurrentUser(false);
  //   });
  // }, []);

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "http://127.0.0.1:8000/api/login/",
      {
        username: username,
        password: password
      }
    ).then(function(res) {
      console.log("res!!!!!!",res)
      // cookie.save(key,value,{path:"/"})
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout/",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    navigate('/person')
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Authentication for Xref</Navbar.Brand>
        <Navbar.Toggle />
        {/* <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
    {
        <div className="c1">
            <h3>Login Page</h3>
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="textlogin">Admin</Form.Label>
              {/* <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="btn-action1" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        </div>
    }
    </div>
  );
}

export default Login;
// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// import LoginCss from './index.module.scss'

// const onFinish = (values) => {
//   console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };
// const Login = () => (
//     <div className={LoginCss["login"]}>
//         <Form
//             name="basic"
//             labelCol={{
//             span: 8,
//             }}
//             wrapperCol={{
//             span: 16,
//             }}
//             style={{
//             maxWidth: 600,
//             }}
//             initialValues={{
//             remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//         >
//             <Form.Item
//             label="Username"
//             name="username"
//             rules={[
//                 {
//                 required: true,
//                 message: 'Please input your username!',
//                 },
//             ]}
//             >
//             <Input />
//             </Form.Item>

//             <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//                 {
//                 required: true,
//                 message: 'Please input your password!',
//                 },
//             ]}
//             >
//             <Input.Password />
//             </Form.Item>

//             <Form.Item
//             name="remember"
//             valuePropName="checked"
//             wrapperCol={{
//                 offset: 8,
//                 span: 16,
//             }}
//             >
//             <Checkbox>Remember me</Checkbox>
//             </Form.Item>

//             <Form.Item
//             wrapperCol={{
//                 offset: 8,
//                 span: 16,
//             }}
//             >
//             <Button type="primary" htmlType="submit">
//                 Submit
//             </Button>
//             </Form.Item>
//         </Form>
//     </div>
// );
// export default Login;