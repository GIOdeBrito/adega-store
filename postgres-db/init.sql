
CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('editor');
INSERT INTO roles (name) VALUES ('client');

--SELECT * FROM roles;



CREATE TABLE permission_actions (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

INSERT INTO permission_actions (name) VALUES ('Remove user');
INSERT INTO permission_actions (name) VALUES ('Edit user');
INSERT INTO permission_actions (name) VALUES ('View user');
INSERT INTO permission_actions (name) VALUES ('Create user');

--SELECT * FROM permission_actions;



CREATE TABLE role_permissions (
	id SERIAL PRIMARY KEY,
	role_id INTEGER NOT NULL REFERENCES roles(id),
	permission_action_id INTEGER NOT NULL REFERENCES permission_actions(id)
);

INSERT INTO role_permissions (role_id, permission_action_id) VALUES (1, 1);
INSERT INTO role_permissions (role_id, permission_action_id) VALUES (1, 2);
INSERT INTO role_permissions (role_id, permission_action_id) VALUES (1, 3);
INSERT INTO role_permissions (role_id, permission_action_id) VALUES (1, 4);
INSERT INTO role_permissions (role_id, permission_action_id) VALUES (2, 3);

/*
SELECT
	A.id,
	B.name AS role,
	C.name AS action_name
FROM
	role_permissions A
	JOIN roles B ON A.role_id = B.id
	JOIN permission_actions C ON A.permission_action_id = C.id
--WHERE B.id = 1
;
*/


CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	full_name TEXT NOT NULL,
	short_name TEXT NOT NULL,
	role INTEGER NOT NULL REFERENCES roles(id)
);

INSERT INTO users (short_name, full_name, role) VALUES ('giordano.bruno', 'Giordano Bruno Magnos de Brito', 1);
INSERT INTO users (short_name, full_name, role) VALUES ('admin', 'Administrator', 1);
INSERT INTO users (short_name, full_name, role) VALUES ('robert.ervin', 'Robert Ervin Howard', 2);

-- Show users with their respective roles
/*
SELECT
	A.*,
	B.name AS role_name
FROM
	users A
	JOIN roles B ON A.role = B.id
ORDER BY
	B.id,
	A.short_name
;
*/

/*
-- Check what each user can do
SELECT
	'User: ' || A.full_name || ', can: ' || D.name || '' AS user_can_perform_action
FROM
	users A
	JOIN roles B ON A.role = B.id
	JOIN role_permissions C ON C.role_id = B.id
	JOIN permission_actions D ON C.permission_action_id = D.id
WHERE
	A.id = 3
;
*/

