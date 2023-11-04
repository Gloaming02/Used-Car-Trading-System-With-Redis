# Used Car Trading System

## How to Start
npm install  
npm start  

## Login Account for Test
username: admin  
password: admin  

## Description
The project is a second-hand trading system designed to provide a method for customers and sellers of cars to connect with each other. The system allows customers to search for cars based on their preferences such as make, model, year, price, maximum mileage, location, and seller Information. Customers can mark cars they like and view all their marked cars on a single page. Sellers can post their cars on the system and can view all their posted cars on a single page. Sellers can also choose to delete a posted car if they no longer wish to sell it or need to make modifications. The system includes a registration system that prompts users to specify whether they want to register as a seller or a customer. Sellers are required to provide their Social Security Number (SSN). Usernames must be unique among customers and sellers. Customers can make an appointment for test drives for cars they are interested in. Scheduling a test drive involves selecting a time slot and requires logging in.


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
