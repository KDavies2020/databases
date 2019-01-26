DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  text MEDIUMTEXT NOT NULL,
  roomsid int,
  userid int,
  createdAt TIMESTAMP,
  FOREIGN KEY (roomsid) REFERENCES rooms(id),
  FOREIGN KEY (userid) REFERENCES users(id),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS room_user;

CREATE TABLE room_user (
  roomsid int,
  userid int,
  FOREIGN KEY (roomsid) REFERENCES rooms(id),
  FOREIGN KEY (userid) REFERENCES users(id)
);


