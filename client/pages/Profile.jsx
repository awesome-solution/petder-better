import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/Profile.css'
import UserProfile from './UserProfile' // Import UserProfile component

const Profile = ({ onUpdateProfiles }) => {
  const [pet, setPet] = useState({
    name: '',
    age: '',
    color: '',
    size: '',
    species_id: '',
    breed_id: '',
    gender: '',
    neutering: false,
    medical_records: '',
    picture: '',
    description: '',
  })

  // picture handling state (set them to null)
  const [picture, setPicture] = useState(null)
  const [preview, setPreview] = useState(null)
  // user's handeling // set the value to an empty string first // then update with /api
  // use axios? to get data from the backend database
  const [user, setUser] = useState({
    // show only username and email (for now)  // password? change the password?
    username: '',
    email: '',
  })

  const [editing, setEditing] = useState(false)
  const [newUserData, setNewUserData] = useState({})
  const [petProfiles, setPetProfiles] = useState([])

  // pet creating profile // in the /profile
  useEffect(() => {
    const fetchPetProfiles = async () => {
      try {
        // POST method for creating the new pet profile
        // replace with your API endpoint
        const response = await axios.post('http://localhost:3000/pet/') // <= change!!!
        setPetProfiles(response.data) // if not an array of nested obj => setPetProfiles([response.data]);
      } catch (error) {
        console.error('Error fetching pet profiles:', error)
      }
    }

    fetchPetProfiles()
  }, [])

  // user will be get method because user already signedup in the home page
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // replace the endpoint here to get user after signing up!!!
        // GET method
        const response = await axios.get(
          'http://localhost:3000/api/user/user:id',
          {
            // headers // json
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        )
        setUser(response.data) // call setUser

        // handle error
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchUserData()
  }, [])

  // handle editing data function for User
  const handleEdit = () => {
    // if any changed // set the value to true
    setEditing(true)
    // update the user data state
    setNewUserData({ ...user })
  }
  // handle cancel button if user doesn't want to edit anymore
  const handleCancelEdit = () => {
    //  const [editing, setEditing] = useState(false)
    setEditing(false)
    // {}
    setNewUserData({})
  }
  // handle save button after editing the data
  const handleSave = () => {
    // call setUser and passin the new data
    setUser({ ...newUserData })
    setEditing(false)
  }

  // handle user's input incoming change..
  const handleUserInputChange = (event) => {
    // pass in event // use event.target
    const { name, value } = event.target
    // then call setNewUserData // const [newUserData, setNewUserData] = useState({})
    setNewUserData((prev) => ({ ...prev, [name]: value }))
  }
  // handle pet's input incoming data from all input element <input />
  const handleInputChange = (e) => {
    // pass in event // use event.target
    const { name, value } = e.target
    //  const [pet, setPet] = useState({})
    setPet({ ...pet, [name]: value })
  }

  // choose file // use type='file'
  // picture's function
  const handleImageChange = (e) => {
    console.log('Files selected:', e.target.files)

    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      console.log('Selected file:', file.name)
      setPicture(file)

      // Create and set the preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Ensure cleanup of the URL when component unmounts or file changes
      return () => URL.revokeObjectURL(previewUrl)
    }
  }

  useEffect(() => {
    // Cleanup function to revoke the URL when the component unmounts or the file changes
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview]) // make sure that the cleanup runs when `preview` changes

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('image', picture)
    Object.keys(pet).forEach((key) => formData.append(key, pet[key]))

    try {
      const response = await axios.post('/api/petProfile/create', formData)
      console.log('Pet profile created:', response.data)
      // not sure about these two?
      fetchPetProfiles() // Refresh pet profiles after creation
      onUpdateProfiles() // Notify parent component about the update
    } catch (error) {
      console.error('Error creating pet profile:', error)
    }
  }

  return (
    <div className="profile-container">
      <div className="pet-profile-container">
        <h2 className="pet-profile-header">Let's Create Your Pet Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleImageChange}
            onClick={(e) => console.log('Input clicked')}
          />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Image Preview" />
            </div>
          )}
          <div className="input-container">
            <input
              type="text"
              name="name"
              value={pet.name}
              placeholder="Pet Name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="age"
              value={pet.age}
              placeholder="Age"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="color"
              value={pet.color}
              onChange={handleInputChange}
              placeholder="Color"
            />
            <input
              type="text"
              name="size"
              value={pet.size}
              onChange={handleInputChange}
              placeholder="Weight"
            />
            <select
              name="species_id"
              value={pet.species_id}
              onChange={handleInputChange}
              className="dropdown-content"
            >
              <option value="">Select Species</option>
              <option value="1">Dog</option>
              <option value="2">Cat</option>
              <option value="3">Rabbit</option>
              <option value="4">Snake</option>
              <option value="5">Bird</option>
            </select>

            <input
              type="text"
              name="breed_id"
              value={pet.breed_id}
              placeholder="Breed"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              value={pet.location}
              placeholder="Location"
              onChange={handleInputChange}
            />
            <select
              name="gender"
              value={pet.gender}
              onChange={handleInputChange}
              className="dropdown-content"
            >
              <option value="">Gender</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>

            <label>
              Neutered:
              <input
                type="checkbox"
                name="neutering"
                checked={pet.neutering}
                onChange={(e) =>
                  setPet({ ...pet, neutering: e.target.checked })
                }
              />
            </label>

            <input
              name="medical_records"
              value={pet.medical_records}
              onChange={handleInputChange}
              placeholder="Medical Records"
            />

            <input
              name="description"
              value={pet.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </div>

          <button className="btn-profile" type="submit">
            Create/Update Profile
          </button>
          <button className="edit-btn" type="button">
            Edit
          </button>
          <button className="delete-btn" type="button">
            Delete
          </button>
        </form>
      </div>

      <div className="user-profile-container">
        <UserProfile
          user={user}
          editing={editing}
          newUserData={newUserData}
          handleUserInputChange={handleUserInputChange}
          handleEdit={handleEdit}
          handleCancelEdit={handleCancelEdit}
          handleSave={handleSave}
        />
      </div>
    </div>
  )
  // handleDelete={handleDelete}
}

export default Profile
