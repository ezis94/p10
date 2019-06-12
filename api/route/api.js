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
router.get('/testCase/:id', apicontroller.get_test_case_id);
router.get('/testCasesDraft', apicontroller.get_test_case_list_draft);
router.post('/validate',apicontroller.validate_test);

// router.post(
//     "/signup",(req, res, next) =>{
//     passport.authenticate("local-signup", (err, user) => {
//         res.send('sdsd')
//     })(req, res, next);
// }
//
// );
router.post("/signup", //console.log(req);
    passport.authenticate('local-signup'), function (req, res) {
        console.log(res);
        res.json({userID:res.req.user._id, draftList:res.req.user.draftList});
       // res.send("oioi");
    }
    // res.send("dsdfaa");
);
router.post("/login", //console.log(req);
    passport.authenticate('local-login'), function (req, res) {
        console.log(res);
         res.json({userID:res.req.user._id, draftList:res.req.user.draftList});
       // res.send("oioi");
    }
    // res.send("dsdfaa");
);
// router.post(
//     "/login",
//     passport.authenticate("local-login", {
//         successRedirect: "/",
//         failureRedirect: "/login",
//         failureFlash: true
//     })
// );

router.get("/logout", apicontroller.logout);
router.post('/saveDraft',apicontroller.post_save_draft);
router.post('/testCases',apicontroller.post_save);
router.delete('/deleteTestCase',apicontroller.post_delete_test_case);

module.exports = router;