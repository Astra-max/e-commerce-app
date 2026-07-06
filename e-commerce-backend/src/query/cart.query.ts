// INSERT queries / ADDING NEW ITEM TO CART 
export const addItemQuery = `INSERT INTO cart (user_id, product_id, product_name, product_description, product_category, quantity, product_price, product_image, product_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

// GET queries
export const getAllItemsQuery = `SELECT * FROM cart`;
export const getSingleItemQuery = `SELECT * FROM cart WHERE product_id = $1`;

// UPDATE queries
export const updateItemQuery = `UPDATE cart SET quantity = $1 WHERE product_id = $2 RETURNING *`;

// Delete queries
export const deleteSingleItemQuery = `DELETE FROM cart WHERE product_id = $1 RETURNING *`;
export const deleteAllItemsQuery = `DELETE FROM cart RETURNING *`;