#代替\换行
.ONESHELL:
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
PROJECT = "node project"
#设置node运行环境
dev_NODE_E = "development"
pro_NODE_E = "production"
#入口js文件
PROMAIN =  ./build/index.js
DEVMAIN =  ./server/babel.app.js
TESTS= ./server/test/router/*.js
MIGRATE = ./server/model/migrate.js
TIMEOUT = 10000

.PHONY: start migrate clean
devStart:
	@export NODE_ENV=${dev_NODE_E};
	@nodemon ${DEVMAIN}
proStart:
	@rm ./build -rf
	@export NODE_ENV=${pro_NODE_E};
	@babel ./server -d ./build
	@cp ./server/public ./build -rf
	@cp ./server/views ./build -rf
	@pm2 start ${PROMAIN}
proRestart:
	@rm ./build -rf
	@export NODE_ENV=${pro_NODE_E};
	@babel ./server -d ./build
	@cp ./server/public ./build -rf
	@cp ./server/views ./build -rf
	@pm2 restart ${PROMAIN}
stop:
	@pm2 stop ${PROMAIN}
migrate:
	@node ${MIGRATE}
install:
	@echo ${PROJECT} "install";
	@npm install
clean:
	@rm -r ./build
tests:
	@echo "test"
	@mocha -t ${TIMEOUT} ${TESTS}
build: start