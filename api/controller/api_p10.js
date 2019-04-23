//Imports
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//Models
const TestCases = require('../model/testCases');
const TestSteps = require('../model/testSteps');
const TestInput = require('../model/testInput');
const Users = require('../model/users');


exports.api = function (req, res) {
    res.json({
        desciption: 'Welcome to API endpoint',
        status: 'Success',
        request: {
            type: 'GET',
            url1: 'http://localhost:4000/api/testCases',
            url2: 'http://localhost:4000/api/testSteps',
            url3: 'http://localhost:4000/api/testUsers',
            url4: 'http://localhost:4000/api/testInput'
        }
    })
};

exports.get_test_case_list = function(req, res) {
    TestCases.find(function (err, data) {
        if (err) {
            res.send(500);
            return;
        }
        return res.json(data);
    });
};

exports.get_test_step_list = function (req, res) {
    res.json({
        _id: {
            $oid: "5c66a4a5e7179a27eb6134ec"
        },
        description: "This Collection will store information about TestSteps that will be taken from GN",
        test_case_name: "@GetName",
        created: "timestamp",
        steps: [
            {
                step: "GN Step 1",
                prefix: "GN GIVEN",
                function: "GN Func 1"
            },
            {
                step: "GN Step 2",
                prefix: "GN AND",
                function: "GN Func 2"
            }
        ],
        request: {
            type: 'GET',
            url1: 'http://localhost:4000/api/testCases',
            url2: 'http://localhost:4000/api/testSteps',
            url3: 'http://localhost:4000/api/testUsers',
            url4: 'http://localhost:4000/api/testInput'
        }
    })
};

exports.get_user_list = function (req, res) {
    res.json({
        _id: {
            $oid: "5c66a1f8e7179a27eb6133bc"
        },
        description: "This Collection will store information about Users login credentials",
        email: "Marius",
        password: "1234",
        request: {
            type: 'GET',
            url1: 'http://localhost:4000/api/testCases',
            url2: 'http://localhost:4000/api/testSteps',
            url3: 'http://localhost:4000/api/testUsers',
            url4: 'http://localhost:4000/api/testInput'
        }
    })
};

exports.get_input_field = function (req, res) {
    res.json({
        search_input: 'A new test case entered in GUI',
        request: {
            type: 'GET',
            url1: 'http://localhost:4000/api/testCases',
            url2: 'http://localhost:4000/api/testSteps',
            url3: 'http://localhost:4000/api/testUsers',
            url4: 'http://localhost:4000/api/testInput'
        }
    })
};


exports.marius_test = function (req, res) {
    setTimeout(function() {
        res.send(200);
    }, 80000);
};









exports.get_test_case_lists = function (req, res) {
    const obj_json = {
        _id: {
            $oid: "5c66a844e7179a27eb6135f1"
        },
        description: "This Collection will store information about TestCases that will be provided by User from GUI",
        test_case_name: "@GetName",
        created: "timestamp",
        steps: [
            {
                step: "Step 1",
                prefix: "GIVEN",
                function: "Func 1"
            },
            {
                step: "Step 2",
                prefix: "AND",
                function: "Func 2"
            }
        ],
        request: {
            type: 'GET',
            url1: 'http://localhost:4000/api/testCases',
            url2: 'http://localhost:4000/api/testSteps',
            url3: 'http://localhost:4000/api/testUsers',
            url4: 'http://localhost:4000/api/testInput'
        }

    }
    const array = [obj_json];

    res.json(array)
};

//     exports.patient_sign_up     = (req, res, next) => {
//
//         bcryptjs.hash(req.body.password, 10, (err, hash) => {
//             if (err) {
//                 return res.status(500).json({
//                     error: err
//                 });
//             } else {
//
//                 const patientData = new Patient({
//                     _id: new mongoose.Types.ObjectId(),
//                     cpr: req.body.cpr,
//                     // password: req.body.password,
//                     password: hash
//                 });
//                 patientData
//                     .save()
//                     .then( result => {
//                         res.status(201).json({
//                             message: 'patient created'
//                         });
//                     })
//                     .catch( err => {
//                         res.status(500).json({
//                             error: err
//                         });
//                     });
//             }
//         })
//     };
//
// 	exports.patient_token       = (req, res) => {
// 	    Patient.find({ _cpr: req.body._cpr })
// 	        .exec()
// 	        .then( patient => {
//
//
// 	                const token = jsonwebtoken.sign({
//
// 	                    },
// 	                    'SecretKey',
// 	                    {
// 	                        expiresIn: "1h"
// 	                    }
// 	                );
//
// 	                return res.status(200).json({
// 	                    message: 'Auth token',
// 	                    cpr: patient[0]._cpr,
// 	                    token: token,
// 	                });
// 	            }
// 	        )
//
// 	        .catch(err => {
// 	            res.status(500).json({
// 	                error: err,
// 	                message: "error"
// 	            });
// 	        });
// 	};
//