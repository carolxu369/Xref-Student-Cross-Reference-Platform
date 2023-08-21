import React from "react";

const EditableRow = ({editFormData, handleEditFormChange}) => {
  return (
    <tr>
      <td>
      <input 
          type="text" 
          required="required" 
          placeholder="Enter the is_duke" 
          name="id_duke"
          value={editFormData.is_duke}
          onChange={handleEditFormChange}
          ></input>
        </td>
        <td>
        <input 
          type="text" 
          required="required" 
          placeholder="Enter the name" 
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input 
          type="email" 
          required="required" 
          placeholder="Enter the email" 
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input 
          type="email" 
          required="required" 
          placeholder="Enter the gmail" 
          name="gmail"
          value={editFormData.gmail}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input 
          type="text" 
          required="required" 
          placeholder="Enter the netid" 
          name="netid"
          value={editFormData.netid}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input 
          type="text" 
          required="required" 
          placeholder="Enter the unique id" 
          name="uniqueid"
          value={editFormData.unique_id}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td>
        <input 
          type="text" 
          required="required" 
          placeholder="Enter the comments" 
          name="comments"
          value={editFormData.comments}
          onChange={handleEditFormChange}
          ></input>
      </td>
      <td className='table-td'>
        <button type="submit" className="btn-action2">
          Save
        </button>
      </td>
    </tr>
  )
}

export default EditableRow;