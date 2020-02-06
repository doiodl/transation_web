import requests
import json

response = requests.post(
    'http://artem4ke.pythonanywhere.com/', data=json.dumps({'inputName': 'Yana',
			'inputEmail': 'yana98@gmal',
			'inputPassword': '111234'
			})
)
print(response.text)
# json_response = response.json()
# print(json_response)
# CREATE TABLE `tbl_user` (
#   `user_id` BIGINT NOT NULL,
#   `user_name` VARCHAR(255) NULL,
#   `user_username` VARCHAR(255) NULL,
#   `user_password` VARCHAR(255) NULL,
#   PRIMARY KEY (`user_id`));

DELIMITER $$
CREATE PROCEDURE `sp_createUser`(
    IN p_id BIGINT(20),
	IN p_name VARCHAR(255),
  	IN p_email VARCHAR(255),
  	IN p_phone VARCHAR(12),
    IN p_password VARCHAR(255)
)
BEGIN
	if ( select exists (select 1 from tbl_user where user_id = p_id) ) THEN
        select 'Username Exists !!';
    ELSE
     
        insert into tbl_user
        (
            user_id,
            user_name,
			user_email,
			user_phone,
            user_password
        )
        values
        (
            p_id,
            p_name,
			p_email,
			p_phone,
            p_password
        );
     
    END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE `sp_createUser`(
    IN p_name VARCHAR(20),
  IN p_username VARCHAR(20),
    IN p_password VARCHAR(20)
)
BEGIN
    if ( select exists (select 1 from tbl_user where user_username = p_username) ) THEN
     
        select 'Username Exists !!';
     
    ELSE
     
        insert into tbl_user
        (
            user_name,
            user_username,
            user_password
        )
        values
        (
            p_name,
            p_username,
            p_password
        );
     
    END IF;
END$$
DELIMITER ;