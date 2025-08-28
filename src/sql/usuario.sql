create database veterinaria_pipos;
CREATE USER 'johan_delgado'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON veterinaria_pipos.* TO 'johan_delgado'@'localhost';
FLUSH PRIVILEGES;
