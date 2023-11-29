#!/bin/bash

# MySQL credentials
DB_USER="harinadh"
DB_PASS="harinadh"
DB_NAME="WPDB1"

# User data
USER_LOGIN="sarath4"
USER_PASSWORD="N@dh23006"
USER_NICENAME="sarath4"
USER_EMAIL="sarath4@gmail.com"
USER_REGISTERED="NOW()"
USER_STATUS="0"
DISPLAY_NAME="sarath4"

# User role
USER_ROLE="author"

# MySQL queries
QUERY1="INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_registered, user_status, display_name) VALUES ('$USER_LOGIN', MD5('$USER_PASSWORD'), '$USER_NICENAME', '$USER_EMAIL', $USER_REGISTERED, $USER_STATUS, '$DISPLAY_NAME');"
QUERY2="INSERT INTO wp_usermeta (user_id, meta_key, meta_value) SELECT ID, 'wp_capabilities', 'a:1:{s:6:\"$USER_ROLE\";b:1;}' FROM wp_users WHERE user_login = '$USER_LOGIN';"
QUERY3="INSERT INTO wp_usermeta (user_id, meta_key, meta_value) SELECT ID, 'wp_user_level', '2' FROM wp_users WHERE user_login = '$USER_LOGIN';"

# Run MySQL commands
mysql -u"$DB_USER" -p"$DB_PASS" -D"$DB_NAME" -e"$QUERY1"
mysql -u"$DB_USER" -p"$DB_PASS" -D"$DB_NAME" -e"$QUERY2"
mysql -u"$DB_USER" -p"$DB_PASS" -D"$DB_NAME" -e"$QUERY3"

