const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
let reqPath = path.join(__dirname, '../');

app.listen(port, () => {
   console.log(`The app server is running on port: ${port}`);
});
app.use(express.static(reqPath +'client/dist/'));
app.use(express.json());
app.get("/", (req, res) => {
   res.sendFile('/');
});