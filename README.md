# UpDog
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  ## Description
  UpDog is a webapp for users to look at other dogs in the area with a motivation to be able to easily find other dogs nearby in order for pet owners to be able to schedule and set up playdates for their dogs.
  ## Technologies used
  bcrypt, connect-session-sequelize, dotenv, express, express-handlebars, express-session, mysql2, sequelize, Google maps javascript & places APIs, multer (new technology used).
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ![homepage](https://raw.githubusercontent.com/kevin-ivy/facebook-but-dogs/develop/utils/images/homepage.PNG)
  ![userprofile](https://raw.githubusercontent.com/kevin-ivy/facebook-but-dogs/develop/utils/images/mydogs.PNG)
  ![dogprofile](https://raw.githubusercontent.com/kevin-ivy/facebook-but-dogs/develop/utils/images/dogprofiles.PNG)
  ![nearby](https://raw.githubusercontent.com/kevin-ivy/facebook-but-dogs/develop/utils/images/nearby.png)
  
  ## Installation
  To install necessary dependencies, run the following command in your terminal:
  ```
  npm install 
  ```
  ## Usage
   * Be sure to create the .env file in your root directory with your MySQL user/password information.  
  ```
  DB_NAME='dogbook_db'
  DB_USER='root'
  DB_PW='your password'  
  ```
  * To initiate the MySQL command line, type: `mysql -u root -p` in your command line and then your MySQL password.
  * To execute the `schema.sql` file, type into the MySQL command line: `source db/schema.sql`
  * To exit the MySQL command line, type `quit;` or `exit;`
  * Once updated, run `npm start` in your terminal and visit http://localhost:3001/ to get started!
  
  Or use the live link [here](https://whats-up-dog.herokuapp.com)!

  ## License
  Licensed under MIT.
  Apache License, Version 2.0 (Google Maps)
  ## Credits
  Application created with the help of Saul Huerta, Kevin Ivy, Katelyn Lopes, and Courtney Stanton.
  ## Tests
  There are currently no tests for this application.
  ## Questions
  If you have any questions about the repo, open an issue or contact us directly.
  * [GitHub - Saul Huerta](https://github.com/saul10huerta)
  * [GitHub - Kevin Ivy](https://github.com/kevin-ivy)
  * [GitHub - Katelyn Lopes](https://github.com/Kaynalem)
  * [GitHub - Courtney Stanton](https://github.com/clstanton)
  
