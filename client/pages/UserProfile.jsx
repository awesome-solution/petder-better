import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const UserProfile = ({
  // user,
  editing,
  newUserData,
  handleUserInputChange,
  handleEdit,
  handleCancelEdit,
  handleSave,
}) => {
  // took handleDelete out

  // 1. take user out from the props
  // 2. .uncoment this line
  const user = useSelector(state => state.auth.user); //<= uncomment
  console.log('user', user);

  // Initialize states with user's existing data if available
  const [profilePic, setProfilePic] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(user ? user.profilePicture : '')

  //3. uncomment this code block
  if (!user) {
      return <div>No user data available. Please log in or sign up.</div>;
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProfilePic(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {editing ? (
        <div className="edit-mode">
          <input
            type="text"
            name="username"
            value={newUserData.username}
            onChange={handleUserInputChange}
          />
          <input
            type="email"
            name="email"
            value={newUserData.email}
            onChange={handleUserInputChange}
          />
          <input
            type="file"
            className="user-pic-input"
            onChange={handleImageChange}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Profile Preview"
              style={{ width: '100px', height: '100px' }}
            />
          )}
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div className="show-user">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="User Profile"
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            <input
              type="file"
              className="user-pic-pro"
              onChange={handleImageChange}
            />
          )}
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  )
}
// took this one out <button onClick={handleDelete}>Delete</button>

export default UserProfile
