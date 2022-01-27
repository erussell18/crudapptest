import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Style.css'

function CrudApp() {

    const addToList = () => { /* Uses the POST method to send the Data to the backend */
        Axios.post('http://localhost:3003/insert', {
            foodName: foodName, 
            days: days,
        });
    };

    const deleteFood = (id) => { /* Uses the DELETE method to send the Data that needs to be deleted to the backend */
        Axios.delete(`http://localhost:3003/delete/${id}`)
    };

    const updateFood = (id) => { /* Uses the PUT method to send the Data to the backend then change the values of the items in their state */
        Axios.put('http://localhost:3003/update', {
            id: id,
            newFoodName: newFoodName,
        }).then(() => {
            setfoodList(foodList.map((val) => {
                return val._id === id ? {_id: id, foodName: val.newFoodName} : val
            }))
        })
    };

    const [foodName, setFoodName] = useState('') /* State for the Food name*/
    const [days, setDays] = useState(0) /* State For Days */
    const [foodList, setfoodList] = useState([]) /* State For Whole Fodd List */
    const [newFoodName, setNewFoodName] = useState('') /* State For New Food Names */
    
    useEffect(() => { /* This hook is called when the page refreshes, the empty array means this is called once*/
        Axios.get('http://localhost:3003/read').then((response) => {
            setfoodList(response.data)
        })
    }, [])

    return(
        <div>
            <h1>Crud App With Mern</h1>

            <input type="text" placeholder='Food Name' onChange={(event) => {setFoodName(event.target.value)}} />
            <input type='number' placeholder='Times Eaten' onChange={(event) => {setDays(event.target.value)}} />

            <button onClick={addToList}>Add To List</button>
            <hr></hr>

            {foodList.map((val,key) => { /* Displays all the food in the DB onto the page */
                return <div id="foodlist" key={key}>
                    <h1>{val.foodName}</h1> 
                    <h1>{val.daysSinceIAte}</h1>

                    <input type="text" placeholder='New Food Name' onChange={(event) => {setNewFoodName(event.target.value)}} />
                    <button onClick={() => updateFood(val._id)}>Update</button>
                    <button onClick={() => deleteFood(val._id)}>Delete</button>
                </div>
            })}
        </div>
    )
}
/* Use the map function to grab the value of the array and the index that it is in */
export default CrudApp;