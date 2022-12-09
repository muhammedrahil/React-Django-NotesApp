import axios from "../Utils/Axios";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeft from "../Assets/Arrow-Left.png";
import Swal from "sweetalert2";
import { NotificationManager } from 'react-notifications';



const NotePage = () => {
  let { noteid } = useParams();
  let navigate = useNavigate();
  let [note, Setnote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteid])

  const getNote = async () => {
    const response = await axios.get(`api/notes/${noteid}/`).then((res) => {
      if (res.status === 200) {
        Setnote(res.data);
        // console.log(res.data.body);
      }
    })
  }

  const getUpdateNote = async () => {
    const responce = await axios.put(`api/notes/${noteid}/`, note).then((res) => {
      if (res.status === 201) {
        // console.log(res.data);
        NotificationManager.success('Deleted');
        navigate("/")
      }
    })
  }

  const getDeleteNote = async () => {
    const responce = await axios.delete(`api/notes/${noteid}/`).then((res) => {
      if (res.status === 200) {
        // NotificationManager.success('Deleted');
        // console.log(res.data);
        navigate("/")
      }
    })
  }

  const getCreateNote = async () =>{
    const responce = await axios.post(`api/notes/`, note).then((res) => {
      if (res.status === 201) {
        console.log(res.data);
        navigate("/")
      }
    })       
  }

  let handleSubmit = () => {
    console.log(note)
    if (noteid === 'new' && note.body != null ){
      getCreateNote();
    }else if (noteid != 'new' && note.body != null){
      getUpdateNote();
    }else if (noteid != 'new' && note.body === null){
      getDeleteNote();
    }
  }

  let handledelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Deleted",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        getDeleteNote();
      }
    })
    
  }

  let handleCreate = () => {
    getCreateNote();
  }

  let handleChange = (value) => {
    Setnote(note => ({ ...note, 'body': value }))
  }

  return (
    <div className="note">
      <div className="note-header">
          <img src={ArrowLeft} style={{ color: "orange" ,cursor:"pointer"}} onClick={handleSubmit} height="30px" alt="fireSpot" />
          {noteid != 'new' ? (<button onClick = {handledelete}>Delete</button>) : (<button onClick={handleCreate}>Done</button>)}
      </div>
      <textarea onChange={(e) => { handleChange(e.target.value) }} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage
