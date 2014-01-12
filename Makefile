
MOCHA_OPTS= --check-leaks
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--globals setImmediate,clearImmediate \
		$(MOCHA_OPTS) \
		test/test-*.js

clean: clean-docs

clean-docs:
	rm -rf docs/

docs: clean-docs
	docco --layout parallel {index.js,lib/*.js}

.PHONY: test
