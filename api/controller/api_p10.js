//Imports
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const fs = require("fs");
const cmd = require('node-cmd');
const uid = require('uid');
//Models
const TestCases = require('../model/testCases');
const TestSteps = require('../model/testSteps');
const TestInput = require('../model/testInput');
const Users = require('../model/users');


// exports.api = function (req, res) {
//    res.send(req.user);
// };
exports.api = function (req, res) {
    Users.findOne({ "username": req.body.username }, function(err, user) {
        console.log(user);
        return res.json(user);

    });
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

exports.get_test_case_id = function(req, res) {
    TestCases.findOne({_id: req.params.id}, function (err, data) {
        if (err) {
            res.send(500);
            return;
        }
        return res.json(data);
    });
};
exports.get_test_case_list_draft = function(req, res) {
    var _id = req.query._id
    var id = '5cfff253f3a46c29e48813f0';
    console.log(req);
    Users.find({'_id': _id}, function (err, data) {
        if (err) {
            res.send(404);
            return;
        }

        // console.log("mao data:" + data)
        return res.json(data);
        // return res.status(200).json(data);
    });
};



exports.post_save_draft = function(req, res) {
    Users.findOne({ "_id": req.body.id }, function(err, user) {
        if (err) {
            res.send(500);
            return;
        }
        console.log(user);
        if (req.body.tcID) {
            for (var i = 0; i < user.draftList.length; i++) {
                if (user.draftList[i]._id==req.body.tcID)
                {

                    user.draftList[i].name=req.body.name;
                    user.draftList[i].step=req.body.step;
                }
            }
        }
        else
        {
            //Add the StepList depends on the namings
            user.draftList = user.draftList.concat({name:req.body.name, step:req.body.step});

        }
        user.save(function (err) {
            if (err) throw err;
            return res.send("successfully saved");
        });

    });
};


exports.post_delete_test_case = function(req, res) {
    if (req.query.userID)
    {
        Users.findOne({ "_id": req.query.userID }, function(err, user) {
            if (err) {
                res.send(500);
                return;
            }


            for (var i = 0; i < user.draftList.length; i++) {
                if (user.draftList[i]._id==req.query.tcID)
                {
                    user.draftList.splice(i, 1)
                }
            }

            user.save(function (err) {
                if (err) throw err;
                return res.send("successfully saved");
            });

        });
    }
    else{
        // TestCases.findOne({ "_id": req.body.userID }, function(err, obj) {
        //     obj.remove(_id);
        // });

        // const id = req.params.productId;
        // Patient.remove({_id: id})
        console.log(req);
        TestCases.findOneAndRemove({ "_id": req.query._id }, function(err, obj) {
            // obj.remove()
            if (err) throw err;
            console.log(" document deleted" + req.query._id);
            return res.send("successfully deleted: " + obj);
        });

    }

};

exports.post_save = function(req, res) {
    TestCases.findOne({ "test_case_name": req.body.name }, function(err, TC) {
        if (err) {
            res.send(500);
            return;
        }
        console.log(req.body);

        if (req.body.tcID) {

            if (TC._id==req.body.tcID)
            {
                console.log(TC);

                TC.test_case_name=req.body.name;
                for(var i=0;i<req.body.steps;i++)
                    TC.steps.push(req.body.steps[i]);
            }

            TC.save(function (err) {
                if (err) throw err;
                return res.send("successfully saved");
            });
        }
        else
        {

            if (TC)
            {
                res.send("such test case already exists");
                return;
            }
            var _TC = new TestCases();
            _TC.test_case_name=req.body.name;

            _TC.steps=req.body.steps;

            _TC.save(function (err) {
                if (err) throw err;
                return res.send("successfully saved");
            });
            //Add the StepList depends on the namings

        }


    });
};

exports.validate_test = function(req, res) {
    TestSteps.find( function(err, steps) {
        if (err) {
            res.send(500);
            return;
        }
        var RNNfile='"question1","question2",\n';
        var result=[];
        var stepTxt=steps;
        // var userS= ["USer is in somevvhere","Volume set to 9","lole"];
        //var DBS= ["somevvhere","Set Volume to number","bole"];
        for (var j=0;j<req.body.testSteps.length;j++)
        {
            for (var i=0;i<stepTxt.length;i++)
            {
                // var _steps=JSON.parse(steps);
                for (var o=0; o<stepTxt[i].variableTypes.length;o++)
                {
                    stepTxt[i].definition=stepTxt[i].definition.replace("'(."+o+"*)'",stepTxt[i].variableTypes[o] );

                }

                RNNfile +=req.body.testSteps[j].testStepName + ", " + stepTxt[i].definition + "\n";
            }
        }
        //Add the StepList depends on the namings
        fs.writeFile("C:\\Users\\Marius\\Downloads\\Siamese-LSTM-text-similarity-master\\Siamese-LSTM-text-similarity-master\\data\\test.csv", RNNfile, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
            cmd.get(
                'C:\\Users\\Marius\\Downloads\\lstm-siamese-text-similarity-master\\lstm-siamese-text-similarity-master\\venv\\Scripts\\python.exe ' +
                'C:\\Users\\Marius\\Downloads\\Siamese-LSTM-text-similarity-master\\Siamese-LSTM-text-similarity-master\\predict.py',
                function (err, data, stderr) {
                    console.log(data);

                    var lines = data.split('\n');
                    var StepArr=[];
                    for (var i = 0; i < lines.length; i++)
                    {
                        if (lines[i].includes("distance"))
                        {
                            lines.splice(0, i);
                            break;

                        }
                    }
                    lines.splice(lines.length-1, lines.length);
                    console.log(lines.length);

                    for (var i = 0; i < lines.length; i++)
                    {
                        console.log(parseFloat(lines[i].substring(11,lines[i].length)));
                        if(parseFloat(lines[i].substring(11,lines[i].length))>=0.5)
                        {
                            console.log(i%steps.length);
                            console.log(steps[i%steps.length].definition);
                            StepArr = StepArr.concat({id:uid(10), step:steps[i%steps.length].definition,variables:steps[i%steps.length].variableTypes,simVal:parseFloat(lines[i].substring(11,lines[i].length))});
                            console.log(req.body.testSteps[Math.floor(i/steps.length)]);
                        }
                        console.log((i+1)%steps.length);
                        if (((i+1)%steps.length===0))
                        {
                            result = result.concat({id:uid(10),testStepName:req.body.testSteps
                                    [Math.floor(i/steps.length)].testStepName, prefixName:req.body.testSteps[Math.floor(i/steps.length)].prefixName
                                    , steps:StepArr});
                            console.log(result);

                            StepArr=[];
                        }
                    }
                    res.json({"result":result, "name":req.body.name});
                }
            );
        });
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



exports.get_user_info = function(req, res) {
    TestCases.find(function (err, data) {
        if (err) {
            res.send(500);
            return;
        }
        return res.json(data);
    });
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

exports.logout = function (req, res) {
    req.logout();
    res.send("logout");
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
