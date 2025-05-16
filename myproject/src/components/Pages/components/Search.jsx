import React from 'react'
import { FaSearch } from "react-icons/fa";
const Search = ({courses}) => {
  return (
    <>
    {courses.length>10 ?
        <div className='search my-3 box-shadow'>
          <input type="text" onChange={(e)=>handleSearch(e)}  placeholder='Search'/>
         <FaSearch />
        </div>
        :""
        }
    </>
  )
}

export default Search
