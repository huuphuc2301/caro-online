import config from 'config';
import * as mysql from 'mysql2';

console.log(1);

const con = mysql.createConnection({
	host: config.mysql_host,
	user: config.mysql_username,
	password: config.mysql_password
});

export default con;
