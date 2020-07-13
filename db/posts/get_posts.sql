select hp.id, hp.img, hu.username, hu.profile_pic from helo_posts hp
join helo_users hu on hp.author_id = hu.id
where hu.id = ${id};