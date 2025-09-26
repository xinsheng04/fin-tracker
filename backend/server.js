import express from "express";
import cors from 'cors';

const app = express();


app.get('/api', (req, res) => {
  res.json({ "users": ["userOne", "userTwo"] });
});

app.listen(5000, () => {
  console.log('server started on port 5000');
});
