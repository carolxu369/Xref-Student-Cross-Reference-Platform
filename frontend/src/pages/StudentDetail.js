import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentDetail() {

  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get("/api/person/" + id + "/detail").then((response) => {
      setDetail(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  var studentGrade = "";
  studentGrade = detail?.map(detail => {
    return (
      <tr >
        <td className='table-td'>{detail.people.name}</td>
        <td className='table-td'>{detail.course_name.csv_title}</td>
        <td className='table-td'>{detail.letter_grade}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <br></br>       
            <br></br>
            <h4>Student Detail</h4>          
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentGrade}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail;