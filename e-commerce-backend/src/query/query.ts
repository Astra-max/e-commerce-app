export const cartQuery = `SELECT product_id FROM cart WHERE product_id=$1 AND user_id=$2`;
export const saveItem = `INSERT INTO cart (user_id, product_id, product_name, product_description, product_category, quantity, product_price, product_image, product_status)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
   RETURNING *`;
export const allItems = `SELECT * FROM cart WHERE user_id=$1`;
export const getSingleItem = `SELECT * FROM cart WHERE product_id=$1 AND user_id=$2`;
export const addQuantity = `UPDATE cart SET quantity = quantity + 1 WHERE product_id=$1 AND user_id=$2 RETURNING *`;
export const reduceQuantity = `UPDATE cart SET quantity = quantity - 1 WHERE product_id=$1 AND user_id=$2 RETURNING *`;
export const removeItem = `DELETE FROM cart WHERE product_id=$1 AND user_id=$2`;
export const getTotal = `SELECT SUM(product_price * quantity) AS total FROM cart WHERE user_id=$1`;
export const userQuery = `SELECT user_name, user_id, email, password FROM users WHERE email=$1`;
export const addTotal = `UPDATE cart SET amount=product_price*quantity WHERE product_id=$1 AND user_id=$2 RETURNING amount`
export const deleteCartItem = `DELETE FROM cart WHERE user_id=$1 AND product_id=$2`