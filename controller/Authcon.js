const bcrypt = require('bcryptjs');
const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const existuser = await User.findOne({ email: email });
    if (existuser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone
    });

    const savedUser = await newUser.save();

    // Generate a JWT token
    jwt.sign({ id: savedUser._id,

      username:savedUser.username,
      email:savedUser.email,
      phone:savedUser.phone,
      password:savedUser.password

     }, '1234567', (err, token) => {
      if (err) {
        console.error("Error generating token:", err); // Log the error
        return res.status(500).json({ message: "Error generating token" });
      }

      // Respond with the saved user and token after the token is generated
      res.status(201).json({ savedUser, token });
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id,
      username:savedUser.username,
      email:savedUser.email
     }, '1234567');
    res.status(200).json({ token });
    console.log("Token:", token);
    
  } catch (error) {
    
  }
}
const userHandler = async (req, res) => {
  try {
    const userdata = req.user; // Assuming you have middleware to attach user data to the request

    if (!userdata) {
      return res.status(400).json({ message: "User data is missing" });
    }

    // Assuming you want to send the user data as a response
    res.status(200).json({
      message: "User data retrieved successfully",
      user: userdata,
    });
    
    // You can also perform other operations with userdata here
    // For example, fetch additional user details from the database if needed

  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = { register , login ,userHandler};
