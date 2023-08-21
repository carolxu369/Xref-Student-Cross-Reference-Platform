import { Routes, Route } from 'react-router-dom';
import AddStudent from '../pages/AddStudent.js';
import UpLoadCSV from '../components/UpLoadCSV.js';
import PersonSearch from '../pages/PersonSearch.js';
import CsvFileList from '../components/ListCSV.js';
import Login from '../pages/login/index.js'
import UploadError from '../components/UploadError.js';
import UploadSuccess from '../components/UploadSuccess.js';
// import Login from "../pages/login/Login.js"
import StudentDetail from '../pages/StudentDetail.js';


function MyRouter() {

  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<PersonSearch />} />
      <Route path="/person" element={<PersonSearch />} />
      <Route path="/person/add" element={<AddStudent />} />
      <Route path="/person/csv" element={<UpLoadCSV />} />
      <Route path="/csv" element={<CsvFileList />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/person/comments" element={<EditComments />} /> */}
      {/* <Route path="/person/comments/:id" element={<Edit />} /> */}
      <Route path="/person/csv-upload-failure" element={<UploadError />} />
      <Route path="/person/csv-upload-success" element={<UploadSuccess />} />
      <Route path="/person/detail/:id" element={<StudentDetail />} />
    </Routes>
  )
}

export default MyRouter;