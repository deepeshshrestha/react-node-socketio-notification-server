## React Node SocketIO Notification Server

> This is a notification server based on socketIO. 

## Motivation

I created this project to learn how sockets work in real life situation.

## Built With

* NodeJs
* ReactJs
* SocketIO
* MySQL

## Prerequisites

You need to have MySQL running with the following database and table
 
```
CREATE DATABASE notificationserver;

USE notificationserver;

CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
role VARCHAR(10) NOT NULL,
password VARCHAR(100) NOT NULL,
)
```

Clone this repository
```
git clone git@github.com:deepeshshrestha/react-node-socketio-notification-server.git
```

## Installation

NodeJs
In parent directory.

```
npm install
```
ReactJs

```
cd app
npm install
```

## Run

First rename the local.env file to .env and set the following
```
HOST='localhost'
PORT='3000'
SESSION_SECRET='somesecret'
JWT_SECRET='somesecret'
DB_PORT='3306'
DB_USER=''
DB_PASSWORD=''
DB_NAME='notificationserver'
```
NodeJs
In parent directory.

```
npm run dev
```
ReactJs

```
cd app
npm run start
```
# Use

Go to your browser and visit [http://localhost:8080/](http://localhost:8080/)

Create an account for admin and user.

Login to different borwser using the credential and use the server.
