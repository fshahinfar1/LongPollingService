create table Feed
(
  id bigserial not null
    constraint advertise_pkey
      primary key,
  title varchar(50) not null,
  description varchar(50) not null,
  create_date date
)
;