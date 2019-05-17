// _id: {
//     $oid: "5c66a4a5e7179a27eb6134ec"
// },
// Description: "This Collection will store information about TestSteps that will be taken from GN",
//     test_case_name: "@GetName",
//     created: "timestamp",
//     steps: [
//     {
//         step: "GN Step 1",
//         prefix: "GN GIVEN",
//         function: "GN Func 1"
//     },
//     {
//         step: "GN Step 2",
//         prefix: "GN AND",
//         function: "GN Func 2"
//     }
// ]
// })
const mongoose = require('mongoose');

const testStepSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    definition : String,
    variableTypes: [String]

},{collection: "TestSteps"});

module.exports = mongoose.model('TestSteps', testStepSchema);

