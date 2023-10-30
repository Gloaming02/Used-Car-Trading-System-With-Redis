# Used Car Trading System

## Description
The Used Car Trading System is an online platform designed to facilitate the buying and selling of used cars. The system provides a user-friendly interface for users to post their vehicle listings, browse available listings, and connect with potential buyers or sellers. It incorporates a robust filtering system to enable users to efficiently search for specific types of vehicles that meet their preferences. The primary focus is to ensure the security and reliability of all transactions.

## Database Rules
- Each vehicle is assigned a unique identification number for effective differentiation within the system.
- Users are required to register and log in to the system to manage their vehicle listings or engage with other users.
- Vehicle listings include essential details such as brand, model, year, mileage, price, and a comprehensive description of the vehicle's condition.
- Users can utilize the filtering feature to search for vehicles based on type, brand, and price range.
- All transaction details, including timestamps, buyer/seller information, and transaction amounts, are securely recorded in the system.

## Business Rules
- Users must provide accurate and reliable information about their listed vehicles to maintain transparency and avoid misleading potential buyers.
- Effective communication between buyers and sellers is encouraged to establish clear transaction terms and conditions before finalizing any deals.
- The system prioritizes the protection of users' sensitive information and ensures the secure storage and transfer of all data.

## Possible Nouns and Actions
### Nouns
Users, Vehicles, Brands, Models, Years, Mileage, Price, Vehicle Condition, Transaction Records

### Actions
Register, Log in, Post, Search, Filter, Communicate, Record, Protect

## UML
![截屏2023-10-29 下午8 32 47](https://github.com/Gloaming02/Used-Car-Trading-System/assets/91642985/78c66fe3-6419-4992-a5a7-c68e8324a002)  

## ERD
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
