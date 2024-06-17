import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/DatingMode.css'

const DatingMode = () => {
  // state to handle the petProfile // req to endpoint of pet's
  // data is an array of obj
  const [petProfiles, setPetProfiles] = useState([])
  // state to handle the prev and next profile // start at index 0
  const [currentIndex, setCurrentIndex] = useState(0)
  // state of in loading
  const [loading, setLoading] = useState(false)
  // handel error
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch pet profiles from the API
    const fetchPets = async () => {
      setLoading(true)
      try {
        //uncomment these 2 line!!
        //const response = await axios.get('http://localhost:3000/api/potential-pets'); // Make sure the endpoint is correct
        // setPetProfiles(response.data);
        setPetProfiles([
          {
            owner: null,
            name: 'Apple',
            color: 'Brown',
            size: 'medium',
            gender: 'Girl',
            neutering: false,
            medical_records: 'vacinated',
            picture:
              'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-09/golden%20retriever.jpg?h=41f179ac&itok=LxcGCtq0',
            description: 'Cute cute cute',
            breed: 'Golden Retriever',
            species: 'Dog',
          },
          {
            owner: null,
            name: 'Banana',
            color: 'Black',
            size: 'Big',
            gender: 'Boy',
            neutering: true,
            medical_records: 'None',
            picture:
              'https://www.lafayettevethospital.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=m6gaaVZs',
            description: 'lovely',
            breed: 'Labrador',
            species: 'Dog',
          },
        ])
        // error still null
        setError(null)
      } catch (error) {
        console.error('Error fetching pet profiles:', error)
        // if error occur // setError
        setError('Failed to fetch pet profiles.')
      }
      setLoading(false)
    }

    fetchPets()
  }, [])

  // function handle next profile in coming
  const handleNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % petProfiles.length)
  }

  const handlePreviousProfile = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + petProfiles.length) % petProfiles.length
    )
  }

  // like function
  const handleLike = async () => {
    // POST to /like then fav page req
    try {
      // current user
      const userId = 'currentUser_Id'
      // current pet rendering
      const petId = petProfiles[currentIndex].id
      // sending to endpoint of api/fav by obj key-value pairs to add or POST into
      const response = await axios.post('/api/favorite', {
        userID: userId,
        petID: petId,
      })

      console.log('Favorite added: -->', response.data)
      // then call the next profile in the petProfile array of obj
      handleNextProfile()
    } catch (error) {
      console.error('Error adding favorite:', error)
    }
  }

  //unlike
  // if user cliked unlike button
  // first not suppose to show that pet profile again
  // and move to the next profile()
  const handleUnlike = async () => {
    try {
      // request to api/unlike endpoint
      const response = await axios.post('/api/unlike', {
        petId: petProfiles[currentIndex].id,
      })
      console.log('Unliked:', response.data)
      handleNextProfile()
    } catch (error) {
      console.error('Error unliking profile:', error)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    // if nothing available in the meantime
    // render 'no pet available'
    <div className="dating-container">
      <h2>
        Click <span style={{ color: '#4396A3' }}>Like</span> To Chat With Me?
      </h2>
      {petProfiles.length > 0 ? (
        <>
          <div className="pet-card">
            <div className="pet-profile">
              <img
                src={petProfiles[currentIndex].picture}
                alt={petProfiles[currentIndex].name}
                style={{
                  maxWidth: '300px',
                  height: '300px',
                  borderRadius: '10px',
                }}
              />
              <h3>{petProfiles[currentIndex].name}</h3>
              {/* <p>Name: {petProfiles[currentIndex].name}</p> */}
              <p>Age: {petProfiles[currentIndex].age}</p>
              <p>Color: {petProfiles[currentIndex].color}</p>
              <p>Weight: {petProfiles[currentIndex].size}</p>
              <p>Species: {petProfiles[currentIndex].species}</p>
              <p>Breeds: {petProfiles[currentIndex].breed}</p>
              <p>Gender: {petProfiles[currentIndex].gender}</p>
              <p>Location: {petProfiles[currentIndex].location}</p>
              <p>
                Neutered: {petProfiles[currentIndex].neutering ? 'Yes' : 'No'}
              </p>
              <p>
                Medical Records: {petProfiles[currentIndex].medical_records}
              </p>
              <p>Description: {petProfiles[currentIndex].description}</p>
            </div>
            <div className="profile-buttons">
              <button onClick={handleLike} className="like-btn">
                Like
              </button>
              <button onClick={handleUnlike} className="unlike-btn">
                Unlike
              </button>
            </div>
          </div>
          <div className="navigation-buttons">
            <button
              className="prev"
              onClick={handlePreviousProfile}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className="next"
              onClick={handleNextProfile}
              disabled={currentIndex === petProfiles.length - 1}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Sorry, no any pet profiles available...</p>
      )}
    </div>
  )
}

export default DatingMode
