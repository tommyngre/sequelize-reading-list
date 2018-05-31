drop database if exists list_db;

create database list_db;

use list_db;

create table list (
  id integer(10) not null auto_increment,
  item_name varchar(255) not null,
  is_complete boolean,

  primary key(id)
);