const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Shelter = require('../models/shelter');



mongoose.connect('mongodb://localhost:27017/shelter-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection error: "));
db.once("open",()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () =>{
    await Shelter.deleteMany({});
  for( let i=0;i<50;i++){
    const random1000 = Math.floor(Math.random() * 1000);
   const camp =  new Shelter({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`
    }) 
    await camp.save();
  }
}

seedDb().then(() => {
    mongoose.connection.close();
})