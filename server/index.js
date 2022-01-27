/* Initialize express server */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
const cors = require('cors');
const { where, $where } = require('./models/Food');

app.use(express.json()); /* Get front end information in json format */
app.use(cors()); /*Communicates with selfmade API */

mongoose.connect( /* Connects to the Mongo Database */
    'mongodb+srv://newuser:h6Endlaay3ycWsGi@crud.e4cku.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.get('/read', async (req,res) => { /* This Route reads data from the data base */
    FoodModel.find({}, (err,result) => { /* Finds the data in the database*/
        if (err){
            res.send(err);
        }

        res.send(result);

    })
})

app.delete('/delete/:id', async (req,res) => { /* Deletes the item based on their id number which we got from the front end*/
    const id = req.params.id;
    
    await FoodModel.findByIdAndRemove(id).exec();
    res.send('Deleted');
});

app.put('/update', async (req,res) => { /* Finds the id of the item in the DB then updates and saves it */
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
       await FoodModel.findById(id, (err,updatedFood) => {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send('update');
        });
    }

    catch (err) {
        console.log(err);
    }
});

app.post("/insert", async (req,res) => { /* When someone uses this route it post something to the data base */
    
    const foodName = req.body.foodName; /* request the foodName from the front end  */
    const days = req.body.days;  /* request the days from the front end  */
    
    const food = new FoodModel({ /* puts the front end data into the FoodModel object */
        foodName: foodName,
        daysSinceIAte: days
    });

    try{ /* Try to save the information into the database*/
        await food.save();
        res.send("inserted data");
    } 
    
    catch(err) { /* Catch any errors and write it in the console */
        console.log(err);
    }

});

/* Backend listens on port 3001 */
app.listen(3003, () =>{
    console.log('Server running on port 3001...');
});