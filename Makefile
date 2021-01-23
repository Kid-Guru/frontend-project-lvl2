install:
	npm install

gendiff:
	node src/gendiff.js

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish: 
	npm publish --dry-run

.PHONY: test