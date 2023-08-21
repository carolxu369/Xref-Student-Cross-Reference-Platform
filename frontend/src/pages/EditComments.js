import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditComments() {

  const [comments, setComments] = useState("")
  
  const navigate = useNavigate();

  const UpdateComments = async () => {
    let formField = new FormData()

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

  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  }

  return (
        <div className = "container">
            <br /><br/>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3 mb-5">
                      <br></br>
                      <h4> Edit Comments </h4>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Comments </label>
                                    <input 
                                        type = "text"
                                        placeholder = 'Enter comments'
                                        name = "comments"
                                        className = "form-control"
                                        value = {comments}
                                        onChange = {(e) => setComments(e.target.value)}
                                    />
                                <button type="button" className = "btn btn-success" onClick={(e) => UpdateComments(e)}> Save </button>
                                <button type = "submit" className = "btn btn-danger"> Cancel </button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditComments;