import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/Profile.css'
import UserProfile from './UserProfile' // Import UserProfile component
import { useSelector } from 'react-redux'

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
    userId: '',
    username: '',
    email: '',
  })

  const [editing, setEditing] = useState(false)
  const [newUserData, setNewUserData] = useState({})
  const [petProfiles, setPetProfiles] = useState([])
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(7);

  const userContext = useSelector(state => state.auth.user); //<= uncomment
  console.log('user', userContext);

  // fetch species data
    useEffect(() => {
        axios.get('http://localhost:3000/api/species')
        .then(response => {
            setSpecies(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch species:', error);
        })
    }, [])

  // fetch breedsList data
  const fetchBreeds = (speciesId) => {
    axios.get(`http://localhost:3000/api/breeds?speciesId=${speciesId}`)
        .then(response => {
            setBreeds(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch breeds:', error);
        });
    };

    useEffect(() => {
        if (selectedSpecies) {
            fetchBreeds(selectedSpecies);
        }
    }, [selectedSpecies]);  
  
  const handleSpeciesChange = (event) => {
    const newSpeciesId = event.target.value;
    setSelectedSpecies(newSpeciesId);
    setPet({ ...pet, species_id: newSpeciesId, breed_id: '' }); 
    fetchBreeds(newSpeciesId); 
  }

  // pet creating profile // in the /profile
  useEffect(() => {
    const fetchPetProfiles = async () => {
        // setUser(userContext.userId)
      try {
        // POST method for creating the new pet profile
        // replace with your API endpoint
        const response = await axios.post(`http://localhost:3000/pet/${userContext.userId}`) // <= change!!!
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
        setUser({
            userId: 1,
            username: "demo",
            email: "demo@test.com",
          })

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
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPet(prevPet => ({
        ...prevPet,
        [name]: value
        }));
    };
  

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

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent the default form submission behavior
    
        const userId = userContext.userId; // Ensure you have the userId
        if (!userId) {
            console.error("No user ID available");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', pet.name);
        formData.append('color', pet.color);
        formData.append('size', pet.size);
        formData.append('species_id', pet.species_id);
        formData.append('breed_id', pet.breed_id);
        formData.append('gender', pet.gender);
        formData.append('neutering', pet.neutering);
        formData.append('medical_records', pet.medical_records);
        formData.append('description', pet.description);
        if (picture) {
            formData.append('picture', picture);
        }
    
        console.log('FormData values: -->',formData, Array.from(formData.entries()));
        try {
          // const response = await axios.post(`http://localhost:3000/pet/${userId}`, formData);

          const response = await axios.post(`http://localhost:3000/pet/${userId}`, {
            'name': pet.name,
            'color': pet.color,
            'size': pet.size,
            'species_id': pet.species_id,
            'breed_id': pet.breed_id,
            'gender': pet.gender,
            'neutering': pet.neutering,
            'medical_records': pet.medical_records,
            'description': pet.description,
          });
           
            console.log('Pet profile created:', response.data);
            // fetchPetProfiles(); // Refresh pet profiles after creation
            // onUpdateProfiles(); // Notify parent component about the update
        } catch (error) {
            console.error('Error creating pet profile:', error);
        }
    };

  return (
    <div className="profile-container">
      <div className="pet-profile-container">
        <form className="form" onSubmit={handleSubmit}>
        <h2 className="pet-profile-header">Let's Create Your Pet Profile</h2>
        {preview && (
            <div className="image-preview">
              <img src={preview} alt="Image Preview" />
            </div>
          )}
          <div className="input-container">
            <div className="input-item">
              <label for="name">Pet Name: </label>
              <input
                type="text"
                name="name"
                value={pet.name}
                placeholder="Pet Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-item">
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                name="color"
                value={pet.color}
                onChange={handleInputChange}
                placeholder="Color"
              />
            </div>
            <div className="input-item">
              <label htmlFor="size">Size:</label>
              <input
              type="text"
              name="size"
              value={pet.size}
              placeholder="Size"
              onChange={handleInputChange}
              />
            </div>
            <div className="input-item">
              <label htmlFor="species_id">Species:</label>
              <select name="species_id" value={selectedSpecies} onChange={handleSpeciesChange} className="dropdown-content">
                  {
                      species.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                      ))
                  }
              </select>
            </div>
            <div className="input-item">
              <label htmlFor="breed_id">Breed:</label>
              <select
                name="breed_id"
                value={pet.breed_id}
                onChange={handleInputChange}  
                className="dropdown-content"
              >
                <option value="">Select Breed</option>
                {breeds.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="input-item">
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                value={pet.gender}
                onChange={handleInputChange}
                className="dropdown-content"
              >
                <option value="">Select Gender</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>
            <div className="input-item" id="checkbox">
                <label htmlFor="neutering">Neutered:</label>
                <input
                  type="checkbox"
                  name="neutering"
                  checked={pet.neutering}
                  onChange={(e) =>
                    setPet({ ...pet, neutering: e.target.checked })
                  }
                />
            </div>
            <div className="input-item">
              <label htmlFor="medical_records">Medical Records:</label>
              <input
                name="medical_records"
                value={pet.medical_records}
                onChange={handleInputChange}
                placeholder="Medical Records"
              />
            </div>
            <div className="input-item">
              <label htmlFor="description">Description:</label>
              <input
                name="description"
                value={pet.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
            </div>
            <div className="input-item">
              <label for="photo">Upload Photo Here</label>
              <input
                type="file"
                name="photo"
                onChange={handleImageChange}
                onClick={(e) => console.log('Input clicked')}
              />
            </div>
          </div>
          

          <button className="btn-profile" type="submit">
            Create Profile
          </button>
          {/* <button className="edit-btn" type="button">
            Edit
          </button>
          <button className="delete-btn" type="button">
            Delete
          </button> */}
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
