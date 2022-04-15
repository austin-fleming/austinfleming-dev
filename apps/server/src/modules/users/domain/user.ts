/* 
TABLE base_user

base_user_id      uuid PRIMARY KEY DEFAULT uuid.v4
user_email        text UNIQUE NOT NULL
is_email_verified boolean DEFAULT false NOT NULL
username          varchar(50) NOT NULL
user_password     text
is_admin_user     boolean DEFAULT false NOT NULL
created_at        date DEFAULT current timestamp NOT NULL
updated_at        date DEFAULT current timestamp NOT NULL (update on change)
*/

/* 
TABLE author

author_id         uuid PRIMARY KEY DEFAULT uuid.v4
author_base_id    uuid PRIMARY KEY REFERENCES base_user(base_user_id) cascadeOnDelete cascadeOnUpdate
created_at        date DEFAULT current timestamp NOT NULL
updated_at        date DEFAULT current timestamp NOT NULL (update on change)
*/
// import type { AuthUser } from "@supabase/supabase-js";
