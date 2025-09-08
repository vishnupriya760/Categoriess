import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Datasform.css';

const Datasform = () => {
  let navigate=useNavigate()
  
  let[value,setValue]=useState(
    {
      categoryId:0,
      category:'',
      description:'',
      createdBy:1
  }
  )
  let[edit,setEdit]=useState(false)
let location =useLocation()

let editcategories=location.state?.user

useEffect(()=>{
if(editcategories){
  setEdit(true)
  // console.log(categorylist);
  setValue(editcategories)
  
}
},[])

  function getdetails(e){
    setValue({...value,[e.target.name]:e.target.value})
    console.log(value); 
  }
  function togetdetails(e){
    e.preventDefault()
    console.log(value);





    axios.post('http://208.109.34.247:8012/Category/InsertCategory',value)
.then(res=>console.log(res))

   navigate('/Getalltab')
  }
  return (
    <div className="datasform-container">
      <div className="datasform-card">
        <div className="datasform-title">{edit ? 'Edit Category' : 'Add New Category'}</div>
        <form className="datasform-form" onSubmit={togetdetails}>
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={value.category} onChange={getdetails} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={value.description} onChange={getdetails} required />
          </div>
          <button className="datasform-btn" type="submit">{edit ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  )}
export default Datasform

