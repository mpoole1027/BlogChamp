# BlogChamp

## Installation

Clone the BlogChamp repository using 

`git clone https://github.com/IzMo2000/BlogChamp.git`

In the base folder, install the necessary packages

`npm install`

Set up your .env file in the backend folder. From the base directory, go to the backend folder and create a file called `.env`. You need to define two variables (for now) in here:

`PORT=####` where #### is the port number you want to have the server run on, ex. 4000

`MONGO_URI=...` where ... is the base uri to connect to the database, contact BlogChamp team for access

So at the end your .env should look like

```
PORT=####
MONGO_URI=...
```

Then to run the application, use

`npm start`
