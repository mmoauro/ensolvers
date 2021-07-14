CREATE TABLE IF NOT EXISTS folders (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id)
)AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS tasks (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    done boolean NOT NULL,
    id_folder int NULL, -- It can be null if is not assigned to any folder.
    PRIMARY KEY (id),
    CONSTRAINT FK_FOLDER FOREIGN KEY (id_folder) REFERENCES folders(id) ON DELETE CASCADE ON UPDATE CASCADE
)AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(60) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UQ_EMAIL UNIQUE (email)
)AUTO_INCREMENT = 1;

INSERT INTO users(name, email, password) VALUES ('Test', 'test@gmail.com', '$2b$10$UY8SDRx1tlTXMFUuwrGT3.JNg7ZUW.1fKsr.xUEWO7xNL/ON/0mD.');