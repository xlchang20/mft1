var express = require('express');
var router = express.Router();
var ctrlFirms = require('../controllers/firms.controllers.js');
var ctrlCriterias = require('../controllers/criterias.controllers.js');
var ctrlUsers = require('../controllers/users.controller.js');

// The 'router' functionality will allow admin to get and post json data 
// through the url.
// To view all records in database.
router
    // Get function
    .route('/firms')
    .get(ctrlFirms.firmsGetAll)

// This router is use to extract a record based on the record's _id.
// http://localhost:3000/api/firms/xxxxxx
router
    .route('/firms/:firmId')
    .get(ctrlFirms.firmsGetOne)

/*
// This router is use to add new records to the database.
// http://localhost:3000/api/firms/new
router
    .route('/firms/new')
    .post(ctrlFirms.firmsAddOne)
*/

// CRITERIA_NOTES routes
router
    // Get function
    .route('/firms/:firmId/FIRM_NAME')
    .get(ctrlCriterias.criteriasGetAll)

// This router is use to extract a record based on the record's _id.
// http://localhost:3000/api/firms/xxxxxx
router
    .route('/firms/:firmId/FIRM_NAME/:FIRM_NAME_ID')
    .get(ctrlCriterias.criteriasGetOne);

// Authentication
router    
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;