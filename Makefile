install:
	npm install

lint:
	npx eslint .

publish: 
	npm publish --dry-run

rebuild: 
	npm unlink
	npm publish --dry-run
	clear
	npm link

.PHONY: test