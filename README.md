# jadepress-file-server

[![Build Status](https://travis-ci.org/jade-press/jadepress-file-server.svg?branch=master)](https://travis-ci.org/jade-press/jadepress-file-server)

seprate jade-press file server

## use
```bash

#install mongodb if needed(ubuntu14.04)
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
# echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
# sudo apt-get install -y mongodb-org

#for mongodb driver ubuntu (optional)
#sudo apt-get install libkrb5-dev
#or visit https://github.com/mongodb/node-mongodb-native#troubleshooting for more

git clone git@github.com:jade-press/jadepress-file-server.git
cd jadepress-file-server
npm install
cp config-sample.js config.js

#read and edit config.js to define all the settings 

# need your mongodb ready to connect
node app

```


## license
MIT

