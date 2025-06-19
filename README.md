## Previous Work
https://github.com/Gloaming02/Used-Car-Trading-System

# New Feature
New Functionalities to be used as an in-memory key-value storage:  
A shopping cart  
To implement the shopping cart I will use a Redis set with the key "Cart:userId", car ids as the values, and a score of the number of cars they want)

![截屏2023-12-10 下午5 32 05](https://github.com/Gloaming02/Used-Car-Trading-System-With-Redis/assets/91642985/135569a9-41f4-4f4c-9a69-809fe1f03733)
![截屏2023-12-10 下午5 32 48](https://github.com/Gloaming02/Used-Car-Trading-System-With-Redis/assets/91642985/7661daf4-96d8-4ff7-9b0d-84f305f9d910)


# Used Car Trading System with MongDB and Redis

## Initialize the database
mongorestore --uri "mongodb://localhost:27017" --db UsedCarSystem --drop db/UsedCarSystem

## How to Start
npm install  
npm start  

## Login Account for Test
username: admin  
password: admin  

## For More Details of The project:  
https://github.com/Gloaming02/Used-Car-Trading-System  
  
# Description  
This project will modify the database from my previous project (https://github.com/Gloaming02/Used-Car-Trading-System) to a document-based database (Mongo).
Also, add the new Feature with Redis

## UML
![Project 1 UML](https://github.com/Gloaming02/Used-Car-Trading-System/assets/91642985/ba438bc9-706d-4e35-960d-4a3c50cd24be)

## ERD
https://lucid.app/lucidchart/77ec093c-ca73-4b17-a061-a19774987c2e/edit?viewport_loc=-1656%2C-648%2C1619%2C994%2C0_0&invitationId=inv_51ce550c-0bb5-4d1a-94fa-e162f91aa9f5 
    
![截屏2023-11-29 下午3 47 56](https://github.com/Gloaming02/Used-Car-Trading-System-With-MongoDB/assets/91642985/763a6936-ad7e-4882-80ce-f07d4ada63eb)
  
# Demo  
  
  <img width="1314" alt="截屏2023-12-01 下午10 21 52" src="https://github.com/Gloaming02/Used-Car-Trading-System-With-MongoDB/assets/91642985/15d6503e-cb09-4de1-b0c2-0b7849439407">
<img width="757" alt="截屏2023-12-01 下午10 21 45" src="https://github.com/Gloaming02/Used-Car-Trading-System-With-MongoDB/assets/91642985/8b25b5a2-d762-4f10-be42-f302863cbe1b">
<img width="1327" alt="截屏2023-12-01 下午10 21 24" src="https://github.com/Gloaming02/Used-Car-Trading-System-With-MongoDB/assets/91642985/faf62ab7-c0a7-44fb-8295-18ffab69be5a">
<img width="1317" alt="截屏2023-12-01 下午10 21 15" src="https://github.com/Gloaming02/Used-Car-Trading-System-With-MongoDB/assets/91642985/78bbb1ef-2870-49c6-b682-20911abc4abb">
<img width="1339" alt="截屏2023-12-01 下午10 21 08" src="https://github.com/Gloaming02/Used-Car-Trading-System-With-MongoDB/assets/91642985/838f5db1-e74d-468b-b817-a4dad1a990c5">

