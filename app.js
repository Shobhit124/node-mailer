const express = require('express')
const mailer = require('./index')
const app = express()
app.use(express.json());
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.post('/', mailer)


app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
}); 