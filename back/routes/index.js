const express = require("express");
const app = express();
const security = require("./middlewares/security")
const validators = require("./middlewares/validateData");
app.use('/', security.verifyToken);
app.use("/", security.verifyPathAccess)
app.use('/api/v1/', require("./auth"));
app.use('/api/v1/', validators.validateData);
app.use('/api/v1/store/', require('./manage_store'));
app.use('/api/v1/product/', require('./manage_products'));
app.use('/api/v1/category/', require('./manage_categories'));
app.use('/api/v1/bill/', require('./manage_pos'));
app.use('/api/v1/files/', require('./files'));
module.exports = app;