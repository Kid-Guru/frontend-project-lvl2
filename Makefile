install:
	npm install

gendiff:
	node src/gendiff.js

publish: 
	npm publish --dry-run

rebuild: 
	npm unlink
	npm publish --dry-run
	clear
	npm link

.PHONY: test