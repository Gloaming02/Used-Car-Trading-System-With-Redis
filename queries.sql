SELECT Appointment.appointment_id, Customer.username AS customer_name, Car.make, Car.model, Seller.username AS seller_name
FROM Appointment
JOIN Customer ON Appointment.customer_id = Customer.customer_id
JOIN Car ON Appointment.car_id = Car.car_id
JOIN Seller ON Appointment.seller_id = Seller.seller_id
WHERE Customer.username = 'admin';

SELECT *
FROM Car
WHERE price > (SELECT AVG(price) FROM Car);

SELECT seller_id, COUNT(*) as Total_Appointments
FROM Appointment
GROUP BY seller_id
HAVING COUNT(*) > 2;

SELECT *
FROM Car
WHERE (make = 'Toyota' OR make = 'Honda') AND (year = '2020' OR year = '2021');


SELECT car_id, price,
       CASE
           WHEN price > 20000 THEN 'Expensive'
           WHEN price <= 20000 AND price > 15000 THEN 'Moderate'
           ELSE 'Affordable'
       END AS Price_Category
FROM Car;



