const mongoose = require("mongoose");
const mongoURI =
  databse_URI;
const mongoDB = async () => {
  await mongoose
    .connect(mongoURI)
    .then(async () => {
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data
        .find({})
        .toArray()
        .then((data) => {
          global.food_items = data;
        })
        .catch((err) => console.log(err));
      const foodCategory = await mongoose.connection.db.collection(
        "foodCategory"
      );
      foodCategory
        .find({})
        .toArray()
        .then((data) => {
          global.catData = data;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("Connected Successfully");
    })
    .catch((err) => {
      console.log(`Comnnection Failed. ${err}`);
    });
};

module.exports = mongoDB;
