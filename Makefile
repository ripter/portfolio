.PHONY: all deploy clean
NODE_BIN=./node_modules/.bin

all: server

server: node_modules/
	$(NODE_BIN)/http-server

node_modules/: package.json
	npm install
	touch node_modules/

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

deploy:
	echo "Deploy To Server!"
