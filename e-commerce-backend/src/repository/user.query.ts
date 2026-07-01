// save new user to database

export const newUser = `INSERT INTO users (user_name, first_name, second_name, email, phone_number, id_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`;   
export const getUserByEmail = `SELECT * FROM users WHERE email=$1`; 