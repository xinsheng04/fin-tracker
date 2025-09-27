import 'dotenv/config';
import mysql from 'mysql2/promise';
import { transform } from 'typescript';
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
const schema = "CREATE DATABASE IF NOT EXISTS finTracker;"

const tableUsers = `
  CREATE TABLE IF NOT EXISTS users (
    email varchar(50) NOT NULL UNIQUE,
    fname varchar(25) NOT NULL,
    lname varchar(25) NOT NULL,
    password varchar(255) NOT NULL
  );
`

const tableCard = `
  CREATE TABLE IF NOT EXISTS cards (
    cardNo int NOT NULL UNIQUE, 
    email varchar(50) NOT NULL,
    bankName varchar(50) NOT NULL,
    cardBalance DECIMAL(10,2) NOT NULL, 
    CONSTRAINT fk_card_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`

const tableBudgeting = `
  CREATE TABLE IF NOT EXISTS budgeting (
    budgetId INT NOT NULL UNIQUE, 
    email varchar(50) NOT NULL, 
    title varchar(30) NOT NULL,
    trackDateFrom DATE NOT NULL, 
    CONSTRAINT fk_budget_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`

const tableBudgetItem = `
  CREATE TABLE IF NOT EXISTS budgetItem (
    budgetItemId INT NOT NULL UNIQUE,
    budgetId INT NOT NULL, 
    category varchar(50) NOT NULL, 
    limitAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (budgetItemId),
    CONSTRAINT fk_budgetId FOREIGN KEY (budgetId) REFERENCES budgeting(budgetId) ON DELETE CASCADE
  );
`

const tableTransaction = `
  CREATE TABLE IF NOT EXISTS transaction (
    transactionId INT NOT NULL UNIQUE,
    cardNo INT NOT NULL UNIQUE,
    amountTransfered decimal(10,2) NOT NULL,
    typeOfTransfer varChar(50) NOT NULL,
    dateTransfer DATE NOT NULL, 
    comment varChar(255), 
    PRIMARY KEY (transactionId),
    CONSTRAINT fk_cardNo FOREIGN KEY (cardNo) REFERENCES cards(cardNo) ON DELETE CASCADE
  );
`

const tableAsli = `
  CREATE TABLE IF NOT EXISTS AssetLiability(
    AsLiId INT NOT NULL UNIQUE, 
    email varchar(50) NOT NULL, 
    title varchar(50) NOT NULL, 
    value int NOT NULL,
    description varchat(50),
    recentDate DATE, 
    type Varchar(50) NOT NULL,
    PRIMARY KEY (AsLiId),
    CONSTRAINT fk_asli_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
  );
`

export async function initDB() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    await connection.query(schema);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`);
    await connection.query(`USE \`${config.db.database}\`;`);
    await connection.query(tableUsers);
    await connection.query(tableCard);
    await connection.query(tableBudgeting);
    await connection.query(tableBudgetItem);
    await connection.query(tableTransaction);



    console.log("Database ensured:", config.db.database);
    await connection.end();
  } catch (err) {
    console.error("Error initializing schema", err);
    throw err;
  }
}



