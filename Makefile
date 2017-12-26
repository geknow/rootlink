#代替\换行
.ONESHELL:
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
PROJECT = "node project"
#设置node运行环境
dev_NODE_E = "development"
pro_NODE_E = "production"
#入口js文件
DEVMAIN =  ./server/babel.app.js
PROMAIN=  ./build/index.js
TESTS= ./server/test/router/*.js
MIGRATE = ./server/model/migrate.js
TIMEOUT = 10000


.PHONY: start migrate build
devStart:
	@export NODE_ENV=${dev_NODE_E};
	@nodemon ${DEVMAIN}
proStart:
	@export NODE_ENV=${pro_NODE_E};
	@rm -rf build && mkdir build && babel -d ./build ./server
	@cp ./server/views ./build -r
	@cp ./server/public ./build -r
	@pm2 start ${PROMAIN}
proRestart:
	@export NODE_ENV=${pro_NODE_E};
	@rm -rf build && mkdir build && babel -d ./build ./server
	@cp ./server/views ./build -r
	@cp ./server/public ./build -r
	@pm2 restart ${PROMAIN}
stop:
	@pm2 stop ${PROMAIN}
migrate:
	@node ${MIGRATE}
install:
	@echo ${PROJECT} "install";
	@npm install
clean:
	@rm -rf build && mkdir build
tests:
	@echo "test"
	@mocha -t ${TIMEOUT} ${TESTS}
build:
	@rm -rf build && mkdir build && babel -d ./build ./server
