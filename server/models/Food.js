const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({ /* Schema contains the columns of the table */
    foodName: {
        type: String,
        required: true,
    },
    daysSinceIAte: {
        type: Number,
        required: true,
    },
});

const Food = mongoose.model('Food', FoodSchema) /* Created model for the Schema*/

module.exports = Food /* Exports it */