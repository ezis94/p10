// res.json({
//     _id: {
//         $oid: "5c66a1f8e7179a27eb6133bc"
//     },
//     Description: "This Collection will store information about Users login credentials",
//     email: "Marius",
//     password: "1234"
// })
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var userSchema = mongoose.Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    draftList:[
        {
            id: String,
            name: String,
            step:[
                {
                    step:String,
                    prefix:String,
                    state:String,
                    variable:[
                        {
                            type:String,
                            value:String
                        }
                    ]

                }
            ]
        }
    ]

},{collection: "TTTMusers"});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);
