import React, { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReadOnlyRow from "../components/ReadOnlyRow.js";
import EditableRow from "../components/EditableRow.js";
import { isMobile } from "../utilis"
import HeaderComponent from '../components/HeaderComponent';

function PersonSearch() {
  const [keyword, setKeyword] = useState("");
  const [change, setChange] = useState(0);
  const [people, setPeople] = useState([]);
  const [editDataId, setEditDataId] = useState(null);
  const [data, setData] = useState();
  // const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailInfo, setDetailInfo] = useState({
    name: "",
    email: "",
    gmail: "",
    is_duke: "",
    netid: "",
    unique_id: "",
    comments: "",
  });
  const [post, setPost] = useState({
    name: "",
    email: "",
    gmail: "",
    is_duke: "",
    netid: "",
    unique_id: "",
    comments: "",
  });

  let IM = isMobile()
  console.log("!!!!!!!!!", IM)

  const navigate = useNavigate();

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    gmail: "",
    is_duke: "",
    netid: "",
    unique_id: "",
    comments: "",
  })

  useEffect(() => {
    setLoading(true);
    axios.get("/api/person").then((response) => {
      setData(response.data);
      console.log(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  if (loading) return <h1>LOADING...</h1>;
  if (error) console.log(error);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

    setPost({ ...post, [event.target.name]: event.target.value })
  }

  const editedData = {
    id: editDataId,
    name: editFormData.name,
    email: editFormData.email,
    gmail: editFormData.gmail,
    is_duke: editFormData.is_duke,
    netid: editFormData.netid,
    unique_id: editFormData.unique_id,
    comments: editFormData.comments,
  }

  const handleEditClick = (event, data) => {
    event.preventDefault();
    setEditDataId(data.id);

    const formValues = {
      name: data.name,
      email: data.email,
      gmail: data.gmail,
      is_duke: String(data.is_duke),
      netid: data.netid,
      unique_id: data.unique_id,
      comments: data.comments,
    }

    setEditFormData(formValues);
  }

  const SearchPersonInfo = () => {
    let formField = new FormData()
    console.log("in s");
    console.log(keyword);
    formField.append('keyword', keyword)
    axios.get('/api/search/?keyword=' + keyword).then((response) => {
      setPeople(response.data)
      setChange(1)
      console.log("get response");
      console.log(response.data);
      navigate('/person/')
    }).catch(error => {
      console.log(error)
    })
  }

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    axios({
      method: "put",
      url: "/api/person/" + editedData.id + "/",
      data: editedData
    }).then((response) => {
      console.log(response.data);
    }).catch(error => {
      console.log(error)
    })

    const newData = [...data];

    const index = data.findIndex((data) => data.id === editDataId);

    newData[index] = editedData;

    setData(newData);
    setEditDataId(null);

  }

  const inputStyleBar = {
    fontSize: '1rem', // Adjust the text size here
  };

  function dataList(list) {
    return list?.map(data => {
      return (
        <Fragment key={data.id}>
          {editDataId === data.id ? (
            <EditableRow
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
            />
          ) : (
            <ReadOnlyRow
              data={data}
              handleEditClick={handleEditClick}
              PeopleInfo={PeopleInfo}
            />
          )}
        </Fragment>
      )
    });
  }

  /////////////
  const PeopleInfo = (event, data) => {
    const dialogDom = document.querySelector('.rules-dialog1')
    const closeDom = document.querySelector('.dialog-close')
    dialogDom.style.display = 'block'
    closeDom.onclick = function () {
      dialogDom.style.display = 'none'
    }
    setDetailInfo(data)
  }

  const displayInfo = (data) => {
    return (
      <>
        <div className="rules-dialog1">
          <div className="dialog-content1">
            <br></br>
            <h4>{data.name}'s Info</h4>
            <br></br>
            <div className="mobile-container">
              <h5>Is_Duke: {data.is_duke === true ? <>✅</> : <></>}</h5>
              <h5>Email: {data.email}</h5>
              <h5>Gmail: {data.gmail}</h5>
              <h5>NetID: {data.netid}</h5>
              <h5>Unique ID: {data.unique_id}</h5>
              <h5>Comments: {data.comments}</h5>
            </div>
            <div className="dialog-close">
              <button className="button-cancel">close</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  /////////////
  const content = () => {
    if (change) {
      return dataList(people)
    } else {
      return dataList(data)
    }
  }
  const title = () => {
    if (IM) {
      return (
        <tr>
          <th>Is_Duke</th>
          <th>Name</th>
          <th>Email</th>
          <th>NetID</th>
          {/* <th>Edit</th> */}
        </tr>
      );
    }
    else {
      return (
        <tr>
          <th>Is_Duke</th>
          <th className='table-td1'>Name</th>
          <th className='table-td1'>Email</th>
          <th className='table-td1'>Gmail</th>
          <th>NetID</th>
          <th>Unique ID</th>
          {/* <th>Facts</th> */}
          <th className='table-td1'>Comments</th>
          <th>Edit</th>
        </tr>
      );
    }
  }

  return (
    <>
      <HeaderComponent />
      <div className="container">
        <div className="search-container">
          <h4> Search people here</h4>
          <form>
            <label htmlFor="header-search"></label>
            <input
              type="text"
              id="header-search"
              placeholder="Search by keywords"
              name="keyword"
              style={inputStyleBar} // Apply the inline styles
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="button" className="button-search" onClick={(e) => SearchPersonInfo(e)}> Search </button>
            <button type="submit" className="button-cancel" > Clear </button>
          </form>
        </div>

        <div className="table-container">
          <div className="row">
            <div className="col-md-12">
              <div className="card-header mb-2" >
                <h4>People List</h4>
                <h6>{IM === true ? <>Edit info by rotating your phone</> : <></>}</h6>
                <div>
                  <h4>
                    <div className="addAndCSV-container">
                      <Link to="/person/csv" className=" btn-action1 addcsv"> Upload CSV </Link>
                      <Link to="/person/add" className=" btn-action1 addcsv"> Add Student </Link>
                    </div>
                  </h4>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleEditFormSubmit}>
                  <table
                    width="100%"
                    border={1}
                    cellPadding={2}
                    cellSpacing={1}
                    // style={tableStyle}
                    className="table table-striped "
                  >
                    <thead>
                      {title()}
                    </thead>
                    <tbody>
                      {content()}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
        {displayInfo(detailInfo)}
      </div>
    </>
  )
}

export default PersonSearch;