# Petder Better
> A dating web application for pet lovers to connect and find companionship for their pets.

---

## Description

Petder Better is a web application designed to help pet owners find suitable companions for their pets. Whether you're looking for playmates, friends, or potential mates for your pets, this web app provides a platform to connect and interact with other pet owners in your area.

---

## Features

- **User Authentication:** Sign up and log in securely to manage your pet profiles.
- **Pet Profiles:** Create detailed profiles for your pets, including photos, descriptions, and preferences.
- **Matching Algorithm:** Utilize an algorithm to suggest potential matches based on pet compatibility.
- **Favorites:** Save your favorite pet profiles for easy access and interaction.
- **Search and Filters:** Easily search for pets based on location, breed, age, and more.
- **Responsive Design:** Ensures usability on desktop and other devices.

---

## Technologies Used

- **Frontend:**
  - React
  - CSS
- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
- **Authentication:**
  - JSON Web Tokens (JWT)
  - bcrypt (for password hashing)

---

## Router Design

Authentication Routes
Login User - POST /api/login handled by authController.getUser
Signup User - POST /api/signup handled by authController.createUser

General API Routes
Get All Breeds - GET /api/breeds handled by apiController.getBreedsList
Get All Species - GET /api/species handled by apiController.getSpeciesList
Get Potential Pets - GET /api/potential-pets handled by apiController.getPotentialPets

User-Specific Routes
Get User Profile - GET /user/:user_id handled by userProfileController.getUserProfile
Update User Profile - PATCH /user/:user_id handled by userProfileController.updateUserProfile
Upload User Picture - POST /user/:user_id/picture handled by userProfileController.uploadUserPicture
Update User Picture - PATCH /user/:user_id/picture handled by userProfileController.updateUserPicture
Delete User Picture - DELETE /user/:user_id/picture handled by userProfileController.deleteUserPicture

Pet-Specific Routes
Get Pet Profile - GET /pet/:user_id handled by petProfileController.getPetProfile
Add Pet Profile - POST /pet/:user_id handled by petProfileController.addPetProfile
Update Pet Profile - PATCH /pet/:user_id handled by petProfileController.updatePetProfile
Delete Pet Profile - DELETE /pet/:user_id handled by petProfileController.deletePetProfile
Upload Pet Picture - POST /pet/:user_id/pets/:pet_id/picture handled by petProfileController.uploadPetPicture
Update Pet Picture - PATCH /pet/:user_id/pets/:pet_id/picture handled by petProfileController.updatePetPicture
Delete Pet Picture - DELETE /pet/:user_id/pets/:pet_id/picture handled by petProfileController.deletePetPicture

Favorites and Dislikes Management
Favorite a Pet - POST /favorite handled by favController.favoritePet
Dislike a Pet - POST /dislike handled by favController.dislikePet
Get Favorite Pets - GET /favorite handled by favController.getFavoritePets
Get Disliked Pets - GET /dislike handled by favController.getDislikedPets
Delete Favorite Pet - DELETE /favorite handled by favController.deleteFavoritePet
Delete Disliked Pet - DELETE /dislike handled by favController.deleteDislikedPet

---

## Database Schema

-- Users table 
CREATE TABLE Users ( id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, contact VARCHAR(255), email VARCHAR(255) UNIQUE NOT NULL, location VARCHAR(255), profile_picture VARCHAR(255), description TEXT, password VARCHAR(255) NOT NULL ); 

-- Pets table 
CREATE TABLE Pets ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, color VARCHAR(255), size VARCHAR(50), species_id INT REFERENCES Species(id), breed_id INT REFERENCES Breeds(id), gender VARCHAR(10), neutering BOOLEAN, medical_records TEXT, picture VARCHAR(255), description TEXT ); 

-- UserPets table 
CREATE TABLE UserPets ( user_id INT REFERENCES Users(id), pet_id INT REFERENCES Pets(id), PRIMARY KEY (user_id, pet_id) ); 

-- FavoritePets table 
CREATE TABLE FavoritePets ( user_id INT REFERENCES Users(id), pet_id INT REFERENCES Pets(id), PRIMARY KEY (user_id, pet_id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); 

-- DislikedPets table 
CREATE TABLE DislikedPets ( user_id INT REFERENCES Users(id), pet_id INT REFERENCES Pets(id), PRIMARY KEY (user_id, pet_id), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); 

-- Messages table 
CREATE TABLE Messages ( id SERIAL PRIMARY KEY, content TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, from_user_id INT REFERENCES Users(id), to_user_id INT REFERENCES Users(id) ); 

-- PetPictures table 
CREATE TABLE PetPictures ( id SERIAL PRIMARY KEY, pet_id INT REFERENCES Pets(id), picture VARCHAR(255) NOT NULL ); 

-- Species table 
CREATE TABLE Species ( id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL ); 

-- Breeds table 
CREATE TABLE Breeds ( id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, species_id INT);