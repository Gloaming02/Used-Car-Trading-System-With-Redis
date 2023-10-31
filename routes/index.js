let express = require('express');
let router = express.Router();

const { getCars, insertUser, insertCar, 
  getCarsById, deleteCar, makeAppoinment,
  searchCarsByCriteria, markCarInDatabase,
  removeMarkFromDatabase, getMarkedCarsByUser} = require("../db/dbConnector_Sqlite.js");

/* GET home page. */
/* GET home page. */
/* GET home page. */
// router.get('/', async function(req, res, next) {
//   const cars = await getCars();
//   const isUserLoggedIn = checkIfUserLoggedIn(req);
//   console.log("route / called  -  cars.length", cars.length);
//   res.render("index", { title: "Used Car Trading System  ", cars, isUserLoggedIn }); 
// });

/* GET home page with search functionality. */
// router.get('/', async function(req, res, next) {
//   let cars;
//   if (req.query.make || req.query.year || req.query.mileage) {
//     cars = await searchCarsByCriteria(req.query.make, req.query.year, req.query.mileage);
//   } else {
//     cars = await getCars();
//   }
//   const isUserLoggedIn = checkIfUserLoggedIn(req);
//   res.render("index", { title: "Used Car Trading System", cars, isUserLoggedIn });
// });


/* GET home page. */
router.get('/', async function(req, res, next) {
  let cars;
  if (req.query.make || req.query.model || req.query.year || req.query.price || req.query.mileage || req.query.location || req.query.seller_id) {
    cars = await searchCarsByCriteria(req.query.make, req.query.model, req.query.year, req.query.price, req.query.mileage, req.query.location, req.query.seller_id);
  } else {
    cars = await getCars();
  }
  const isUserLoggedIn = checkIfUserLoggedIn(req);
  res.render("index", { title: "Used Car Trading System", cars, isUserLoggedIn });
});

// other routes...


/* GET appointment page. */
router.get('/appointment', function(req, res, next) {
  if (!checkIfUserLoggedIn(req)) {
    return res.redirect('/login');
  }

  const errorMessage = '';
  const carId = req.query.car_id; // Assuming you pass the car_id as a query parameter
  const sellerId = req.query.seller_id; // Assuming you pass the seller_id as a query parameter
  const customerId = req.session.userId; // 假设你的会话中有 userId

  res.render('appointment', { title: 'Make Appointment', errorMessage: errorMessage, carId: carId, sellerId: sellerId, customerId: customerId });
});

/* POST appointment data. */
router.post('/appointment', async function(req, res, next) {
  const { customer_id, seller_id, car_id, date } = req.body; // 将 customer_id 改为 customerId
  console.log(req.body);

  try {
    await makeAppoinment(customer_id, seller_id, car_id, date); // 将 customer_id 改为 customerId
    res.send(
      '<script>alert("Appointment made successfully!");' +
      'window.location.href="/";</script>'
    );
  } catch (error) {
    const errorMessage = 'Error making the appointment. Please try again.';
    res.render('appointment', { title: 'Make Appointment', errorMessage: errorMessage, carId: car_id, sellerId: seller_id, customerId: customer_id });
  }
});



/* GET register page. */
/* GET register page. */
/* GET register page. */
router.get('/register', function(req, res, next) {
  const errorMessage = '';
  res.render('register', { title: 'Register', errorMessage: errorMessage });
});

/* POST register data. */
router.post('/register', async function(req, res, next) {
  const { username, password, email, phone, userType, ssn } = req.body;

  if (!username || !password || !email || !phone) {
    const errorMessage = 'Please fill in all the required fields.';
    return res.render('register', { title: 'Register', errorMessage: errorMessage });
  }

  if (userType === 'seller' && !ssn) {
    const errorMessage = 'Please provide your SSN.';
    return res.render('register', { title: 'Register', errorMessage: errorMessage });
  }

  try {
    if (userType === 'seller') {
      await insertUser(username, password, email, phone, userType, ssn);
    } else {
      await insertUser(username, password, email, phone, userType, null); // 或者将 ssn 设置为空字符串 ''
    }
  } catch (error) {
    const errorMessage = 'User already exists. Please choose a different username.';
    return res.render('register', { title: 'Register', errorMessage: errorMessage });
  }

  res.send(
    '<script>' +
    'alert("Registration successful. Please log in.");' +
    'window.location.href = "/login";' +
    '</script>'
  );
});

/* GET postcar page. */
router.get('/postcar', function(req, res, next) {
  const errorMessage = '';
  res.render('postcar', { title: 'Post Car', errorMessage: errorMessage });
});

/* POST postcar data. */
router.post('/postcar', async function(req, res, next) {
  const { make, model, year, price, mileage, reportUrl, location } = req.body;

  if (!make || !model || !year || !price || !mileage || !reportUrl || !location) {
    // 如果缺少必填字段，则显示错误消息
    const errorMessage = 'Please fill in all the required fields.';
    return res.render('postcar', { title: 'Post Car', errorMessage: errorMessage });
  }

  try {
    await insertCar(make, model, year, price, mileage, reportUrl, location, req.session.userId);

    const successMessage = 'Car added successfully!';
    res.send(
      '<script>alert("Car added successfully!");' +
      'window.location.href="/postcar";</script>'
    );
  } catch (error) {
    const errorMessage = 'Error adding the car. Please try again.';
    res.render('postcar', { title: 'Post Car', errorMessage: errorMessage });
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send(
        '<script>alert("successfully log out");' +
        'window.location.href="/";</script>'
      );
    }
  });
});


router.get('/managecar', async function(req, res, next) {
  const cars = await getCarsById(req.session.userId);
  const isUserLoggedIn = checkIfUserLoggedIn(req);
  console.log("route / called  -  cars.length", cars.length);
  res.render("managecar", { title: "Manage Your Car  ", cars, isUserLoggedIn }); 
});


router.get('/deletecar', async function(req, res, next) {
  const carId = req.query.car_id;
  const sellerId = req.query.seller_id;

  console.log(carId);
  try {
    // 在这里执行删除操作
    await deleteCar(carId); // 可能需要实现 `deleteCar` 函数

    res.send(
      '<script>alert("Car deleted successfully!");' +
      'window.location.href="/managecar";</script>'
    );
  } catch (error) {
    // 处理删除错误，可能需要渲染错误页面或显示错误消息
    res.status(500).send(
      '<script>alert("Error deleting the car. Please try again.");' +
      'window.location.href="/managecar";</script>'
    );
  }
});


router.post('/markcar', async function(req, res, next) {
  const { carId, markStatus } = req.body;

  if (checkIfUserLoggedIn(req)) {
    // Update the mark status in the database
    if (markStatus) {
      try {
        await markCarInDatabase(req.session.userId, carId);
        res.json({ message: 'Car marked successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Error marking the car.' });
      }
    } else {
      try {
        await removeMarkFromDatabase(req.session.userId, carId);
        res.json({ message: 'Mark removed successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Error removing the mark.' });
      }
    }
  } else {
    res.send('<script>alert("Please log in to continue.");window.location.href="/login";</script>');
  }
});

/* GET marked cars page. */
router.get('/markedcars', async function(req, res, next) {
  if (!checkIfUserLoggedIn(req)) {
    return res.redirect('/login');
  }

  const markedCars = await getMarkedCarsByUser(req.session.userId); // 请确保实现该函数
  const isUserLoggedIn = checkIfUserLoggedIn(req);
  res.render('markedcars', { title: 'Marked Cars', markedCars, isUserLoggedIn });
});

router.post('/unmarkcar', async (req, res) => {
  const { car_id } = req.body;
  const customer_id = req.session.userId;

  try {
    await removeMarkFromDatabase(customer_id, car_id);
    res.redirect('/markedcars');
  } catch (error) {
    res.status(500).json({ error: 'Error removing the mark.' });
  }

});


function checkIfUserLoggedIn(req) {
  if (req.session && req.session.user) {
    return true;
  }
  return false;
}


module.exports = router;
