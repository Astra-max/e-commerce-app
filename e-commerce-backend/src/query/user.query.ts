// save new user to database

export const newUser = `INSERT INTO users (user_name, first_name, second_name, email, phone_number, id_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`;   
export const getUserByEmail = `SELECT * FROM users WHERE email=$1`; 
export const getAllUsersQuery = `SELECT user_id, user_name, first_name, second_name, email, phone_number FROM users`;
export const getUserByIdQuery = `SELECT user_id, user_name, first_name, second_name, email, phone_number FROM users WHERE user_id=$1`;
export const updateUserById = `UPDATE users SET user_name=$1, first_name=$2, second_name=$3, email=$4, phone_number=$5 WHERE user_id=$6 RETURNING user_id, user_name, first_name, second_name, email, phone_number`;
export const deleteUserById = `DELETE FROM users WHERE user_id=$1 RETURNING user_id, user_name, first_name, second_name, email, phone_number`;