# Used Car Trading System

## Description
This project is a trading system aimed at providing a convenient platform for both sellers and buyers to trade used vehicles. The system allows users to search for cars that meet their specific criteria and provides features for marking favorite cars, managing marked vehicles, and scheduling test drives. Sellers can easily post their vehicle information and manage their listings. Users can perform specific actions through registration and login, and the system ensures the uniqueness of usernames and the integrity of necessary information.

# Project Requirements Document

## Database Rules:

1. The system allows users to search for available used cars based on specific criteria, including car make, model, year, price, maximum mileage, location, and seller ID.
2. Users can mark cars they like for future reference and management.
3. Users can remove cars they have marked.
4. Sellers can post their cars on the system and can view and manage all their posted cars.
5. Sellers can choose to delete their posted cars from the system.
6. Users must specify whether they are a seller or a customer during the registration process, with sellers needing to provide their Social Security Number (SSN).
7. Usernames must be unique within the system, with no duplicate usernames allowed.
8. Customers can make appointments to test drive their preferred cars and provide necessary information during the booking process.
9. A user cannot mark a car twice.
10. A car cannot be appointed on the same date.

## Business Rules:

1. Users can buy and sell used cars through the system.
2. Users must register and log in to the system to perform specific actions.
3. Sellers need to provide additional personal information.
4. Usernames must be unique within the system.
5. Users can search for cars that meet their specific criteria.
6. Users can mark and manage their favorite cars for future reference.
7. Users can remove cars they have marked.
8. Sellers can post their car information on the system and manage their listings.
9. Sellers can choose to remove their posted car information from the system.
10. Customers can make appointments to test drive cars they are interested in.
11. Authentication is required for any changes made within the system.

## List of Possible Nouns and Actions:

### Nouns: 
Buyer, Seller, Car, Appointment, System, Username, Password, Email, Phone number, Social Security Number, Car Make, Model, Year, Price, Mileage, Location, Car ID, Marking, Appointment ID.

### Actions: 
Register, Login, Search, Mark, Delete, Post, Manage, Book, Test Drive.


## UML
![截屏2023-10-29 下午8 32 47](https://github.com/Gloaming02/Used-Car-Trading-System/assets/91642985/78c66fe3-6419-4992-a5a7-c68e8324a002)  

## ERD
https://lucid.app/lucidchart/77ec093c-ca73-4b17-a061-a19774987c2e/edit?viewport_loc=-1656%2C-648%2C1619%2C994%2C0_0&invitationId=inv_51ce550c-0bb5-4d1a-94fa-e162f91aa9f5  

![截屏2023-10-29 下午8 58 38](https://github.com/Gloaming02/Used-Car-Trading-System/assets/91642985/078c6c36-4cce-41b4-8526-0fd6ba3ae7e9)  

## Relational schema
Customer(**customer_id**, username, password, email, phone)  
Save(*customer_id*, *car_id*)  
Car(**car_id**, make, model, year, price, mileage, reportUrl, location)  
Appointment(**appointment_id**, year, month, day, clock)  
Seller(**seller_id**, username, password, email, phone)  

Customer:  
customer_id → username, password, email, phone  
Save:  
customer_id, car_id → {customer_id, car_id}  
Car:  
car_id → make, model, year, price, mileage, reportUrl, location  
Appointment:  
appointment_id → year, month, day, clock  
Seller:  
seller_id → username, password, email, phone  

candidate keys:  
Customer table: {customer_id}  
Save table: {customer_id, car_id}  
Car table: {car_id}  
Appointment table: {appointment_id}  
Seller table: {seller_id}  
