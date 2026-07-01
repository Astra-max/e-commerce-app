export const cartQuery = `SELECT productid FROM cart WHERE productid=$1 AND userid=$2`;
export const saveItem = `INSERT INTO cart (userid,productid,name,description,category, quantity, price,image,status)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
   RETURNING *`;
export const allItems = `SELECT * FROM cart WHERE userid=$1`;
export const getSingleItem = `SELECT * FROM cart WHERE productid=$1 AND userid=$2`;
export const addQuantity = `UPDATE cart SET quantity = quantity + 1 WHERE productid=$1 AND userid=$2 RETURNING *`;
export const reduceQuantity = `UPDATE cart SET quantity = quantity - 1 WHERE productid=$1 AND userid=$2 RETURNING *`;
export const removeItem = `DELETE FROM cart WHERE productid=$1 AND userid=$2`;
export const getTotal = `SELECT SUM(price * quantity) AS total FROM cart WHERE userid=$1`;
export const userQuery = `SELECT username, userid, email, password FROM users WHERE email=$1`;
export const addTotal = `UPDATE cart SET amount=price*quantity WHERE productid=$1 AND userid=$2 RETURNING amount`
export const deleteCartItem = `DELETE FROM cart WHERE userid=$1 AND productid=$2`