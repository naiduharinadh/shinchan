mkdir shinchan
cd shinchan/
yum install git -y 
git init

echo "================================== GIT INSTALLED SUCCESSFULLY ===================================="
git pull  https://github.com/harinadh14/shinchan.git

amazon-linux-extras install epel -y 

echo -e "[mongodb-org-6.0] \nname=MongoDB Repository \nbaseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/6.0/x86_64/ \ngpgcheck=1 \nenabled=1 \ngpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc \n" > /etc/yum.repos.d/mongodb-org-6.0.repo

yum install mongodb-org -y 
systemctl start mongod
systemctl enable mongod
echo "=================================== mongoDB installed ============================================"

echo -e "# .bashrc\n# User specific aliases and functions \n  \n \nalias rm='rm -i' \nalias cp='cp -i' \nalias mv='mv -i' \n \n \n# Source global definitions \nif [ -f /etc/bashrc ]; then \n. /etc/bashrc \nfi\n \nPATH='/root/shinchan/scripting:$PATH '
" > /root/.bashrc
source /root/.bashrc

echo "=====================ROOT PATH SETTED SUCCESSFULLY ==============================================="

curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
yum install -y nodejs

echo "+++++++++++++++++++++++++++++++++ NODE-16 INSTALLED SUCCESSFULLY +++++++++++++++++++++++++++++++++++"


curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
echo "++++++++++++++++++++++++++++++++++ docker compose v-2.19 installed successfully ++++++++++++++++++++++++++++++++++++"


yum install docker -y 
systemctl start docker
systemctl enable  docker
echo "====================== DOCKER INSTALLED SUCCESSFULLY ==============================================="

yum install shellinabox -y 
systemctl start shellinaboxd
systemctl enable shellinaboxd


echo -e "# Shell in a box daemon configuration \n# For details see shellinaboxd man page \n \n# Basic options \nUSER=shellinabox \nGROUP=shellinabox \nCERTDIR=/var/lib/shellinabox \nPORT=2323 \nOPTS='--disable-ssl-menu -s /:LOGIN' \n \n \n# Additional examples with custom options: \n \n# Fancy configuration with right-click menu choice for black-on-white: \n# OPTS="--user-css Normal:+black-on-white.css,Reverse:-white-on-black.css --disable-ssl-menu -s /:LOGIN" \n# Simple configuration for running it as an SSH console with SSL disabled: \n# OPTS='-t -s /:SSH:host.example.com' \n 
" > /etc/sysconfig/shellinaboxd

systemctl restart shellinaboxd.service


echo " atlter native for shell in a box is : WETTY "
npm install -g wetty 

echo "====================== SHELL IN A BOX INST SUCCESSFULLY ==============="

cd /root/shinchan/scripting
chmod +x $(ls -a )

echo "================== mode of the files changed to excutable =========="


echo "jenkins setup started it need to install java v8/v11 :        "
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
amazon-linux-extras install java-openjdk11 -y 
yum install jenkins -y
systemctl start jenkins
systemctl enable jenkins

