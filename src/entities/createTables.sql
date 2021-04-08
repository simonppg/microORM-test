create table "tag" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);
alter table "tag" add constraint "tag_pkey" primary key ("id");

create table "publisher" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "type" text check ("type" in (\'local\', \'global\')) not null);
alter table "publisher" add constraint "publisher_pkey" primary key ("id");

create table "author" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "terms_accepted" boolean not null, "born" timestamptz(0) null, "favourite_book_id" uuid null);
alter table "author" add constraint "author_pkey" primary key ("id");
alter table "author" add constraint "author_email_unique" unique ("email");

create table "book" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "author_id" uuid not null, "publisher_id" uuid null);
alter table "book" add constraint "book_pkey" primary key ("id");

create table "book_tags" ("book_id" uuid not null, "tag_id" uuid not null);
alter table "book_tags" add constraint "book_tags_pkey" primary key ("book_id", "tag_id");

alter table "author" add constraint "author_favourite_book_id_foreign" foreign key ("favourite_book_id") references "book" ("id") on update cascade on delete set null;

alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade on delete cascade;
alter table "book" add constraint "book_publisher_id_foreign" foreign key ("publisher_id") references "publisher" ("id") on update cascade on delete cascade;

alter table "book_tags" add constraint "book_tags_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete cascade;
alter table "book_tags" add constraint "book_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;