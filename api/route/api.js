const express = require ('express');
const router = express.Router();
var passport = require("passport");

const apicontroller = require('../controller/api_p10');
const patientCheckAuth = require('../middleware/jwt-token-auth');

//URL_BASE:    localhost:3000/
//PATH_BASE:   api/
//Router_app:  /.. (etc)

router.get('/', apicontroller.api);
router.get('/testCases', apicontroller.get_test_case_list);
router.post('/validate',apicontroller.validate_test);
router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    })
);
router.post(
    "/login",
    passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })
);

router.post('/saveDraft',apicontroller.post_save_draft);
router.post('/save',apicontroller.post_save);
router.post('/deleteTestCase',apicontroller.post_delete_test_case);

module.exports = router;
