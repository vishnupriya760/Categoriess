import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import './Getalltab.css';

const Getalltab = () => {
    let[user,setUser]=useState()
     let navigate=useNavigate();
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

    function getValue(){
        axios("http://208.109.34.247:8012/Category/GetAllCategories")
        .then(res=>{
            console.log(res.data);
            setUser(res.data.categoryList)
            // console.log(user);     
        }
        )
       
    }
 useEffect(()=>{
            getValue()
        },[])

   let col=[
  {
    name:'Category ID',
    selector:row=>row.categoryId
  },{
    name:'Category',
    selector:row=>row.category
  },{
    name:'Description',
    selector:row=>row.description
  },{
    name:'Created By',
    selector:row=>row.createdBy
  },{
    name:'Remove Category',
    selector:row=><button style={{background:'#e61818b6',color:'#fff'}} onClick={()=>deleteUser(row.categoryId)}>Delete</button>
  },{
    name:'Update Employee',
    selector:row=><button style={{background:'#1897e6b6',color:'#fff'}} onClick={()=>Edituser(row)}>Edit</button>
  }
    ]
      function deleteUser(id){
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this category!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(`http://208.109.34.247:8012/Category/RemoveCategory`, { categoryId: id })
              .then(() => {
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
                getValue();
              })
              .catch(() => {
                Swal.fire('Error!', 'Failed to delete category.', 'error');
              });
          }
        });
      }
    function Edituser (user){
      navigate('/Datasform',{state:{user}})
            // axios.post(`http://catodotest.elevadosoftwares.com/Category/InsertCategory`)
            // Swal.fire('Edited!', 'User edited successfully', 'success');
           }

  return (
    <div className="getalltab-container">
      <div className="getalltab-header" style={{color:'#800080'}}>Category List</div>
      <div className="getalltab-table">
        <DataTable 
          columns={col}
          data={user}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default Getalltab