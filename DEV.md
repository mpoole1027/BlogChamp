# Development Help

A log containing help related to developing BlogChamp

## First Steps
1. Install [node.js](https://nodejs.org/en) if you have not already
2. Get a [MongoDB account](https://www.mongodb.com/), let me (Izaac) know when
you do this so I can give you permission to access the database
3. (optional) Install [Postman](https://www.postman.com/), not strictly necessary but it's super helpful for testing requests to the server.

## Backend
We are using an express server. Let's walk through the components of the backend, starting from the `backend` directory.

`server.js` is the main server file, it's used to connect to the db and set up the routes (more on that in a second)

`routes` directory holds files for defining routes, pretty self explanatory

`controllers` directory holds functions that are used to read and write to the database, we are using the `mongoose` package for this. Let me know if you have questions about the code itself.

`models` directory holds files for defining the structure of our data in the database, similar to how you define the schema in SQL

## Frontend
We are using a react front end. 

The main code (for now) is simply located in the `src` folder.

If I'm being real I think I can't really do a great job explaining how React works, I would highly reccomend taking some time to watch some react tutorials, such as [these](https://www.youtube.com/watch?v=j942wKiXFu8&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)
For now I just have the main `home.jsx` page displaying the events in our database.

As always please do not be afraid to reach out and ask me questions about any of the code.

## Postman
WIP I plan on adding some screenshots here showing how you can use postman to test requests. For now use [this tutorial] (https://youtu.be/Ll6knx7sFis?si=1B-_BodtzYYeGAHA&t=672)
