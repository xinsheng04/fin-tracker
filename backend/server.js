import express from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import budgetRoutes from './routes/budgetingRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import assetLiabilityRoutes from './routes/assetLiabilityRoutes.js'
import { initDB } from './config.js';
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", budgetRoutes);
app.use("/api", transactionRoutes);
app.use("/api", assetLiabilityRoutes);

(async () => {
  try {
    // ensure DB + tables exist before loading controllers that create pools
    await initDB();
    // const pool = await createPool();

    // import routes AFTER DB init so controllers can create pools safely
    const { default: budgetRoutes } = await import('./routes/budgetingRoutes.js');
    const { default: transactionRoutes } = await import('./routes/transactionRoutes.js');
    const { default: userRoutes } = await import('./routes/userRoutes.js');
    const { default: walletRoutes } = await import('./routes/walletRoute.js');

    app.use("/api", budgetRoutes);
    app.use("/api", transactionRoutes);
    app.use("/api", userRoutes);
    app.use("/api", walletRoutes);
    app.use("/api", budgetRoutes);
    app.use("/api", transactionRoutes);
    app.use("/api", assetLiabilityRoutes);

    app.listen(5000, () => console.log("server started on port 5000"));
  } catch (err) {
    console.error("Failed to init DB, not starting server", err);
    process.exit(1);
  }
})();


