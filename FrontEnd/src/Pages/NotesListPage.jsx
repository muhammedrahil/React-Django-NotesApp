import React, { useEffect, useState } from 'react'
// import axios from "../Utils/Axios";
import axios from 'axios'
import ListItem from '../Components/ListItem'
import AddButton from '../Components/AddButton'


const NotesListPage = () => {
  const [notes, Setnotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])



  const getNotes = async () => {
    let responce = await axios.get('api/notes/').then((res) => {
      if (res.status === 200) {
        Setnotes(res.data);
        console.log(res.data);
      }
    })
  }

  return (
    <div className='notes'>
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note}  />
        ))}
        <AddButton/>
      </div>
    </div>
  )
}

export default NotesListPage
