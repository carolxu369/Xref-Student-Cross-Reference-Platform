import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = ({ placeholderText }) => {
  const [keyword, setKeyword] = useState("")
  const [people, setPeople] = useState([])

  const navigate = useNavigate();

  const SearchPersonInfo = () => {
    let formField = new FormData()
    console.log("in s");
    console.log(keyword);
    formField.append('keyword', keyword)
    axios.get('/api/search/?keyword=' + keyword).then((response) => {
      setPeople(response.data)
      console.log("get response");
      console.log(response.data);
      navigate('/person/search/')
    }).catch(error => {
      console.log(error)
    })
  }

  const inputStyle = {
    fontSize: '20px', // Adjust the text size here
  };

  return (
    // <form action="/" method="get">
    <div className = 'container'>
      <h3> Search people here</h3>
      <form>
        <label htmlFor="header-search"></label>
        <input
          type="text"
          id="header-search"
          placeholder = "Search by name"
          name="keyword"
          style={inputStyle} // Apply the inline styles
          onChange = {(e) => setKeyword(e.target.value)}
        />
        <button type="button" className="button-search" onClick={(e) => SearchPersonInfo(e)}> Search </button>
        <Link to = "/person" className = "btn btn-danger"> Cancel </Link>
      </form>

      <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <h4> People List </h4>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gmail</th>
                  <th>Is_duke</th>
                  <th>NetID</th>
                  <th>Unique ID</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {people.map(person => 
                    <tr key={person.id}>
                      <td>{person.name}</td>
                      <td>{person.email}</td>
                      <td>{person.gmail}</td>
                      <td>{String(person.is_duke)}</td>
                      <td>{person.netid}</td>
                      <td>{person.unique_id}</td>
                      <td>{person.comments}</td>
                      <td>
                        <Link to="/" className="btn btn-success">Edit</Link>
                      </td>
                      <td>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Search;

