import { useState } from 'react'

import axios from 'axios';
import PropTypes from 'prop-types';



const EditProfile = ({ user, setUser }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("id", user._id)
    formData.append('pfp', file);
    console.log(formData);
    try {
      const response = await axios.post("http://localhost:3000/users/update-pfp", formData, { headers: { "Content-Type": "multipart/form-data", }, withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }


  return (
    <div>
      <form action='http://localhost:3000/users/update-profile' method="POST" encType='multipart/form-data' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="pfp">Profile Picture</label>
        <input type="file" name='pfp' id='pfp' onChange={(e) => setFile(e.target.files[0])} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditProfile

EditProfile.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
}