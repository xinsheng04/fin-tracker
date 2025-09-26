import 'dotenv/config';
import mysql from 'mysql2/promise';
export const config = {
  db: {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: 'finTracker',
    port: 3306
  }
}

// connection config used to create DB (connect without database first)
const connectionConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port
};

// SQL: create database only 
const schema = "CREATE DATABASE IF NOT EXISTS finTracker;";


export async function initDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(schema);
    console.log("Database ensured:", config.db.database);
    await connection.end();
  } catch (err) {
    console.error("Error initializing schema", err);
    throw err;
  }
}



