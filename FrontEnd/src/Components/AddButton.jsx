import React from 'react'
import { Link } from 'react-router-dom';
import Plus from "../Assets/Plus.png";
const AddButton = () => {
  return (
    <div>
       <Link to="/notes/new" className="floating-button">
       <img src={Plus} style={{ color: "orange" ,cursor:"pointer"}} onClick={''} height="50px" alt="fireSpot" />
        </Link>
    </div>
  )
}

export default AddButton
