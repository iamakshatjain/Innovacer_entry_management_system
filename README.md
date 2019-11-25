# **Innovacer Entry Mangement System**

The application is a [SDE summer internship](https://summergeeks.in/) assignment submission.

This is a web based entry management system made with ReactJS on the front end and a ExpressJS based API on the backend,
### Assumptions
### Handeled Test Cases
### Folder Structure

Youtube Video : 
Client Side : [http://innovems.herokuapp.com/](http://innovems.herokuapp.com/)
API (Server Side) : [https://innov-api.herokuapp.com/](https://innov-api.herokuapp.com/)

## Tech Stack
### Front End
 - ReactJS
 - Semantic-UI
 - JSX
 - React-Router
 - Axios
### Back End
- Node JS
- Express JS
- MongoDB [(Mongo Atlas)](https://www.mongodb.com/cloud/atlas)
- [Mailjet API](https://www.mailjet.com/) ( Email )
- 

## Problem Statement
https://summergeeks.in/static/assignments/summergeeks%202020%20-%20SDE%20Assignment.pdf

Creating an entry management system for the visitors coming to the organisation.

## Visuals

## Installation and Setup
Requirements : 
Installed softwares,
 1. [MongoDB](https://www.mongodb.com/)
 2. [NodeJs](https://nodejs.org/en/download/)
 3. [NPM](http://npmjs.org)
 4. [Git](https://git-scm.com/)

In any terminal run the commands, 
(According to Linux)

Cloning with git:
```bash
git clone https://github.com/iamakshatjain/Innovacer_entry_management_system.git
```
This would clone the project to your local computer.
Change the directory (cd) to Innovacer_entry_management_system.

```bash
cd Innovacer_entry_management_system
```
To setup the **API of the project**
Install the required packages for the API,
```bash
npm install
```
then,
```bash
npm start
```
This would start the node server for the **API of the project,**

For the front end,
In another terminal window go to the same directory as of the project then,
Change the directory (cd) to **client**

```bash
cd client
```
To Install the required packages for the Front End,
```bash
npm install
```
Start the react server
```bash
npm start
```
Note : 
If there is an issue of MongoDB while starting the project.
This is an issue with mongo unable to access cloud database.
1. Startup `mongod` in terminal.
2. Change the mongoDB connection url to `mongodb://localhost/innovacer`  in the routes>visitor_routes.js file.
3. Since we are setting up the API locally,

	-	Change the links for API use in the app.
	In the client>components>visitor_form.jsx file change the link `https://innov-api.herokuapp.com/api/visitor/add` to `http://localhost:5000/api/visitor/add`

	-	Similarly In the client>components>checkou_form.jsx file change the link `https://innov-api.herokuapp.com/api/visitor/checkout` to `http://localhost:5000/api/visitor/checkout` 

You are now able to run the app on your local machine,
For any further assistance email at developer.akshatjain@gmail.com

## Usage/Walkthrough

- **Welcome Page** : This is the home page to the application. You have two choices, either to register as a new visitor or checkout.

If you clicked on the **New Visitor** button,
- **Visitor Form** : You would use this when you enter the premesis. Fill up your information in the visitor details form and your host details in the host details form. Then click on check in button. You also have options at the bottom to go to home or to the checkout page. 
Host would recieve an email and an SMS as a notification for the guest waiting for him.	 
Sample email is attached below,
<img01>

If you cliked on the **Checkout** button,
- **Checkout page** : You would use this when you exit the premesis. You need to provide with your email Id with which you registered while entering the premesis.
You have options at the bottom to go to home or the visitor registration page at the bottom
Visitor would get an email containing all the details about his visit to the offices.
Sample email is attached below,
<img02>

## API Endpoints

## Submission By

Name : Akshat Jain
Email : developer.akshatjain@gmail.com
Phone : +91-8979297928
LinkedIn : [https://www.linkedin.com/in/akshat-jain-88434b152/](https://www.linkedin.com/in/akshat-jain-88434b152/)
GitHub : [https://github.com/iamakshatjain](https://github.com/iamakshatjain)