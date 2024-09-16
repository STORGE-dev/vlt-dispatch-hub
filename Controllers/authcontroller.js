import User from "../models/usersModel.js"
import bcrypt from "bcrypt";


export const LoginHandler=async(req, res) =>{

  try {
    const { userid, password } = req.body;
    console.log(userid, password);

    const user = await User.findOne({ userid: userid });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({ error: "Wrong password" });
    }


    return res.status(200).json({
      message: "Log in successful",
      Logged: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export const RegisterHandler=async(req, res) =>{
 

  try {
    // Parse the request body
    const { userid, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ userid });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      userid,
      password: hashedPassword,
    });

    // Save the new user in the database
    await newUser.save();

    // Return success response
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
