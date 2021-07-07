const mongoose = require('mongoose');

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campgroud");

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

// Random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Creating 200 fake campgrounds
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60d9e90b27463533a0403cbd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dvmo2k3yk/image/upload/v1625070627/YelpCamp/c4n6zjvhmrzaf1ketyw7.webp',
                    filename: 'YelpCamp/c4n6zjvhmrzaf1ketyw7'
                },
                {
                    url: 'https://res.cloudinary.com/dvmo2k3yk/image/upload/v1625070627/YelpCamp/rnt6i9ovauhkoeatj3n2.webp',
                    filename: 'YelpCamp/rnt6i9ovauhkoeatj3n2'
                }
            ]
        })
        await camp.save();
    }
}

// Closing connection with DB
seedDB().then(() => {
    mongoose.connection.close();
});