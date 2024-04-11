-- enum types
create type role_name as enum ('ADMIN', 'USER');

create type order_status as enum ('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED');


-- create tables
create table roles (
  id serial primary key,
  name role_name not null default 'USER',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table users (
  id serial primary key,
  name varchar(255) null,
  email varchar(255) not null,
  password varchar(255) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  role_id integer not null references roles(id) on delete cascade on update cascade
);

create table products (
  id serial primary key,
  name varchar(100) not null,
  description text not null,
  image_url text null,
  price integer not null,
  quantity integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table orders (
  id serial primary key,
  user_id integer not null references users(id) on delete cascade on update cascade,
  total_amount integer not null,
  status order_status not null default 'PENDING',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

create table order_detail (
  id serial primary key,
  order_id integer not null references orders(id) on delete cascade on update cascade,
  product_id integer not null references products(id) on delete cascade on update cascade,
  amount integer not null,
  quantity integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

insert into roles(name) values ('ADMIN'), ('USER');

insert into users(name, email, password, role_id) 
values ('Admin', 'admin@gmail.com', '$2a$10$zK6fR0v.GmQcA5gTfw3LX.rfa5NjipkG/DHZsH6d2AlXvJgYQ.sOK', 1), 
      ('Test', 'test@gmail.com', '$2a$10$zK6fR0v.GmQcA5gTfw3LX.rfa5NjipkG/DHZsH6d2AlXvJgYQ.sOK', 2),
      ('Test 1', 'test1@gmail.com', '$2a$10$zK6fR0v.GmQcA5gTfw3LX.rfa5NjipkG/DHZsH6d2AlXvJgYQ.sOK', 2),
      ('Test 2', 'test2@gmail.com', '$2a$10$zK6fR0v.GmQcA5gTfw3LX.rfa5NjipkG/DHZsH6d2AlXvJgYQ.sOK', 2);

insert into products(name, description, image_url, price, quantity)
values ('Product 1', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 10),
      ('Product 2', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 10),
      ('Product 3', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 21),
      ('Product 4', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 3),
      ('Product 5', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 120000, 1),
      ('Product 6', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 130000, 22),
      ('Product 7', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 1),
      ('Product 8', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 10),
      ('Product 9', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 110000, 10),
      ('Product 10', 'description...', 'https://cdn.shopify.com/s/files/1/1171/5940/products/Table_Side_Naverind_84844_1.jpg', 10000, 2);
