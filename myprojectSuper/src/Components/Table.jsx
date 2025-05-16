import React from 'react'


const Table = ({users}) => {
  return (
    <table className="table">
        <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Courses</th>
            </tr>
        </thead>
  <tbody>
    
        {users.map((item,index)=><tr key={index}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
           {item.courses!=null ?  <td>{item.courses.map((ele,index)=><span key={index}>{ele}{item.courses.length>index+1 ? ",":""} </span>)}</td>:''}
        </tr>
        )}
      
  </tbody>
</table>
  )
}

export default Table
