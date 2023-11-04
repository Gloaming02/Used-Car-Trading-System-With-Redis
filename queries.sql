--- return the make, model, and year of the vehicles marked by customers with the username 'admin':
--- contain a join of at least three tables
SELECT Customer.username, Car.make, Car.model, Car.year
FROM Customer
JOIN Mark USING (customer_id)
JOIN Car USING (car_id)
WHERE Customer.username = 'admin';

--- return all the rows from the Car table where the price is greater than the average price of all cars. 
--- contain a subquery
SELECT *
FROM Car
WHERE price > (SELECT AVG(price) FROM Car);


--- This query calculates the average price of cars for each distinct make,
--- and then filters the result to only include makes whose average price is greater than $25,000. 
--- contain a group by with a having clause
SELECT make, AVG(price) as avg_price
FROM Car
GROUP BY make
HAVING AVG(price) > 25000;

--- return the cars with a make of 'Toyota' or 'Honda' and a model year of '2020' or '2021'
--- must contain a complex search criterion (more than one expression with logical connectors)
SELECT *
FROM Car
WHERE (make = 'Toyota' OR make = 'Honda') AND (year = '2020' OR year = '2021');

--- This query categorizes cars based on their prices into three groups: 'Expensive', 'Moderate', and 'Affordable'.
--- Experiment with advanced query mechanisms such as RCTE, PARTITION BY, or SELECT CASE/WHEN.
SELECT car_id, price,
       CASE
           WHEN price > 20000 THEN 'Expensive'
           WHEN price <= 20000 AND price > 15000 THEN 'Moderate'
           ELSE 'Affordable'
       END AS Price_Category
FROM Car;



