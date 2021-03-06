-- First, remove the table if it exists
drop table if exists bookmarks;

-- Create the table anew
create table bookmarks (
  id INTEGER primary key generated by default as identity,
  title text NOT NULL,
  url text NOT NULL,
  description text,
  rating INTEGER
);

-- insert some test data
-- Using a multi-row insert statement here
insert into bookmarks (id, title, url , description, rating)
values
  (1, 'Google', 'https://www.google.com', 'google search', 5),
  (2, 'thinkful', 'https://www.thinkful.com', 'school', 5)
  ;