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
        insert into tbl_userobject
        (
            user_id
        )
        values
        (
            p_id
        );
    END IF;
END$$
DELIMITER ;

CREATE TABLE tbl_objects (
  `object_id` INT AUTO_INCREMENT,
  `object_name` VARCHAR(255),
  `object_num` BIGINT,
  PRIMARY KEY(`object_id`));
  


INSERT INTO tbl_objects(object_name, object_num)
VALUES
    ('Анлгийский', 2048),
    ('Биология', 1024),
    ('География', 512),
    ('Информатика', 256),
    ('История', 128),
    ('Литература', 64),
    ('Математика базовая', 32),
    ('Математика профильная', 16),
    ('Обществознание', 8),
    ('Русский язык', 4),
    ('Физика', 2),
    ('Химия', 1);

    for (let i = 0; i < element.length; i++)
		{
			if (element[i].checked)
				a = a | element[i].id.toInt();
		}