const { MongoClient, ObjectId} = require('mongodb');

const uri = 'mongodb://localhost:27017'; 

//one query must contain and aggregation
async function getAllCars() {
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
          ]).toArray();
        console.log(cars);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

// one must contain a complex search criterion (more than one expression with logical connectors
// search for cars that its prices less than 10000 and year is greater than 2010
async function searchCarsByCriteria() {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('UsedCarSystem');
      const filter = {
        $and: [
          { 'cars.price': { $lte: 10000 } },
          { 'cars.year': { $gte: 2010 } } 
        ]
      };

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
            seller_id: '$_id'
          }
        }
      ]).toArray();
      console.log(cars);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await client.close();
    }
  }
  
//counting documents for an specific user
async function getAllSellers() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        const seller = await db.collection('users').countDocuments({ssn: {$exists: true}});
        console.log(`Number of sellers: ${seller}`);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

//one must be updating a document based on a query parameter
async function getAllCustomers() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        const seller = await db.collection('users').countDocuments({ssn: {$exists: false}});
        console.log(`Number of sellers: ${seller}`);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        await client.close();
    }
}

//one must be updating a document based on a query parameter
async function deleteCar() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('UsedCarSystem');
        //---------------
        const car_id = '65655001fc13ae11884cd90f';
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

getAllCars();
searchCarsByCriteria();
getAllSellers();
getAllCustomers()
deleteCar();