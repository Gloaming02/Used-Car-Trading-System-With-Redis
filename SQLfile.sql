CREATE TABLE Customer (
    customer_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone INTEGER NOT NULL
);

CREATE TABLE Save (
    customer_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id)
);

CREATE TABLE Car (
    car_id INTEGER PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year TEXT NOT NULL,
    price REAL NOT NULL,
    mileage TEXT NOT NULL,
    reportUrl TEXT NOT NULL,
    location TEXT NOT NULL
);

CREATE TABLE Appointment (
    appointment_id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    day INTEGER NOT NULL,
    clock INTEGER NOT NULL
);

CREATE TABLE Seller (
    seller_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phone INTEGER NOT NULL
);
