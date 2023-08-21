import React from 'react';
import { isMobile } from "../utilis"

const ReadOnlyRow = ({ data, handleEditClick, PeopleInfo }) => {
  let IM = isMobile()
  if (IM) {
    return (
      <tr key={data.id}>
        <td>{data.is_duke === true ? <>✅</> : <></>}</td>
        <td className='table-td' onClick={(e) => PeopleInfo(e, data)}>
          {data.name}
        </td>
        <td className='table-td'>{data.email}</td>
        <td className='table-td'>{data.netid}</td>
        <td className='table-td'>
        </td>
      </tr>
    );
  }
  else {
    return (
      <tr key={data.id}>
        <td className='table-td'>{data.is_duke === true ? <>✅</> : <></>}</td>
        <td className='table-td1'><a href={"https://xref.colab.duke.edu/person/detail/" + data.id}>{data.name}</a></td>
        <td className='table-td1'>{data.email}</td>
        <td className='table-td1'>{data.gmail}</td>
        <td className='table-td'>{data.netid}</td>
        <td className='table-td'>{data.unique_id}</td>
        <td className='table-td1'>{data.comments}</td>
        <td className='table-td'>
          <button type="button" className='btn-action' onClick={(event) => handleEditClick(event, data)}>
            Edit
          </button>
        </td>
      </tr>
    );
  };
};

export default ReadOnlyRow;