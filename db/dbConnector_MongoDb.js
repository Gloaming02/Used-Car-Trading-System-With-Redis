const { MongoClient, ObjectId} = require('mongodb');

const uri = 'mongodb://localhost:27017'; 

async function getCars() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        const cars = await db.collection('users').aggregate([
            {
              $unwind: "$cars" 
            },
            {
              $project: {
                _id: 0, 
                car_id: "$cars._id",
                seller_id: "$_id", 
                make: "$cars.make",
                model: "$cars.model",
                year: "$cars.year",
                price: "$cars.price",
                mileage: "$cars.mileage",
                reportUrl: "$cars.reportUrl",
                location: "$cars.location"
              }
            }
          ]).limit(30).toArray();
        
        return cars;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

async function getCustomerByUsername(username) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        const results = await db.collection('users').find({
            username: username,
            ssn: { $exists: false }
          }).toArray();
        console.log(username);
        return results;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

async function getSellerByUsername(username) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        const results = await db.collection('users').find({
            username: username,
            ssn: { $exists: true }
          }).toArray();
        return results;
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}


async function insertUser(username, password, email, phone, userType, ssn) {

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
        console.log(username, password, email, phone, userType, ssn);
        let existingUser;
        if (userType === 'seller') {
            existingUser = await getSellerByUsername(username);
        } else {
            existingUser = await getCustomerByUsername(username);
        }
        console.log(existingUser);
        if (existingUser.length !== 0) {
            console.log('no');
            throw new Error('User already exists');
        }else{
            const userDocument = {
                username: username,
                password: password,
                email: email,
                phone: phone
            };
            if (userType === 'seller') {
                userDocument.ssn = ssn;
            }
            await db.collection('users').insertOne(userDocument);
            console.log('User inserted successfully');
        }
        //---------------

    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
  }

  async function insertCar(make, model, year, price, mileage, reportUrl, location, sellerId) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
        const carId = new ObjectId();
        const newCar = {
            _id: carId,
            make,
            model,
            year,
            price,
            mileage,
            reportUrl,
            location,
        };

        const result = await db.collection('users').updateOne(
            { "_id": new ObjectId(sellerId) },
            { $push: { "cars": newCar } }
        );

        if (result.modifiedCount === 0) {
            console.error('Failed to insert car into seller document');
            throw new Error('Failed to insert car into seller document');
        }

        console.log('Car inserted successfully:', newCar);
        //---------------

    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
  }

  async function getCarsById(sellerId) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
        const seller = await db.collection('users').findOne({ _id: new ObjectId(sellerId) });
        
        if (!seller) {
            throw new Error('Unexpected error');
        }
        

        const cars = seller.cars || [];
        for (const car of cars) {
            car.car_id = car._id;
            car.seller_id = sellerId;
        }

        console.log(cars);
        return cars;
        //---------------
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
  }

  async function deleteCar(car_id) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
        const result = await db.collection('users').updateOne(
            { 'cars._id': new ObjectId(car_id) },
            { $pull: { cars: { _id: new ObjectId(car_id) } } }
          );
      
          if (result.matchedCount === 0) {
            console.log(`Car with id ${car_id} not found.`);
          } else {
            console.log(`Car with id ${car_id} deleted successfully.`);
          }
        //---------------
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }   
  }

  async function markCarInDatabase(customer_id, car_id) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
        console.log("-----------------------------------------");
        const existingUser = await db.collection('users').findOne({ _id: new ObjectId(customer_id) });
        console.log(existingUser);
        if (!existingUser) {
          throw new Error('User not found.');
        }
    
        if (!existingUser.marked_cars) {
          existingUser.marked_cars = [];
        }

        const existingMark = existingUser.marked_cars.find(mark => mark.car_id.toString() === car_id);
    
        if (existingMark) {
          throw new Error('Mark for this car already exists.');
        }

        const newMark = {
          car_id: new ObjectId(car_id),
        };
    
        await db.collection('users').updateOne(
          { _id: new ObjectId(customer_id) },
          { $push: { marked_cars: newMark} } 
        );

        // ---------------
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }   
  }
  

async function removeMarkFromDatabase(customer_id, car_id) {
  const client = new MongoClient(uri);
  try {
      await client.connect();
      const db = client.db('UsedCarSystem');
      //---------------
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(customer_id) },
        { $pull: { 'marked_cars': { car_id: new ObjectId(car_id) } } }
      );
  
      if (result.modifiedCount === 0) {
        throw new Error('Marked car not found for deletion.');
      }
  
      console.log('Marked car removed successfully.');

      // ---------------
  } catch (e) {
      console.error(e);
      throw e;
  } finally {
      await client.close();
  }   
}

async function getMarkedCarsByUser(userId) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('UsedCarSystem');

    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new Error('User not found.');
    }

    // Extract car_ids from marked_cars
    const carIds = user.marked_cars.map(mark => mark.car_id);
    console.log(carIds);

    const markedCars = await db.collection('users').aggregate([
      {
        $match: { 'cars._id': { $in: carIds } }
      },
      {
        $unwind: '$cars'
      },
      {
        $match: { 'cars._id': { $in: carIds } }
      },
      {
        $project: {
          _id: '$cars._id',
          car_id: '$cars._id',
          make: '$cars.make',
          model: '$cars.model',
          year: '$cars.year',
          price: '$cars.price',
          mileage: '$cars.mileage',
          reportUrl: '$cars.reportUrl',
          location: '$cars.location',
        }
      }
    ]).toArray();
    

    console.log(markedCars);

    return markedCars;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
}

async function searchCarsByCriteria(make, model, year, price, mileage, location, seller_id) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('UsedCarSystem');

    const filter = {};

    if (make) {
      filter['cars.make'] = make;
    }
    
    if (model) {
      filter['cars.model'] = model;
    }
    
    if (year) {
      filter['cars.year'] = parseInt(year);
    }
    
    if (price) {
      filter['cars.price'] = { $lte: parseFloat(price) };
    }
    
    if (mileage) {
      filter['cars.mileage'] = { $lte: parseInt(mileage) };
    }
    
    if (location) {
      filter['cars.location'] = location;
    }

    if (seller_id) {
      filter._id = new ObjectId(seller_id);
    }
    console.log(filter);
    const cars = await db.collection('users').aggregate([
      {
        $unwind: '$cars'
      },
      {
        $match: filter
      },
      {
        $project: {
          _id: '$cars._id',
          car_id: '$cars._id',
          make: '$cars.make',
          model: '$cars.model',
          year: '$cars.year',
          price: '$cars.price',
          mileage: '$cars.mileage',
          reportUrl: '$cars.reportUrl',
          location: '$cars.location',
          seller_id: '$_id' // Assuming 'seller_id' is taken from the user document's _id
        }
      }
    ]).toArray();

    return cars;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getAppointmentByUser(userId) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------

        const existingAppointment = await db.collection("appointments").aggregate([
            {
              $match: { customer_id: new ObjectId(userId) }
            },
            {
              $lookup: {
                from: "users",
                localField: "car_id",
                foreignField: "cars._id",
                as: "userDetails"
              }
            },
            {
              $unwind: "$userDetails"
            },
            {
              $project: {
                _id: 1,
                sellerUsername: 1,
                customer_id: 1,
                seller_id: 1,
                date: 1,
                car_id: 1,
                carDetails: {
                  $filter: {
                    input: "$userDetails.cars",
                    as: "car",
                    cond: { $eq: ["$$car._id", "$car_id"] }
                  }
                }
              }
            },
            {
              $unwind: "$carDetails"
            },
            {
              $project: {
                _id: 1,
                customer_id: 1,
                sellerUsername: 1,
                date: 1,
                car_id: 1,
                make: "$carDetails.make",
                model: "$carDetails.model",
                year: "$carDetails.year",
                price: "$carDetails.price",
                mileage: "$carDetails.mileage",
                reportUrl: "$carDetails.reportUrl",
                location: "$carDetails.location"
              }
            }
          ]).toArray();
        return existingAppointment;

    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }

}


async function makeAppointment(customer_id, seller_id, car_id, date) {

    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
      const appointmentCollection = db.collection("appointments");

        const existingAppointment = await appointmentCollection.findOne(
          { car_id: new ObjectId(car_id)},
          {date : date });
        
        console.log(car_id);
        console.log(date);

        if (existingAppointment) {
          throw new Error("This Car is not available at selected time");
        }
        
        const appointmentId = new ObjectId();
        const customerIdObject = new ObjectId(customer_id);
        const sellerIdObject = new ObjectId(seller_id);
        const carIdObject = new ObjectId(car_id);

        const result = await db.collection('users').findOne({ _id: new ObjectId(seller_id) });

        const newAppointment = {
            _id: appointmentId,
            customer_id: customerIdObject,
            seller_id: sellerIdObject,
            date: date,
            car_id: carIdObject,
            sellerUsername: result.username
        };

    
        await appointmentCollection.insertOne(newAppointment);
        console.log("Appointment successfully created.");

    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }

}


module.exports = {
    getCars,
    getCustomerByUsername,
    getSellerByUsername,
    insertUser,
    insertCar,
    getCarsById,
    deleteCar,
    makeAppointment,
    searchCarsByCriteria,
    markCarInDatabase,
    removeMarkFromDatabase,
    getMarkedCarsByUser,
    getAppointmentByUser
};


