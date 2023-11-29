sudo useradd -p $(openssl passwd -1 $1)  $2

echo $2" ALL=(ALL) ALL " >> /etc/sudoers
