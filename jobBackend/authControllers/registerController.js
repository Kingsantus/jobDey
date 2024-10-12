const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../mailutils/sendMailToVerify')
const { CustomError } = require('../middlewares/error');
const countries = require('../utils/countires');

const registerContoller = async (req, res, next) => {
    // destructuring information from the request body
    const { username, email, password, confirmPassword, firstName, lastName, country} = req.body;
    try {
        // check if any input is empty and throw error
        if ( !username || !firstName || !lastName || !email || !country || !password || !confirmPassword ) {
            throw new CustomError("Invalid Credential", 400);
        }
         
         // check if user didnt start with string
         // check if user used anything apart from number, underscore,hyphen and string
         if (!/^[a-zA-Z]+[a-zA-Z0-9-_]*$/.test(username)){
             throw new CustomError("Invalid Username", 400);
         }
         // check if user added invalid email protoype ensuring the .com or .co.uk is accepted
         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
             throw new CustomError("Invalid Email", 400);
         }
         // check if password and confirmPassword is not the same and throw error
         if (password !== confirmPassword) {
             throw new CustomError("Passwords do not match", 400);
         }
         // check if the length of password is less than 8 char
         if (password.length < 8){
             throw new CustomError("password must be upto 8 character", 400);
         }
         // check to ensure uppercase, lowercase, number and special character is in the password
         if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
             throw new CustomError("Password should contain upper&lower case, num, special char", 400);
         }
         // check if firstName is less than 2 and allow only string and space inbetween character
         if (firstName < 2 || !/^[a-zA-Z\s]+$/.test(firstName)) {
             throw new CustomError("First name should be more than 2 and only string", 400);
         }

         // check if lastName is less than 2 and allow only string and space inbetween character
         if (lastName < 2 || !/^[a-zA-Z\s]+$/.test(lastName)) {
            throw new CustomError("Last name should be more than 2 and only string", 400);
        }

        // check if country is ""
        if (country === "" || !countries.includes(country.toLowerCase())) {
            throw new CustomError("Please Choose a country", 400);
        }
 
         // check if email or username exist in database
         const existingUser=await User.findOne({ $or: [{username}, {email}] });
         if (existingUser) {
             // if they exist throw error
             if (existingUser.isVerified) {
                 throw new CustomError("User already exists!", 400);
             } else {
                 // if existing user is not verified delete the account and register again
                 if (!existingUser.isVerified){
                     await existingUser.deleteOne();
                 }
             }
         } else {
             // Proceed with the registration process if user does not exist
         
             // use bcrypt for hashing
             const salt = await bcrypt.genSalt(10);
             // hash the password
             const hashedPassword = await bcrypt.hash(password, salt);
             // add the data to the database
             const newUser=new User({
                 username,
                 firstName,
                 lastName,
                 email,
                 password:hashedPassword,
                 country
             });
            // Create a new user and generate verification token
            const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '20m' });
            // save the information
            const savedUser=await newUser.save();
            // send email to user
            await sendVerificationEmail(savedUser.email, verificationToken);
 
            // remove email, phoneNumber, password
            // display other information 
            res.status(201).json({message:"Created Successfully"});
         }    
    } catch(error) {
        next(error);
    }
};

module.exports = registerContoller;