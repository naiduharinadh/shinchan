#!/bin/bash

# Read the runtime values and store them in variables
arg10='#!/bin/bash'
arg11='\n'
arg8='$'
arg6="("
arg9="bash"
arg7="WPuserAddInSQL.sh"
arg1="$1"
arg2="$2"
arg3="$3"
arg4="$4"
arg5=")"
# Store the content with replaced values in a variable

# Echo the content to wpuseraddRunner.sh
echo -e   $arg10$arg11$arg8$arg6$arg9  $arg7 $arg1  $arg2 $arg3 $arg4 $arg5 > wpuseraddRunner.sh



docker cp /root/shinchan/WPuserAddInSQL.sh mysqldataos:/


docker cp /root/shinchan/wpuseraddRunner.sh mysqldataos:/

docker exec mysqldataos /wpuseraddRunner.sh 
