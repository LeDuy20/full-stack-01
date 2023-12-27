import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fullstack",
});

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'fullstack', Promise: bluebird});

  const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
};
const getListUser = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fullstack",
  });
  
  let users = [];
  try {
    const [rows, fields] = await connection.execute("SELECT * FROM users");
    return rows
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fullstack",
  });
  try {
    const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
    return rows
  } catch (error) {
    console.log(error);
  }
}
const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fullstack",
  });
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
    return rows
  } catch (error) {
    console.log(error);
  }
}

const updateUser = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fullstack",
  });

  try {
    const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
    return rows
  } catch (error) {
    console.log(error);
  }
}
module.exports = { createNewUser, getListUser ,deleteUser,getUserById, updateUser};
