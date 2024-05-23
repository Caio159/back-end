create database login;

use login;


create table user (
idUser int,
username varchar(20) not null,
password varchar(8) not null	

);

insert into user( idUser, username, password) values
(1, 'Miguel', '11223344');

	select * from user;
