var mongoose = require("mongoose");

var itemSchema = new mongoose.Schema({
    country: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    bedroomAva: String,
    bathroomAva: String,
    phoneNum: String,
    emailAddr: String,
    startDate: String,
    endDate: String,
    price: String,
    otherCharge: String,
    furnish: String,
    washMachine: String,
    gym: String,
    swimmingPool: String,
    parkingLot: String,
    pet: String,
    smoke: String,
    party: String,
    otherInfo: String,
    img: String,
    author: {
        id:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
        },
        username: String,
        Fname: String,
        Sname: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("item",itemSchema);