const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true,
        enum: ["veg", "non-veg"]
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    additionalNotes: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["packaged", "unpackaged"],
        default: "packaged"
    },
    deliverystatus: {
        type: String,
        enum: ["delivered", "not delivered"],
        default: "not delivered"
    },
    latitude:{
        type:Number
    } ,
    longitude: {
        Type:Number
    },    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("FoodDonation", foodDonationSchema);
