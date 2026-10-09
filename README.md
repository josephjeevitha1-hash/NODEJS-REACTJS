# NODEJS-REACTJS
Source code and learning materials for students..

Resource to learn html css javascript
Refer https://www.w3schools.com/
or https://developer.mozilla.org/en-US/

WEEK-1

Build a responsive web application for shopping cart with registration, login, catalog and cart pages using CSS3 features, flex and grid.
    Project Structure:
1.	login.html -Shows login page.
2.	Register.html- Shows Registration page.
3.	Catalog.html-Shows Product page
4.	Cart.html-Shows product added to cart
5.	styles.css - CSS file for styling the web pages.
6.	Image folder
   
To check responsiveness of website
1.	Press F12 or Right-click → Inspect. 
2.	Click the Toggle Device Toolbar icon (📱💻) or press Ctrl + Shift + M. 
3.	Choose a device from the top, such as: 
o	iPhone 14 Pro 
o	Samsung Galaxy S20 
o	iPad Air 
o	Laptop 
4.	Drag the edges of the screen to test different widths. 
If your webpage adjusts automatically without horizontal scrolling, it is responsive.

WEEK-2 

Make the above web application responsive web application using Bootstrap framework.
	Procedure:
Integrating the Bootstrap framework into your web application is an excellent way to ensure responsiveness and enhance the UI with minimal effort.
	Bootstrap provides a wide range of CSS classes designed for responsive layouts, components, and interactive elements, which can significantly streamline the development process.
	Below, we will go through adapting the previous project to utilize Bootstrap, focusing on the registration page as an example.
	we can apply similar principles to the login, catalog, and cart pages.
First, include Bootstrap in your HTML files. You can do this by adding the Bootstrap CDN links in the <head> section of your HTML documents. This example uses Bootstrap 5, but you should check for the latest version available.
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
Add this before the closing </body> tag:
<Bootstrap Bundle JS (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>




WEEK-3
Use JavaScript for doing client – side validation of the pages implemented in experiment 1 and experiment 2.
Description:To add client-side validation using JavaScript to the pages from the previous experiments we'll focus on validating user input in forms such as Login & Registration.
WEEK-4:
Explore the features of ES6 like arrow functions, callbacks, promises, async/await. Implement an application for reading the weather information from openweathermap.org and display the information in the form of a graph on the web page.
Step1:Install Node.js
          Step2:Create a folder weatherapp
          Step3:Install the Required npm Packages 
           Command 1
           npm init -y
           Command 2
           npm install express axios
      Folder is created with 
      WeatherApp/
│
├── node_modules/
├── package.json
├── package-lock.json
create server.js file 
Create folder public inside it create
1.index.html
2.style.css
3.script.js
Folder Structure
<img width="480" height="556" alt="image" src="https://github.com/user-attachments/assets/85822b56-c0fc-4ae2-9c4b-d84b3a5197d6" />
To run node server.js 
Generate API KEY FROM https://openweathermap.org/ and paste in place of "YOUR API KEY";
WEEK-6 Develop a Node.js application to read, write and manipulate JSON files using FS module.
Create two files server.js and students.json and start performing operations of fs module which is stored in students.json file.
WEEK-5 Develop a Node.js application that connects with the database(MYSQL) and perform CRUD operations
Install required packages in terminal
npm init -y
npm install express mysql2
Download Download MySQL Workbench for Windows
https://dev.mysql.com/downloads/workbench/
choose Windows (x86, 64-bit), MSI Installer
After installation 
Open MySQL Workbench
Connect to database and set password use that password in server.js to connect to sql database
Step 1: Create the database
In MySQL Workbench, click SQL + / New SQL Tab.

CREATE DATABASE college;
Click the ⚡ Execute button.
Then select the database:
USE college;
________________________________________
Step 2: Create the students table

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    course VARCHAR(50)
);
Click ⚡ Execute.
Now your table is created.
You can check it with:
SELECT * FROM students;
Initially, it will be empty.
Then run the code in vs code using node server.js 
and execute CRUD operations by selecting the choices one by one and stored in college database.


WEEK7-Develop a Node.js and Express-based controller that connects the shopping Cart web application developed in Experiment 1 with the database created in experiment 5.
Terminal insatll packages
npm init -y
npm install express mysql2

MySQL Database:
CREATE DATABASE shopping_cart

USE shopping_cart;
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL
);
Run in terminal using node server.js
WEEK9-Create a custom server using http module and explore the other modules of Node JS like OS, path, event.
Output:node server.js
the terminal output will be:
System Information:
Platform: 
Architecture: 
CPU Cores: 
Total Memory: 
Free Memory: 

Joined Path:


Server running at http://localhost:3000

Custom Event Triggered: { message: 'Hello from custom event!' }

When you open http://localhost:3000 in the browser, the output is:
Hello, World!

WEEK10-Develop an express web application that can interact with REST API to perform CRUD operations on student data. (Use Postman)
Packages
npm init -y
npm install express
Download Postman
https://www.postman.com/downloads/
Steps to download
3.	Click Download for Windows (64-bit).
4.	Enter email id download link will be sent to mail
5.	And download 
Step 2:Install postman
It ask whether free account or sign in or you're using the Lightweight API Client.
For your Express CRUD lab, you do not need to sign in. The Lightweight API Client is enough to send GET, POST, PUT, and DELETE requests.

In REST APIs:
•	POST = Create (Add) 
•	GET = Read 
•	PUT = Update 
•	DELETE = Delete
Open postman and perform 4 rest api 
We can add,update,delete,read student data in student management system
1.GET-Read student
GET:
http://localhost:3000/api/students
 Output:take screenshot 
2.POST-Add student
POST
http://localhost:3000/api/students
Select Body → raw → JSON and enter:
Ex:{
  "name": "Jenny",
  "age": 20,
  "course": "cse"
}
 Output:take screenshot 
3.PUT — Update Student
PUT
http://localhost:3000/api/students/1
Select Body → raw → JSON:
Ex:{
  "name": "Jenny",
  "age": 19,
  "course": "ds"
}
 Output: take screenshot 
4.DELETE — Delete Student
DELETE
http://localhost:3000/api/students/1
  Output:take screenshot 

Week11-For the above application create authorized end points using JWT (JSON Web Token).
First, install the jsonwebtoken package:
npm init -y
npm install express jsonwebtoken
Output:node server.js
Server running on http://localhost:3000
Open Postman to test login and the protected student endpoints.
Step 1: Login and generate a JWT token
POST
http://localhost:3000/login
In Postman:
1.	Select the POST method.
2.	Enter http://localhost:3000/login.
3.	Click Body → raw → JSON.
{
  "username": "admin",
  "password": "1234"
}
4.Click Send.
 Output:take screenshot 
Copy the complete token value, without the quotation marks.

Step 2: View students using the token
GET
http://localhost:3000/students
1.	Select GET.
2.	Enter http://localhost:3000/students.
3.	Open the Authorization tab.
4.	Select Bearer Token from the Type dropdown.
5.	Paste the token copied in Step 1 into the Token field.
6.	Click Send.
     Output:take screenshot 
Step 3: Add a student
POST
http://localhost:3000/students
1.	Select POST and enter the URL.
2.	Under Authorization → Bearer Token, paste your token.
3.	Under Body → raw → JSON, enter:
{
  "id": 3,
  "name": "Arun",
  "age": 22
}
4. Click Send.
 Output:take screenshot 
Step 4: Update a student
PUT
http://localhost:3000/students/1
1.	Select PUT.
2.	Enter the URL above.
3.	Include the same token under Authorization → Bearer Token.
4.	Select Body → raw → JSON.
5.	Enter:
{
  "name": "Anu",
  "age": 21
}
6. Click Send.
    Output:take screenshot 
Step 5: Delete a student
DELETE
http://localhost:3000/students/1
1.	Select DELETE.
2.	Enter http://localhost:3000/students/1.
3.	Include the token under Authorization → Bearer Token.
4.	Click Send.
 Output:take screenshot 

Step 6: Test authorization without a token
This is the most important test for your JWT assignment.
1.	Send GET http://localhost:3000/students.
2.	Remove the token from the Authorization tab, or select No Auth.
3.	Click Send.
   Output:take screenshot 
If you provide an invalid token, the expected response is:token invalid
 Output:take screenshot 











