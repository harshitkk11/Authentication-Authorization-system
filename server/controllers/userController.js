const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// For account creation (Signup)
const Signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // check if email already exist
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    // const existingUsername = await User.findOne({username: username})

    // if username or email not exist then create new user
    if (!existingEmail) {
      const hashedpassword = bcrypt.hashSync(password); // password hashing

      // creates new user
      const user = new User({
        name,
        email: email.toLowerCase(),
        password: hashedpassword,
      });
      const userData = await user.save();

      if (userData) {
        next();
      } else {
        return res.status(200).json({ message: "Something went wrong" });
      }
    }

    // else return already exist message
    // else if (existingUsername) {
    //     return res.status(200).json({message: "Username already exist"})
    // }
    else if (existingEmail) {
      return res.status(200).json({ message: "Email already exist" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// For email verification
const verifyMail = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { is_verified: 1 } }
    );
    if (user) {
      return res.status(200).json({ message: "Email verified" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// For Login
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if email exist
    const user = await User.findOne({ email: email.toLowerCase() });

    // if email exist compare password from the stored password password
    if (user) {
      // compare password with stored hashed password
      const checkPassword = bcrypt.compareSync(password, user.password);

      // if password not matched
      if (!checkPassword) {
        return res.status(200).json({ message: "Invalid Email / Password" });
      }

      // if password matched and account is verified create web token
      if (user.is_verified === 1) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "35s",
        });

        // clearing cookies if already exist
        if (req.cookies[`${user._id}`]) {
          req.cookies[`${user._id}`] = "";
        }

        // creating cookie for web token
        res.cookie(String(user._id), token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 30),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        return res.status(200).json({ message: "Logged in successfully" });
      }

      // if user email is not verified for more than 2 days
      else if (user.is_verified === 0) {
        const dateInitial = new Date(user.createdAt);
        const dateFinal = new Date(Date.now());
        const hours = (dateFinal - dateInitial) / (1000 * 3600);

        if (hours > 72) {
          await User.deleteOne({ _id: user._id });
          return res.status(200).json({ message: "Invalid Email / Password" });
        }

        return res.status(200).json({ message: "Not verified" });
      }
    }
    // if email not exist return user not found
    else {
      return res.status(200).json({ message: "Invalid Email / Password" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// For verifing generated token
const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie; // get generated cookie
  const token = cookies.split("=")[1]; //get token from cookie

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    req.id = user.id;
  });
  next();
};

// For returning user data after token is verified
const getUser = async (req, res) => {
  const userId = req.id;

  try {
    const user = await User.findById(userId, "-password");

    if (!user) {
      return res.status(400).json({ message: "Unable to find user" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return new Error(error);
  }
};

// For generating new token after every 30 sec
const refreshToken = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];

    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }

    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "35s",
      });

      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax",
      });

      req.id = user.id;
      next();
    });
  }
  catch (error) {
    return res.status(400).json({ error });
  }
};

// For logout user
const logout = (req, res) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Authentication failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Logged out successfully" });
  });
};

// For Password Reset
const ResetMail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      next()
      return
      
    }

    return res
      .status(200)
      .json({ message: "This email address is not registered" });

  } catch (error) {
    return res.status(400).json({ error });
  }
};

const ResetPass = async (req, res) => {
  const { password, id } = req.body;

  try {
    const hashedpassword = bcrypt.hashSync(password);

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { password: hashedpassword } }
    );

    if (user) {
      return res.status(200).json({ message: "Password reset" });
    } else {
      return res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  Signup,
  verifyMail,
  Login,
  verifyToken,
  getUser,
  refreshToken,
  logout,
  ResetMail,
  ResetPass,
};
