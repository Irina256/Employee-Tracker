const db = require("./db/database");
const express = require("express");

const PORT = process.env.PORT || 3005;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// const apiRoutes = require("./routes/apiRoutes");
// app.use("/api", apiRoutes);

// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
  res.status(404).end();
});
// Start server after DB connection
db.connect("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
