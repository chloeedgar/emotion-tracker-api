# emotion-tracker-api
## Emotion Tracker REST API to record a user's emotion levels and allow them to visualise their emotions over time

This is the server-side REST API for module CSC7084 Web development at Queen's University Belfast, an application which provides RESTful endpoints to allow a user to record their emotion levels over time. The REST API connects to an MySQL database to store the emotion snapshot and user data.

## Installation
To run this application locally, follow these steps:

1. Clone the repository to your local machine:

```git clone https://github.com/chloeedgar/emotion-tracker-api.git```

2. Navigate to the project directory:

```cd emotion-tracker-api```

4. Install dependencies using npm:

```npm install```

5. Start the development server:

```nodemon app.js```

Open your browser and navigate to http://localhost:3001 to view the application.

### Technologies Used
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for hashing passwords
- [cors](https://www.npmjs.com/package/cors) - Middleware for enabling CORS (Cross-Origin Resource Sharing)
- [dotenv](https://www.npmjs.com/package/dotenv) - Module for loading environment variables from a .env file
- [ejs](https://ejs.co/) - Embedded JavaScript templating
- [Express](https://expressjs.com/) - Web application framework for Node.js
- [express-session](https://www.npmjs.com/package/express-session) - Session middleware for Express.js
- [express-validator](https://express-validator.github.io/docs/) - Middleware for input validation in Express.js
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for Node.js
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with prepared statements support