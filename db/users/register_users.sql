insert into helo_users (
    username,
    password,
    profile_pic
) values (
    ${username},
    ${password},
    https://robohash.org/${username}.png
)
returning user_id, username, profile_pic;