#代替\换行
.ONESHELL:
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
PROJECT = "node project"
#设置node运行环境
NODE_E = "development"
#入口js文件
MAIN =  ./babel.app.js
TESTS= ./test/router/*.js
MIGRATE = ./model/migrate.js
TIMEOUT = 10000

.PHONY: start migrate
start:
	@export NODE_ENV=${NODE_E};
	@nodemon ${MAIN}
migrate:
	@node ${MIGRATE}
install:
	@echo ${PROJECT} "install";
	@npm install
clean:
	@rm -r ./node_modules
tests:
	@echo "test"
	@mocha -t ${TIMEOUT} ${TESTS}
build: start