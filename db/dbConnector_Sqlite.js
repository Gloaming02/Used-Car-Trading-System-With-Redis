const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function connect() {
  return open({
    filename: "./db/UsedCarSystem.db",
    driver: sqlite3.Database,
  });
}

async function getCars() {
  const db = await connect();
  const cars =
    await db.all(`SELECT *
    FROM  Car
    ORDER BY car_id
    LIMIT 20;
    `);

  console.log("dbConnector got data", cars.length);

  return cars;
}

async function getCustomerByUsername(username) {
    const db = await connect();
    const user = await db.get(`SELECT * FROM Customer WHERE username = ?`, [username]);
    console.log(username);

    return user;
}

async function getSellerByUsername(username) {
    const db = await connect();
    const user = await db.get(`SELECT * FROM Seller WHERE username = ?`, [username]);
    console.log('User from database:', user); 
    return user;
}


async function insertUser(username, password, email, phone, userType, ssn) {
    console.log(username, password, email, phone, userType, ssn);
    const db = await connect();
    let existingUser;
    if (userType === 'seller') {
        existingUser = await db.get('SELECT * FROM Seller WHERE username = ?', [username]);
    } else {
        existingUser = await db.get('SELECT * FROM Customer WHERE username = ?', [username]);
    }

    if (existingUser) {
        console.log('no');
        throw new Error('User already exists');
    }

    if (userType === 'seller') {
      await db.run('INSERT INTO Seller (username, password, email, phone, ssn) VALUES (?, ?, ?, ?, ?)', [username, password, email, phone, ssn]);
      console.log('yes1');
    } else {
      await db.run('INSERT INTO Customer (username, password, email, phone) VALUES (?, ?, ?, ?)', [username, password, email, phone]);
      console.log('yes2');

    }
  }

  async function makeAppoinment(customer_id, seller_id, car_id, date) {
    console.log(customer_id, seller_id, car_id, date);
    const db = await connect();

    await db.run('INSERT INTO Appointment (customer_id, date, car_id) VALUES (?, ?, ?)',
      [customer_id, date, car_id]);
  }

  async function insertCar(make, model, year, price, mileage, reportUrl, location, sellerId) {
    console.log('INSERT INTO Car (make, model, year, price, mileage, reportUrl, location, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [make, model, year, price, mileage, reportUrl, location, sellerId]);
    const db = await connect();
    await db.run('INSERT INTO Car (make, model, year, price, mileage, reportUrl, location, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [make, model, year, price, mileage, reportUrl, location, sellerId]);
  }

  async function getCarsById(sellerId) {
    console.log(sellerId);
    const db = await connect();
    const cars = await db.all(`SELECT * FROM Car WHERE seller_id = ?`, [sellerId]);
    console.log(cars);
    return cars;
  }

  async function deleteCar(car_id) {
    console.log(car_id);
    const db = await connect();
    await db.run('DELETE FROM Car WHERE car_id = ?', [car_id]);      
  }

  async function searchCarsByCriteria(make, model, year, price, mileage, location, seller_id) {
    const db = await connect();
    let query = `SELECT * FROM Car WHERE 1=1`;
    const params = [];
  
    if (make) {
      query += ` AND make = ?`;
      params.push(make);
    }
  
    if (model) {
      query += ` AND model = ?`;
      params.push(model);
    }
  
    if (year) {
      query += ` AND year = ?`;
      params.push(year);
    }
  
    if (price) {
      query += ` AND price <= ?`;
      params.push(price);
    }
  
    if (mileage) {
      query += ` AND mileage <= ?`;
      params.push(mileage);
    }
  
    if (location) {
      query += ` AND location = ?`;
      params.push(location);
    }
  
    if (seller_id) {
      query += ` AND seller_id = ?`;
      params.push(seller_id);
    }
    console.log(query, params)
    const cars = await db.all(query, params);
  
    return cars;
  }


  async function markCarInDatabase(customer_id, car_id) {
    console.log(customer_id);
    console.log(car_id);

    const db = await connect();
    const existingMark = await db.get('SELECT * FROM Mark WHERE customer_id = ? AND car_id = ?', [customer_id, car_id]);

    if (existingMark) {
      throw new Error('Mark for this car already exists.');
    }

    await db.run('INSERT INTO Mark (customer_id, car_id) VALUES (?, ?)', [customer_id, car_id]);
  }
  

async function removeMarkFromDatabase(customer_id, car_id) {
  const db = await connect();
  await db.run('DELETE FROM Mark WHERE customer_id = ? AND car_id = ?', [customer_id, car_id]);
}

async function getMarkedCarsByUser(userId) {
  const db = await connect();
  const markedCars = await db.all('SELECT * FROM Car INNER JOIN Mark ON Car.car_id = Mark.car_id WHERE Mark.customer_id = ?', [userId]);
  return markedCars;
}


async function getAppointmentByUser(userId) {
  const db = await connect(); 
  const query = `
      SELECT Car.car_id, Appointment.date, Car.make, Car.model, Car.year, Car.price, Car.mileage, Car.reportUrl, Car.location, Seller.username as sellerUsername
      FROM Appointment
      INNER JOIN Car ON Appointment.car_id = Car.car_id
      INNER JOIN Seller ON Car.seller_id = Seller.seller_id
      WHERE Appointment.customer_id = ?`;
  const markedCars = await db.all(query, [userId]);
  return markedCars;
}

module.exports = {
    getCars,
    getCustomerByUsername,
    getSellerByUsername,
    insertUser,
    insertCar,
    getCarsById,
    deleteCar,
    makeAppoinment,
    searchCarsByCriteria,
    markCarInDatabase,
    removeMarkFromDatabase,
    getMarkedCarsByUser,
    getAppointmentByUser
};


