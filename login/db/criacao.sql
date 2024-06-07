create database Usuarios;

use usuarios;


create table user (
idUser int,
username varchar(20) not null,
password varchar(8) not null	

);

insert into user( idUser, username, password) values
(1, 'Caio', '12345678');

select * from user;