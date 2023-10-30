DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer (
    customer_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone INTEGER NOT NULL
);

DROP TABLE IF EXISTS Save;
CREATE TABLE Save (
    customer_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id)
);

DROP TABLE IF EXISTS Car;
CREATE TABLE Car (
    car_id INTEGER PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year TEXT NOT NULL,
    price REAL NOT NULL,
    mileage TEXT NOT NULL,
    reportUrl TEXT NOT NULL,
    location TEXT NOT NULL,
    seller_id INTEGER NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES Seller(seller_id)
);

DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment (
    appointment_id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    customer_id INTEGER NOT NULL,
    seller_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (seller_id) REFERENCES Seller(seller_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id)
);

DROP TABLE IF EXISTS Seller;
CREATE TABLE Seller (
    seller_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone INTEGER NOT NULL
);
