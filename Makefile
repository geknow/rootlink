#代替\换行
.ONESHELL:
PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash
PROJECT = "node project"
#设置node运行环境
dev_NODE_E = "development"
pro_NODE_E = "production"
#入口js文件
MAIN =  ./babel.app.js
TESTS= ./test/router/*.js
MIGRATE = ./model/migrate.js
TIMEOUT = 10000

.PHONY: start migrate
devStart:
	@export NODE_ENV=${dev_NODE_E};
	@nodemon ${MAIN}
proStart:
	@export NODE_ENV=${pro_NODE_E};
	@pm2 start ${MAIN}
proRestart:
	@export NODE_ENV=${pro_NODE_E};
	@pm2 restart ${MAIN}
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