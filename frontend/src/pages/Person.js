import { Link } from 'react-router-dom';
import useFetch from "../components/useFetch.js";

function Person() {
  const { data, loading, error } = useFetch("/api/person")
  if (loading) return <h1>LOADING...</h1>;
  if (error) console.log(error);

  var personDetails = "";
  personDetails = data?.map(data => {
    return (
      <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.gmail}</td>
        <td>{String(data.is_duke)}</td>
        <td>{data.netid}</td>
        <td>{data.unique_id}</td>
        <td>{data.comments}</td>
        <td>
          <Link to="/" className="btn btn-success">Edit</Link>
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <br></br>       
            <br></br>
            <h4>People List
              <Link to="/person/add" className="btn btn-primary float-end"> Add Student </Link>
              <Link to="/person/csv" className="btn btn-primary float-end"> Upload CSV </Link>
            </h4>
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
                {personDetails}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Person;