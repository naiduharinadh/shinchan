echo $1 $2 $3
docker start  $1
echo "img started"
docker attach $1
echo "====================>   attache successfully <==================== "
echo "$(docker commit $1 $2)"
echo "====================>   commited successfully <==================="
echo "$(docker tag $2 $3)"
echo " ====================>  tagged successfully <===================== "

docker login -u $4  -p  $5
echo " ====================>  $4 login successfully done <================ "

docker push $3
echo " ====================>  pushed successfully <======================"
