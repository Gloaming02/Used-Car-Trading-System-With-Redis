CREATE TABLE Appointment (
    appointment_id INTEGER,
    date DATE NOT NULL,
    customer_id INTEGER NOT NULL,
    seller_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (seller_id) REFERENCES Seller(seller_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id),
    PRIMARY KEY("appointment_id","car_id","date")
)

CREATE TABLE "Car" (
	"car_id"	INTEGER,
	"make"	TEXT NOT NULL,
	"model"	TEXT NOT NULL,
	"year"	INTEGER NOT NULL,
	"price"	REAL NOT NULL,
	"mileage"	INTEGER NOT NULL,
	"reportUrl"	TEXT NOT NULL,
	"location"	TEXT NOT NULL,
	"seller_id"	INTEGER NOT NULL,
	PRIMARY KEY("car_id"),
	FOREIGN KEY("seller_id") REFERENCES "Seller"("seller_id")
)

CREATE TABLE "Customer" (
	"customer_id"	INTEGER,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"phone"	INTEGER NOT NULL,
	PRIMARY KEY("customer_id")
)

CREATE TABLE Mark (
    customer_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id),
    PRIMARY KEY("customer_id","car_id")
)

CREATE TABLE "Seller" (
	"seller_id"	INTEGER,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"phone"	TEXT NOT NULL,
	"ssn"	INTEGER NOT NULL,
	PRIMARY KEY("seller_id")
)
