const mongoose = require('mongoose');

const testCaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    test_case_name : String,
    created : { type : Date, default: Date.now() },
    steps: [{
        id: { type : Number, required: false, unique: false},
        step: { type: String },
        prefix: { type: String },
    }]

},{collection: "TestCases"});

module.exports = mongoose.model('TestCases', testCaseSchema);


// const mongoose = require('mongoose');
//
// const DoctorInfoSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     _cpr: { type: Number, required: false, unique: true},
//     password: { type: String, required: true},
//     // name: { type: String},
//     // name: { type: mongoose.Schema.Types.ObjectId, ref: 'doctorID', required: true},
//
// });
//
// module.exports = mongoose.model('DoctorInfo', DoctorInfoSchema);