import { Link } from 'react-router-dom'
import Search from './components/Search';
import Stable from './components/Stable';

import React from 'react'

const ListPeople = () => {
  return (
    <div>
        <header className="App-header">
            <h3 className='header-container'>
            Upload csv file or add an student manually.
            </h3>

            <div className='container'>
            <div className='search-container'>
                <Search placeholderText="Search by Student"/>
                <Search placeholderText="Search by Course"/>
            </div>

            <div className='add-container'>
                <CSVButton />
                <AddStudent />
            </div>
            </div>
            <Stable data = {data}/>
        </header>
    </div>
  )
}

export default ListPeople
