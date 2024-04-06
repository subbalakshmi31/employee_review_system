const express = require('express');
const passport = require('passport');

const router = express.Router();

const employeeSection = require('../controllers/employee_controller');

router.get('/home',passport.restrictAccessPages, employeeSection.home);
router.post('/update/:id', passport.checkAuthentication, employeeSection.update);
router.get('/delete/:id',employeeSection.delete);
router.get('/makeadmin/:id',employeeSection.makeAdmin);
router.get('/removeadmin/:id',employeeSection.removeAdmin);

module.exports = router;