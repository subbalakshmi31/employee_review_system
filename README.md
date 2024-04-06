# Employee-Review-System
A full stack application for reviewing employees.

### Description

A full stack app in which the admin can assign the employees to review each other on the basic of their work. The admin has special privilege to make any other employee
as the admin. Admin can also add new employee, and can also assign the reviewer and recipient. The admin can see the current employees list. Admin can also update and remove the employees. 

### Tech Stack

Node.js, Express.js, Mongodb , EJS , JavaScript , Html, css

### How to setup the project on local system

  1. Clone this project
  2. Start by installing npm if you don't have it already.
  3. Navigate to Project Directory.

After reaching the project directory you have to run the following the command.
   ```` 
        npm install 
        npm start || nodemon index.js
   ````

### Features

  1. HomePage / Admin View
  2. Home page / Employee view
  3. Sign-Up
  4. Sign-In
  5. Assign Work
  6. Employee Section

### Folder Structure

```
Employee Review System
    |
    |               |--->css
    |--->assets---->|--->images
    |             
    |
    |               |--->mongoose.js
    |--->config---->|--->noty-middleware.js
    |               |--->passport-local-strategy.js
    |
    |                  |-->employee_controller.js
    |--->controllers-->|-->home_controller.js
    |                  |-->review_controller.js
    |                  |-->user_controller.js
    |
    |               |-->assignedReview.js
    |--->models---->|-->myReview.js
    |               |-->user.js
    |
    |              
    |               |-->employeeSection.js
    |--->routes---->|-->index.js
    |               |-->review.js
    |               |-->users.js
    |
    |              |--->assignWork.ejs
    |              |--->employeeSection.ejs
    |              |--->header.ejs
    |--->views---->|--->home.ejs
    |              |--->layout.ejs
    |              |--->user_sign_in.ejs
    |              |--->user_sign_up.ejs
    |
    |-->index.js
    |-->package-lock.json
    |-->package.json