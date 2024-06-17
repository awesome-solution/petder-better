import React, { Component } from "react";
import "./favList.css";
import FavListItems from "./favListItems";
// import test1 from '../../../public/test1.png';
// import test2 from '../../../public/test2.png';
// import test3 from '../../../public/test3.png';
// import test4 from '../../../public/test4.png';
// import test5 from '../../../public/test5.png';
// import test6 from '../../../public/test6.png';
// import test7 from '../../../public/test7.png';
// import test8 from '../../../public/test8.png';
// import test9 from '../../../public/test9.png';
// import test10 from '../../../public/test10.png';


const FavList = ({favPets}) => {
    // const allChatUsers = [
    //     {
    //     image: test1,
    //     id: 1,
    //     name: "Tim",
    //     species:"dog",
    //     active: true
    //     },
    //     {
    //     image: test2,
    //     id: 2,
    //     name: "Ayub",
    //     species: "dog",
    //     active: true
    //     },
    //     {
    //     image: test3,
    //     id: 3,
    //     name: "Hamaad",
    //     species: "dog",
    //     active: true
    //     },
    //     {
    //     image: test4,
    //     id: 4,
    //     name: "Eleni",
    //     species: "dog",
    //     active: true
    //     },
    //     {
    //     image: test5,
    //     id: 5,
    //     name: "Elsa",
    //     species: "cat",
    //     active: true
    //     },
    //     {
    //     image: test6,
    //     id: 6,
    //     name: "Kayley",
    //     species: "cat",
    //     active: true
    //     },
    //     {
    //     image: test7,
    //     id: 7,
    //     name: "Hasan",
    //     species: "rabbit",
    //     active: true
    //     },
    //     {
    //     image: test8,
    //     id: 8,
    //     name: "Autumn",
    //     species: "rabbit",
    //     active: true
    //     },
    //     {
    //     image: test9,
    //     id: 9,
    //     name: "Allen",
    //     species: "rabbit",
    //     active: true
    //     },
    //     {
    //     image: test10,
    //     id: 10,
    //     name: "Manpreet",
    //     species: "rabbit",
    //     active: true
    //     },
    // ];

  
    return (
      <div className="main__chatlist">
        <div className="chatlist__heading">
          <h2>Favorite List</h2>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i class="gg-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {favPets.map((item, index) => {
            return (
              <FavListItems
                name={item.name} 
                species={item.species}
                animationDelay={index + 1}
                image={item.pet.picture}
              />
            );
          })}
        </div>
      </div>
    );
}

export default FavList;