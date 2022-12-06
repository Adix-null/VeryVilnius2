docker build -t veryvilnius:latest .
docker tag veryvilnius:latest adixnull/veryvilnius:latest
docker login -u adixnull
docker push adixnull/veryvilnius:latest
pause