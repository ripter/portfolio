.PHONY: all deploy clean
NODE_BIN=./node_modules/.bin

all: server

server: node_modules/
	PORT=5051 node server/index.js

node_modules/: package.json
	npm install
	touch node_modules/

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

deploy: node_modules/
	echo "Deploy To Server!"
