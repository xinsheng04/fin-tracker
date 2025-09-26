import express from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
const app = express();

app.use(cors());

app.use("/api",userRoutes);

//app.use("budgetPage", {route})
app.listen(5000, () => {
  console.log('server started on port 5000');
});
