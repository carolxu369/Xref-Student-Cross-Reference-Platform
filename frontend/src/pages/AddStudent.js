import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent';

function AddStudent() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gmail, setGmail] = useState("")
  const [is_duke, setIs_duke] = useState(false)
  const [netid, setNetid] = useState("")
  const [unique_id, setUnique_id] = useState("")
  const [comments, setComments] = useState("")
  
  const navigate = useNavigate();

  const AddPersonInfo = async () => {
    let formField = new FormData()

    formField.append('name', name)
    formField.append('email', email)
    formField.append('gmail', gmail)
    formField.append('is_duke', is_duke)
    formField.append('netid', netid)
    formField.append('unique_id', unique_id)
    formField.append('comments', comments)

    await axios({
      method: 'post',
      url: '/api/person/',
      data: formField
    }).then((response) => {
      console.log(response.data);
      navigate('/person')
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
    <HeaderComponent />
        <div className = "container">
            <br /><br/>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3 mb-5">
                      <br></br>
                      <h4> Add Student </h4>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> Name</label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter name'
                                        name = "name"
                                        className = "form-control addform"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> Emai</label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter email'
                                        name = "email"
                                        className = "form-control addform"
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> Gmail</label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter gmail'
                                        name = "gmail"
                                        className = "form-control addform"
                                        value = {gmail}
                                        onChange = {(e) => setGmail(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> NetID</label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter netID'
                                        name = "netid"
                                        className = "form-control addform"
                                        value = {netid}
                                        onChange = {(e) => setNetid(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> Unique Id </label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter Unique ID'
                                        name = "unique_id"
                                        className = "form-control addform"
                                        value = {unique_id}
                                        onChange = {(e) => setUnique_id(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> Comments </label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter comments'
                                        name = "comments"
                                        className = "form-control addform"
                                        value = {comments}
                                        onChange = {(e) => setComments(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group1 mb-2">
                                    <label className = "form-label"> Is Duke </label>
                                    <input 
                                      type="checkbox" 
                                      name="is_duke" 
                                      value={is_duke} 
                                      onChange={(e) => setIs_duke(!is_duke)}
                                    >
                                    </input>
                                </div>

                                {/* <button type="submit" className="btn btn-primary"> Save </button> */}
                                <button type="button" className = "btn-action" onClick={(e) => AddPersonInfo(e)}> Submit </button>
                                <Link to = "/person" className = " button-cancel"> Cancel </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddStudent;