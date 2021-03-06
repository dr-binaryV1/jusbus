'use strict';

//let bcrypt = require('bcrypt');
let Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

// TODO change datatime of start and end to NUMBER
let timetableSchema = new Schema({
    moduleCode: {type: String, required: true},
    moduleName: {type: String, required: true},
    sessionType: {type: String, required: true},
    start: {type: String, required: true},
    end: {type: String, required: true},
    day: {type: String, required: true},
    classroom: {type: String, required: true},
    tutor: {type: String},
    status: {type: String, required: true}
});

let userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    phone: {type: String, unique: true},
    activated: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

// authenticate input against database documents
userSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function (error, user) {
            if (error) {
                return callback(error);
            } else if ( !user ) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }

            if(password === user.password){
              return callback(null, user);
            }
            else{
              return callback();
            }

            // bcrypt.compare(password, user.password , function(error, result) {
            //     if (result === true) {
            //         return callback(null, user);
            //     } else {
            //         return callback();
            //     }
            // })
        });
};
//
// userSchema.pre('save', function (next) {
//     let user = this;
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });

let classroomSchema = new Schema({
    name: String
});

let categorySchema = new Schema({
    name: String
});

let facultySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    classrooms: [classroomSchema],
    icon: {type: String, required: true}
});

function createSchema(){
    return new Schema({
        name: {type: String, required: true, unique: true},
        description: String,
        openTime: {type: Number, required: true},
        closeTime: {type:Number, required: true},
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true},
        icon: {type: String, required: true}
    });
}

let bankSchema = createSchema();
let atmSchema = createSchema();
let foodSchema = createSchema();
let buildingSchema = createSchema();
let clubSchema  = createSchema();

let universitySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    address: {type: String, required: true},
    tel: {type: String, required: true},
    openTime: {type: Number, required: true},
    closeTime: {type: Number, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    clubs: [clubSchema],
    faculties: [facultySchema],
    universityBuildings: [buildingSchema],
    banks: [bankSchema],
    atms: [atmSchema],
    foods: [foodSchema],
    icon: {type: String, required: true}
});

let rentalSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    tenant_gender: {type: String, required: true},
    num_occupancy: {type: Number, required: true},
    vacancy: {type: Number, required: true},
    utilities: [{type: String}],
    price: {type: Number, required: true},
    status: {type: String, required: true, default: "Available"},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    icon: {type: String, required: true}
});

let grocerySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    address: {type: String, required: true},
    openHours: {type: Number, required: true},
    closeHours: {type: Number, required: true},
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    icon: {type: String, required: true}
});

let sizeVariationsSchema = new Schema({
    size: {type: String, required: true},
    price: {type: Number, required: true}
});

let menuItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    variations: [sizeVariationsSchema],
    picture: [{type: String, required: true}]
});

let commentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

let restaurantSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    address: {type: String, required: true},
    tel: {type: String, required: true},
    menu: [menuItemSchema],
    comments: [commentSchema],
    longitude: {type: Number},
    latitude: {type: Number},
    openTime: {type: Number, required: true},
    closeTime: {type: Number, required: true},
    rating: {type: Number, default: 5},
    icon: {type: String}
});

classroomSchema.method('update', function(updates, callback){
    Object.assign(this, updates);
    this.parent().parent().save(callback);
});

let entertainmentSchema = new Schema({
    name: {type: String, required: true, unique: true},
    category:{type: String, required: true},
    admission: {type: String, default: 0},
    address:{type: String, required: true},
    time: {type: String, required: true},
    date: {type: String, default: Date.now()},
    tel: {type: String, required: true},
    ticket_sold_at: {type: String, default: "Contact for Info"},
    poster: {type: String, default: "default.jpg"}
});

let User = Mongoose.model('User', userSchema);
let Rental = Mongoose.model('Rental', rentalSchema);
let Grocery = Mongoose.model('Grocery', grocerySchema);
let Building = Mongoose.model('Building', buildingSchema);
let Category = Mongoose.model('Category', categorySchema);
let Restaurant = Mongoose.model('Restaurant', restaurantSchema);
let University = Mongoose.model('University', universitySchema);
let Entertainment = Mongoose.model('Entertainment', entertainmentSchema);

module.exports.User = User;
module.exports.Rental = Rental;
module.exports.Grocery = Grocery;
module.exports.Building = Building;
module.exports.Category = Category;
module.exports.Restaurant = Restaurant;
module.exports.University = University;
module.exports.Entertainment = Entertainment;
