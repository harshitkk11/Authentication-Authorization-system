# Authentication-Authorization-system

## Overview
This project is a web application designed to manage user authentication and authorization. It includes functionalities for user login, signup, and password reset. The system is built using React, Node.js, MongoDB, and various JavaScript libraries.

## Table of Contents
- Features
- Technologies Used
- Installation
- Usage
- Contributing

### Features
- **User Signup:** New users can create an account.
- **User Login:** Existing users can log in with their credentials.
- **Password Reset:** Users can reset their password if they forget it.
- **Security:** Implements secure authentication and authorization practices.
- **Responsive Design:** User interface adapts to various screen sizes.

### Technologies Used
- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Libraries:**
  - bcrypt for hashing passwords
  - jsonwebtoken for managing JSON Web Tokens
  - nodemailer for sending emails (password reset)
  - mongoose for MongoDB object modeling
 
### Installation
1. Clone the repository:
```
git clone https://github.com/harshitkk11/Authentication-Authorization-system.git
cd Authentication-Authorization-system
```
2. Install frontend dependencies:
```
cd client
npm install
```
3. Install backend dependencies:
```
cd server
npm install
```
4. Set up environment variables:

Create a .env file in the server directory with the following contents:
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret_key
ORIGIN_VALUE=http://localhost:5173
EMAIL=email_to_send_verification_email
PASSWORD=email_password
```

### Usage
1. Start the backend server:
```
cd server
npm start
```
2. Start the frontend development server:
```
cd client
npm start
```
3. Access the application:
Open your browser and navigate to http://localhost:3000

### Contributing
Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.
