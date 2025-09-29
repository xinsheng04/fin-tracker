import express from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import budgetRoutes from './routes/budgetingRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import { initDB } from './config.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",userRoutes);
app.use("/api",budgetRoutes);
app.use("/api",transactionRoutes);

// init DB then start server
(async () => {
  try {
    await initDB(); // creates DB if missing
    app.listen(5000, () => console.log('server started on port 5000'));
  } catch (err) {
    console.error('Failed to init DB, not starting server', err);
    process.exit(1);
  }
})();

//app.use("budgetPage", {route})
app.listen(5000, () => {
  console.log('server started on port 5000');
});
