# Projectly

A project management tool that is not at all inspired by to trello.

===Description===<br />
Projectly is a project management tool that allows users to create boards to organize tasks into groups. Users will be able to view all boards, view specefic boards, rename boards, and delete boards as well.<br/>
Users will also be able to create lists of tasks with name, content, and due date. Users will be able to view tasks, edit tasks, and remove tasks.<br/>

All Boards view example:<br/>

<img src="https://projectly-assets-bucket.s3.us-west-2.amazonaws.com/Screen+Shot+2021-08-04+at+9.24.51+AM.png" class="d-block w-100" alt="app screenshot">

Specefic Board view example:<br/>
<img src="https://projectly-assets-bucket.s3.us-west-2.amazonaws.com/Screen+Shot+2021-08-04+at+9.25.14+AM.png" class="d-block w-100" alt="app screenshot">

Task View Example:
<img src="https://projectly-assets-bucket.s3.us-west-2.amazonaws.com/Screen+Shot+2021-08-04+at+9.25.34+AM.png" class="d-block w-100" alt="app screenshot">

===Tools used===<br />
NEM STACK, RESTful routing, and CRUD functionality<br />
Runtime Enviroment: Node<br />
Server Creation: Express<br />
Authentication: bcryptjs<br />
Database and Database connection: MongoDB, Mongoose<br />
Templating Language: EJS<br />
Styling: Sass, Bootstrap<br />
Dom Manpilation: JQuery<br />

===User Story===<br />
User first comes to the site with an option to log in or register. After verification of user, you are greeted with your workspace page containing a list of your boards that can be clicked to show a display of the task on the board, an option to create a new board, and a navigation bar with the user’s name displayed as “user’s name workspace” in the middle of the navigation bar and a logout button. Upon clicking a board, user gets redirected to the boards page, containing all of the current tasks, a button to make a new task, and the previous navbar. Each task contains a header, the body content which the user fills in to describe the task, buttons for viewing, and a timer displaying how long the user has to complete the task, and a due date (also determined by the user).

===Core MVP Features===<br />
*Users are able to register for accounts and log in and out<br />
*Users can create boards to group tasks in<br />
\*Users can see all Tasks within a given board<br />

===Responsibliities of each Developer===<br />

Bryant Wong: Task Model, Task Controller, Task Views, 404 Error View, Auth Controller(inital creation), Error Redirection Middleware on each routes page, Styling on Tasks Views<br />

Leo Cucinell:

===Wireframe===

login/Register page<br/>
<img src="https://i.imgur.com/g7RvmHD.png">

Workspace/All boards page<br/>
<img src="https://i.imgur.com/D2prF37.png">

Board Creation page<br/>
<img src="https://i.imgur.com/vpvl7Qp.png">

Specefic Board page<br/>
<img src="https://i.imgur.com/MPBmTvb.png" height="400">

Specefic Task page<br/>
<img src="https://i.imgur.com/PkhyO09.png" height="400">

Edit Task page<br/>
<img src="https://i.imgur.com/6RIpL5N.png" height="400">

Task Edit page<br/>
<img src="https://i.imgur.com/s9uhW4L.png" height="400">

===User Flow===<br/>
<img src="https://i.imgur.com/vwUj9pL.png" height="400">

===Inital Entity Relantionship Diagram===<br/>
<img src="https://i.imgur.com/UyTFdJM.png" height="400">
