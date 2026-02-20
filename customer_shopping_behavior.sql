CREATE TABLE customer (
    customer_id INT PRIMARY KEY,
    category VARCHAR(50),
    review_rating FLOAT,
    frequency_of_purchases VARCHAR(30),
    purchase_frequency_days INT,
    discount_applied BOOLEAN,
    promo_code_used BOOLEAN
);
select * from customer;
show tables;
SELECT COUNT(*) FROM customer;
SELECT * FROM customer LIMIT 5;
USE customer_shopping_behavior;
SHOW TABLES;
SELECT COUNT(*) FROM customer;
SELECT * FROM customer LIMIT 200;
#Q1. what is the total revence  generates by male vs female customers
select gender, sum(purchase_amount (usd))  as total_revence
from customer
group by gender
Order by total_revence Desc;
#Q2. which customer used a discount but still spent more than the average purchase amount
SELECT 'customer id', `Purchase Amount (USD)`, `Discount Applied`
FROM customer
WHERE `Discount Applied` = 'Yes'
  AND `Purchase Amount (USD)` > (
      SELECT AVG(`Purchase Amount (USD)`) FROM customer
  );
#Q3.Which are the top 5 products with the highest average review rating?

 SELECT `Item Purchased`, AVG(`Review Rating`) AS avg_rating
FROM customer
GROUP BY `Item Purchased`
ORDER BY avg_rating DESC
LIMIT 5;
#Q4.Compare average Purchase Amount between Standard and Express Shipping

SELECT `Shipping Type`, AVG(`Purchase Amount (USD)`) AS avg_purchase
FROM customer
WHERE `Shipping Type` IN ('Standard', 'Express')
GROUP BY `Shipping Type`;
#Q5. Compare spend and total revenue between subscribers and non-subscribers.
SELECT `Subscription Status`, 
       AVG(`Purchase Amount (USD)`) AS avg_spend,
       SUM(`Purchase Amount (USD)`) AS total_revenue
FROM customer
GROUP BY `Subscription Status`;
#Q6Top 5 products with highest % of purchases with discounts applied.
SELECT `Item Purchased`, 
       (SUM(CASE WHEN `Discount Applied` = 'Yes' THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS discount_pct
FROM customer
GROUP BY `Item Purchased`
ORDER BY discount_pct DESC
LIMIT 5;
#Q7. Segment customers by previous purchases: New (0), Returning (1–5), Loyal (>5) and count each segment

SELECT
    CASE 
        WHEN `Previous Purchases` = 0 THEN 'New'
        WHEN `Previous Purchases` BETWEEN 1 AND 5 THEN 'Returning'
        ELSE 'Loyal'
    END AS customer_segment,
    COUNT(*) AS customer_count
FROM customer
GROUP BY customer_segment;
#Q8.Top 3 most purchased products within each category
SELECT Category, `Item Purchased`, COUNT(*) AS purchase_count
FROM customer
GROUP BY Category, `Item Purchased`
ORDER BY Category, purchase_count DESC;

#Q9. Do repeat buyers (>5 previous purchases) subscribe?
SELECT `Subscription Status`, COUNT(*) AS customer_count
FROM customer
WHERE `Previous Purchases` > 5
GROUP BY `Subscription Status`;
#Q10.Revenue contribution of each age group

SELECT `age `, SUM(`Purchase Amount (USD)`) AS total_revenue
FROM customer
GROUP BY `age`
ORDER BY total_revenue DESC;


SELECT @@hostname AS host_name;
SELECT @@hostname AS host_name, @@version AS version;
SELECT @@server AS server_name;
select version ();
select * from customer