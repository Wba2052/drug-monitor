const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// Render view
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// API
route.post('/api/drugs', controller.validateDrug, controller.create);
route.get('/api/drugs', controller.find);
route.put('/api/drugs/:id', controller.validateDrug, controller.update);
route.delete('/api/drugs/:id', controller.delete);
route.post('/api/drugs/purchase/:id', controller.purchase);

module.exports = route;
