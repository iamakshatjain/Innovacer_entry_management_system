# **Innovacer Entry Mangement System**
![enter image description here](https://lh3.googleusercontent.com/LJ-Tr8SznI_9TnQFFSWpvoVh2rTTnSDGp_5mWCDgbhbLfxBzrRk60azlK-qCfx1dhbOlddnnH5WE)


The software is an assignment submission for [Innovacer SDE summer 2020 internship](https://summergeeks.in/).

This is a web based entry management system made with ReactJS on the front end and a ExpressJS based API on the backend with MongoDB as database.
#### Demonstration
- Youtube Video : 
- React app (Client Side) : [http://innovems.herokuapp.com/](http://innovems.herokuapp.com/)
- API (Server Side) : [https://innov-api.herokuapp.com/](https://innov-api.herokuapp.com/)

### Assumptions
 -  The software is being made to be used in a screen at the reception desk of the organisation and not in mobile devices of visitors. 
	 -	Hence he must have no access to data other than his own.
	-	Hence there is also no need for authentication.
	 -	The user Interface must be as user friendly and simple as possible.
 -  As the software belongs to the organisation. It is assumed that we have a list of hosts/employees of the company. 
	 -	The visitor is allowed to check in if the host details exists.
	 -	The check for the above is coded in `routes > visitor_routes.js` from line 35-51, but commented **for evaluation puposes** .
	 -	The hosts can be added by the use of host routes described below, if uncommented.
 -  Assuming that the software is being made for a particular region only. Hence the address_visited is hardcoded for now as `Innovacer Offices, Gautam Buddha Nagar, India` 

### Handeled Test Cases
Note :  All the errors are shown to the user in the form of a prompt window like,


![Error Prompt](https://lh3.googleusercontent.com/pKdIe6z-AkmDOXd3OU1RlnOrE2VMZK07gCn3U4Jicl0ZAM-dCa3VuMa-aXU0avB9PvB3VuDZs1k "Error Prompt")


- For all the forms in the software, all the fields are manadatory.
- Network issues are checked upon for the API calls at the front end.
	#### Visitor Form
- Email for the host and the visitor must not be same.
- Host must be registered before visitor can enter his details into the form ( coded and commented - `visitor_routes.js` - line 35 - 51)
- Already existing visitors are not allowed to register.
- Distinction on the basis of email. No two users with same email can enter the premesis at the same time.

	#### Checkout Form
- Checkout only the users that are checked in and have the email in the visitors list.
- Checkout on the basis of email, since it would be unique

### Folder Structure


![enter image description here](https://lh3.googleusercontent.com/jC1OD4iuJ0NLZcfL_MrZjtdJQCB1LbiAMS1GQ7KJC9L0coH9aICzqFJT5Au4QLJt98EwH5um8sk)


![enter image description here](https://lh3.googleusercontent.com/OIl3CoBJqHao8xDQeMjXXyXnWt1KIHFDIp9HH37hQWeRM3IG-0eRPIRDOVo_PLusEogMelT5LlY)

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
- [Mailjet API](https://www.nexmo.com/) ( Email )
- [Nexmo](https://www.twilio.com/) ( SMS )
- Heroku

## Problem Statement
https://summergeeks.in/static/assignments/summergeeks%202020%20-%20SDE%20Assignment.pdf

Creating an entry management system for the visitors coming to the organisation.

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
Before both client and server side setup,
Create a `.env` file with data in the following format

    DATABASEURL= #Create an account on mongo atlas, create cluster and then paste connection string here
    
    LDATABASEURL=mongodb://localhost/innovacer #mongodb must be installed and mongod running
    
    PORT=#port that you want to run API on 
    
    #sign up on mailjet and get both these to be able to send emails
    MJ_APIKEY_PUBLIC=#public api key
    
    MJ_APIKEY_PRIVATE=#private api key
    
    #sign in to a nexmo account
	NEXMO_APIKEY=#nexmo api key,from dashboard
	
	NEXMO_APISECRET=#nexmo api secret,from dashboard
	
	NEXMO_FROM_NO=#nexmo registered account phone number

The format of the `.env` file must comply with that of `.env.default` file.
There files are meant to protect the private keys and database connection strings.

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
	In the client > components > visitor_form.jsx file change the link `https://innov-api.herokuapp.com/api/visitor/add` to `http://localhost:5000/api/visitor/add`

	-	Similarly In the client > components > checkou_form.jsx file change the link `https://innov-api.herokuapp.com/api/visitor/checkout` to `http://localhost:5000/api/visitor/checkout` 

You are now able to run the app on your local machine,
For any further assistance email at developer.akshatjain@gmail.com

## Usage/Walkthrough

### Server Side (API)

### Visitor Model
		{
		    name:  String, 
			phone:  String,
			email:  String,
		    host_name:  String, 
		    host_email:  String,
		    host_phone:  String,
		    add_visited:  String,
		    status : String,
		    check_in: String,
		    check_out: String,
		    created_at: String
		}
#### Visitor Routes
- https://innov-api.herokuapp.com/api/visitor/add
	- **Post request**
	- To create a visitor
	- This provides the checkin time and changes the status of the visitor to `CHECKEDIN`
	- This route also mails and sends sms to the host
	- Expected Input :  (as body - application/x-www-_form_-_urlencoded_)

		    {
		    name:  String, 
			phone:  String,
			email:  String,
		    host_name:  String, 
		    host_email:  String,
		    host_phone:  String,
		    add_visited:  String,
		  }
  - Output :
	 - if visitor is already present
	  

		    {error : "VISITORFOUND"}

	- if visitor can't be created due to some database issue
	  

		    {error : "CANTCREATEUSER"}

	- if network issue
		  

			 {error : "NETWORKISSUE"}
	- if some other error
		  

			 {error : <error string>}
	- otherwise, correct created visitor
		  

			{
		    name:  String, 
			phone:  String,
			email:  String,
		    host_name:  String, 
		    host_email:  String,
		    host_phone:  String,
		    add_visited:  String,
		    status : String,
		    check_in: String,
		    check_out: String,
		    created_at: String
		  }

- https://innov-api.herokuapp.com/api/visitor/checkout
	- **Put request**
	- To checkout the visitor
	- This provides the checkout time and changes the status of the visitor to `CHECKEDOUT`
	- This route also mails to the visitor
	- Expected Input :  (as query string parameters)

		    {
		    email : String
		  }
  - Output :
	 - if no visitor is found
	  

		    {error : "NOVISITORFOUND"}

	- if some other error
		  

			 {error : <error string>}
	- otherwise, correct output
		  

			{
		    status : "CHECKEDOUT"
		  }

### Host Model
		{
		    name:  String, 
			phone:  String,
			email:  String,
		    created_at: String
		}
#### Host Routes
- https://innov-api.herokuapp.com/api/host/add
	- **Post request**
	- **Use after uncommenting from visitor_routes.js line 35-51**
	- To create a host
	- Expected Input :  (as body - application/x-www-_form_-_urlencoded_)

		    {
		    name:  String, 
			phone:  String,
			email:  String,
		  }
  - Output :
	- if some error
		  

			 {error : <error string>}
	- otherwise, correct created host
		  

			{
		    name:  String, 
			phone:  String,
			email:  String,
		    created_at: String
		  }

### Client Side ( React app )

#### http://innovems.herokuapp.com/
- **Welcome Page** : This is the home page to the application. You have two choices, either to register as a new visitor or checkout.

![enter image description here](https://lh3.googleusercontent.com/F7P35qDyM0n6GTSBUfzj6PIA8fYL-g57omT-pRRhJHCSKGMK5cw-QxKrCFvWeYN6W7FDLHASZyY)

#### http://innovems.herokuapp.com/visitor
If you clicked on the **New Visitor** button,
- **Visitor Form** : You would use this when you enter the premesis. Fill up your information in the visitor details form and your host details in the host details form. Then click on check in button. You also have options at the bottom to go to home or to the checkout page. 
**Note :**
	-	Host's phone number must be a registered **indian** phone number.
	-	Host's phone number must be whitelisted on nexmo account.
	-	Nexmo from number (sender) must be a registered account on nexmo.
	-	Expect a litte latency while sending and recieving emails and SMS.


![enter image description here](https://lh3.googleusercontent.com/P9rURzq81jaJup7crgpZP-5E2YbBFViN4dW4juBojAuGQFyTUY3NUjVSno7QoVQ6eqYHHC_qpns)


Host would recieve an email and an SMS as a notification for the guest waiting for him.	 

Sample email is attached below,

![enter image description here](https://lh3.googleusercontent.com/ULKoaXOz-P4UAC9g84JOna3-dG1JQBgO0DtP732oFUWzvVMn6SnyLDC6XgFipjZMbRZBcfynu5M)


Sample SMS is attached below,


![enter image description here](https://lh3.googleusercontent.com/oVqW6gpOYS65GHhieobGjXnXa-7mV7uZGo3bugsxqcZQdV8jCADJI8v0YPuMlbx9OflPxahswrEZ "sms")


#### http://innovems.herokuapp.com/checkout
If you cliked on the **Checkout** button,
- **Checkout page** : You would use this when you exit the premesis. You need to provide with your email Id with which you registered while entering the premesis.
You have options at the bottom to go to home or the visitor registration page at the bottom

![enter image description here](https://lh3.googleusercontent.com/lBcaq3Bh5RgnRZLHUBNJuTZTFqFir376GvXj-ovLBGB01kzc1kjSSAJxaKvH4Xu11VHxnxUol8k)


Visitor would get an email containing all the details about his visit to the offices.
Sample email is attached below,


![enter image description here](https://lh3.googleusercontent.com/_NO-kpwCghYD2KIJ1kcAIVJAr31PStTVIOt9sHoWXgdI_1bszCWgHA9v0IhjW0ogEFeyulLgNtU)


## Submission By

- Name : Akshat Jain
- Email : developer.akshatjain@gmail.com
- Phone : +91-8979297928
- LinkedIn : [https://www.linkedin.com/in/akshat-jain-88434b152/](https://www.linkedin.com/in/akshat-jain-88434b152/)
- GitHub : [https://github.com/iamakshatjain](https://github.com/iamakshatjain)

For Innovacer summer 2020 SDE Internship.