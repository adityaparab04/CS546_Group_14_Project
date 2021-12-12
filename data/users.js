const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const reviews = mongoCollections.reviews;
const comments = mongoCollections.comments;
const bcrypt = require('bcryptjs');

const discussionCollection = require('./discussion');
let { ObjectId } = require('mongodb');

// Function to validate email with atleast 5 characters in the name
function validateEmail(email) {
    const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    if (email.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

//Checked
const convertObject = (id) => {
    if (!id) throw 'Id parameter must be supplied';
    if (typeof id !== 'string') throw "Id must be a string";
    try {
        let parsedId = ObjectId(id);
        return parsedId;
    }
    catch (e) {
        throw "Id not supported"
    }
};
//Checked
async function createUser(usernameLower, age, password, emailLower,picture) {
    username = usernameLower.toLowerCase().trim();
    email = emailLower.toLowerCase();
    if (!username) throw "You must provide a User Name"
    if (username == undefined) throw "User Name not defined"
    if (username == null || username.length == 0) throw "User Name cannot be null"
    if (username.length < 5 || username.length > 25) throw "Enter a User Name with more than 4 and less than 15 characters"
    if (!username.match(/^[a-z0-9_@\.]+$/)) throw "Enter a User Name only with valid characters"
    if (!email) throw "You must provide a Email"
    if (email == undefined) throw "Email not defined"
    if (email == null || email.length == 0) throw "Email cannot be null"
    if (!validateEmail(email)) throw "Invalid Email id"
    if (!password) throw "You must provide a password"
    if (password == null || password.length == 0) throw "Password cannot be null"
    if (password === undefined) throw "password not defined"
    if (password.length < 6 || password.length > 20) throw "enter a password with more than 6 characters or less than 20"
    if (!password.match(/^(?!\s*$).+/)) throw "Enter a valid password"
    if (age == null || age == undefined || !age) throw "Invalid age parameters"
    if (typeof age !== 'number') throw "Age should be a number"
    if (age < 1 || age > 100) throw "Invalid age"
    // Checking if already exists in database
    const allUsers = await getAllUsers();
    allUsers.forEach(user => {
        if (user.username == username) throw 'This username is already taken.';
        if (user.email == email) throw 'Email already exists in database, please enter correct email address';
    })

    const hashPassword = bcrypt.hashSync(password, 16);
    const newUser = {
        username: username,
        password: hashPassword,
        age: age,
        email: email,
        picture:picture,
        reviews: []
    };
    const userCreate = await users();
    const insertInfo = await userCreate.insertOne(newUser);
    if (insertInfo.insertedCount === 0) { throw "Cannot add that user" }
    const id = insertInfo.insertedId;
    const user = await getUserById(id.toString());
    user._id = user._id.toString();
    return user;
}
//Checked
async function getUserById(id) {
    if (!id) throw 'You should provide an ID'
    if (id.length == 0) throw "Id is blank"
    if (id == null) throw 'Id cannot be null'
    if (id == undefined) throw 'Id should be defined'
    if (typeof id != 'string') throw 'Id is not string'
    const user = await users();
    var newId = convertObject(id);
    const getUser = await user.findOne({ _id: newId });
    getUser._id = getUser._id.toString();
    if (getUser == null || getUser == undefined) throw 'No User with that id';
    return getUser;
}

async function getUserByUsername(username) {
    if (!username) throw 'You should provide a username'
    if (username.length == 0) throw "username is blank"
    if (username == null) throw 'username cannot be null'
    if (username == undefined) throw 'username should be defined'
    if (typeof username != 'string') throw 'username is not string'
    const user = await users();
    const getUser = await user.findOne({ username });
    getUser._id = getUser._id.toString();
    if (getUser == null || getUser == undefined) throw 'No User with that id';
    return getUser;
}
//Checked
async function getAllUsers() {
    const userget = await users();
    const getAllUser = await userget.find({}).toArray();
    for (var i = 0; i < getAllUser.length; i++) {
        getAllUser[i]._id = getAllUser[i]._id.toString();
    }
    if (getAllUser == null || getAllUser == undefined) throw 'User does not exists!';
    return getAllUser;
}

//Checked
async function deleteUser(_id) {
    if (_id === undefined || _id === null) { throw "Id is undefined" }
    if (_id.length === 0) { throw "Id is blank" }
    if (typeof _id != 'string') throw 'Id should be string'
    if (!ObjectId.isValid(_id)) { throw "Enter a valid object id" }
    const userCollection = await users(); 
    await removeReviewByaUserId(_id);
    const deletionInfo = await userCollection.deleteOne({ "_id": ObjectId(_id) });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete user with id of ${_id}`;
    }
    await discussionCollection.removeDiscussionByUserId(_id);
    await removeCommentsByUserId(_id);
    return true;
}

//remove review by user Id
async function removeReviewByaUserId(userId) {
    if (!userId || typeof userId !== 'string') throw `provide a review Id`
    let parseId = ObjectId(userId);
    let reviewCollection = await reviews();
    let userCollection = await users();
    let userInfo = await userCollection.findOne({_id: parseId})
    let userReviewArr = userInfo.reviews;
    if(userReviewArr.length !== 0){
        let deletionInfo = await reviewCollection.deleteMany({ userId: userId });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete the review with id of ${userId}`;
        }
        return `removed all reviews for ${userId}`;
    }
    else{
        return `no reviews for ${userId}`
    }
}

//remove comments by user Id
async function removeCommentsByUserId(userId) {
    if (!userId || typeof userId !== 'string') throw `provide a review Id`
    let commentCollection = await comments();

    let deletionInfo = await commentCollection.deleteMany({ userId: userId });

    if (deletionInfo.deletedCount === 0) {
        //throw `Could not delete the band with id of ${userId}`;
        return `no comments for ${userId}`
    }

    return `removed all comments for ${userId}`;
}

//Checking user for while login
async function checkUser(usernameLower, password, emailLower) {
    username = usernameLower.toLowerCase();
    email = emailLower.toLowerCase();
    if (!username) throw "You must provide a username to check"
    if (username == null) throw "Username cannot be null"
    if (username == undefined) throw "username not defined"
    if (username.length < 5 || username.length > 25) throw "Enter a User Name with more than 4 and less than 15 characters"
    if (!username.match(/^[a-z0-9_@\.]+$/)) throw "Enter a User Name only with valid characters"

    if (!password) throw "You must provide a password"
    if (password == null) throw "Password cannot be null"
    if (password == undefined) throw "password not defined"
    if (password.length < 6 || password.length > 20) throw "enter a password with more than 6 characters or less than 20"
    if (!password.match(/^(?!\s*$).+/)) throw "Enter a valid password"

    if (email == null) throw "Email cannot be null"
    if (email == undefined) throw "Email not defined"
    if (!email) throw "Provide an email to check"
    if (email == null || email.length == 0) throw "Email cannot be null"
    if (!validateEmail(email)) throw "Invalid Email id"

    const user = await users();
    const getuser = await user.find({}).toArray();
    for (var i = 0; i < getuser.length; i++) {
        if ((getuser[i].username == username) &&
            (getuser[i].email == email) &&
            bcrypt.compareSync(password, getuser[i].password))
            return true;
    }
    if (!username || !password || !email) throw 'Either the username or password or email is invalid';
    return false;
}

async function checkloginUser(usernameLower, password) {
    username = usernameLower.toLowerCase();
    if (!username) throw "You must provide a username to check"
    if (username == null) throw "Username cannot be null"
    if (username == undefined) throw "username not defined"
    if (username.length < 5 || username.length > 25) throw "Enter a User Name with more than 4 and less than 15 characters"
    if (!username.match(/^[a-z0-9_@\.]+$/)) throw "Enter a User Name only with valid characters"

    if (!password) throw "You must provide a password"
    if (password == null) throw "Password cannot be null"
    if (password == undefined) throw "password not defined"
    if (password.length < 6 || password.length > 20) throw "enter a password with more than 6 characters or less than 20"
    if (!password.match(/^(?!\s*$).+/)) throw "Enter a valid password"


    const user = await users();
    const getuser = await user.find({}).toArray();
    for (var i = 0; i < getuser.length; i++) {
        if ((getuser[i].username == username) &&
            bcrypt.compareSync(password, getuser[i].password))
            return getuser[i];
    }
    if (!username || !password) throw 'Either the username or password or email is invalid';
    return null;
}

async function updateUserNamePassword(_id, userName, password) {
    if (_id == null || _id === undefined) throw "Id is null or undefined"
    if (!_id) throw "You must provide an id"

    iusername = usernameLower.toLowerCase();
    email = emailLower.toLowerCase();
    if (!username) throw "You must provide a username to check"
    if (username == null) throw "Username cannot be null"
    if (username == undefined) throw "username not defined"
    if (username.length < 5 || username.length > 25) throw "Enter a User Name with more than 4 and less than 15 characters"
    if (!username.match(/^[a-z0-9_@\.]+$/)) throw "Enter a User Name only with valid characters"

    if (!password) throw "You must provide a password"
    if (password == null) throw "Password cannot be null"
    if (password == undefined) throw "password not defined"
    if (password.length < 6 || password.length > 20) throw "enter a password with more than 6 characters or less than 20"
    if (!password.match(/^(?!\s*$).+/)) throw "Enter a valid password"

    const allUsers = await getAllUsers();
    allUsers.forEach(user => {
        if (user.username == username) throw 'This username is already taken. Please enter a unique userName';
    })

    const id = convertObject(_id);
    const user = await getUserById(id.toString());
    const { _id: blah, ...rest } = user;
    const updateUser = { ...rest, userName, password }
    const userUpdate = await users();
    await userUpdate.updateOne({ _id: id }, { $set: updateUser });
    if (userUpdate.modifiedCount == 0)
        throw 'Update failed';
    const result = await getUserById(id.toString());
    return result;
}

async function updateUser(id, newUserData) {
    try {
        if (newUserData.password) {
            newUserData.password = bcrypt.hashSync(newUserData.password, 16);
        }
        const userUpdate = await users();
        let uu = await userUpdate.updateOne({ "_id": ObjectId(id) }, { $set: newUserData });
        return true;
    }
    catch (error) {
        return false;
    }

}
async function addReviewToUser(userId, reviewId) {
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
        { _id: ObjectId(userId) },
        { $addToSet: { reviews: reviewId } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
    return await getUserById(userId);
}

async function removeReviewFromUser(userId, reviewId) {
    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
        { _id: ObjectId(userId) },
        { $pull: { reviews: reviewId } }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
    return await getUserById(userId);
}

async function handleSocialData(socialData) {
    let username = socialData.nickname;
    let password = `${socialData.given_name}_@!`;
    let user = await checkUser(username, password, socialData.email);
    if (!user) {
        user = await createUser(username, 25, password, socialData.email,socialData.picture);
    }
    else {
        user = await getUserByUsername(username);
    }
    return user;
}


module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    deleteUser,
    checkUser,
    checkloginUser,
    updateUserNamePassword,
    addReviewToUser,
    removeReviewFromUser,
    removeReviewByaUserId,
    removeCommentsByUserId,
    updateUser,
    handleSocialData
}