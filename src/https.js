import { useState, useEffect } from "react";
export function getPlacesData (){
    const[availablePlaces, setAvailablePlaces] = useState([]);
    useEffect(() =>
        {
          fetch('http://localhost:3000/places')
          .then((response) => { return response.json()})
          .then((resData) => {  
           console.log(resData)
          setAvailablePlaces(resData.places);
          });
        },
        []);
        return availablePlaces;
    }
    export async function updatePlaces(userPlaces) {
        const response= await fetch('http://localhost:3000/user-places', {
          method: "PUT",
          body:JSON.stringify({places: userPlaces}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) {
          console.log("Failed");
        }
        return data.message;
      } 
