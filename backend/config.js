import 'dotenv/config';
import mysql from 'mysql2/promise';
export const config = {
  db: {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: 'fintracker',
    port: 3306
  }
};

let pool;

export async function createPool() {
  if (!pool) {
    pool = mysql.createPool(config.db);
  }
  return pool;
}

// connection config used to create DB (connect without database first)
const connectionConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port
};

// SQL: create database only 
const schema = `CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`;

const tableUsers = `
  CREATE TABLE IF NOT EXISTS users (
    email varchar(50) PRIMARY KEY,
    fname varchar(25) NOT NULL,
    lname varchar(25) NOT NULL,
    password varchar(255) NOT NULL
  );
`

const tableCard = `
  CREATE TABLE IF NOT EXISTS cards (
    cardNo varchar(16) PRIMARY KEY, 
    email varchar(50) NOT NULL,
    bankName varchar(50) NOT NULL,
    cardBalance DECIMAL(10,2) NOT NULL, 
    CONSTRAINT fk_card_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`

const tableBudgeting = `
  CREATE TABLE IF NOT EXISTS budgeting (
    budgetId INT AUTO_INCREMENT PRIMARY KEY, 
    email varchar(50) NOT NULL, 
    title varchar(30) NOT NULL,
    trackDateFrom DATE NOT NULL, 
    CONSTRAINT fk_budget_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`

const tableBudgetItem = `
  CREATE TABLE IF NOT EXISTS budgetItem (
    budgetItemId INT AUTO_INCREMENT PRIMARY KEY,
    budgetId INT NOT NULL, 
    category varchar(50) NOT NULL, 
    limitAmount DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_budgetId FOREIGN KEY (budgetId) REFERENCES budgeting(budgetId) ON DELETE CASCADE
  );
`

const tableTransaction = `
  CREATE TABLE IF NOT EXISTS transaction (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    cardNo varchar(16) NOT NULL,
    amountTransfered decimal(10,2) NOT NULL,
    category varChar(50) NOT NULL,
    typeOfTransfer varChar(50) NOT NULL,
    dateTransfer DATE NOT NULL, 
    comment varChar(255), 
    CONSTRAINT fk_cardNo FOREIGN KEY (cardNo) REFERENCES cards(cardNo) ON DELETE CASCADE
  );
`

const tableAsli = `
  CREATE TABLE IF NOT EXISTS AssetLiability(
    AsLiId INT AUTO_INCREMENT PRIMARY KEY, 
    email varchar(50) NOT NULL, 
    title varchar(50) NOT NULL, 
    value int NOT NULL,
    description varchar(50),
    acquireDate DATE, 
    type Varchar(50) NOT NULL,
    category Varchar(50) NOT NULL,
    CONSTRAINT fk_asli_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`

const deleteValidTransactionTrigger = `
  DROP TRIGGER IF EXISTS ValidTransaction;
`;

const validTransactionTrigger = `
  CREATE TRIGGER ValidTransaction
  BEFORE UPDATE ON cards
  FOR EACH ROW
  BEGIN
    IF NEW.cardBalance < 0 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Trigger: Card balance cannot be negative.';
    END IF;
  END;
`;

export async function initDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(schema); // Create database if it doesn't exist
    await connection.query(`USE \`${config.db.database}\`;`); // Switch to the database
    await connection.query(tableUsers);
    await connection.query(tableCard);
    await connection.query(tableBudgeting);
    await connection.query(tableBudgetItem);
    await connection.query(tableTransaction);
    await connection.query(tableAsli);
    await connection.query(deleteValidTransactionTrigger);
    await connection.query(validTransactionTrigger);
    console.log("Database ensured:", config.db.database);
    await connection.end();
  } catch (err) {
    console.error("Warning: Failed to initialize database schema. Please check your database configuration.", err);
    // Optionally, you can retry or continue running the app without crashing
  }
}