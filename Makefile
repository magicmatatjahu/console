ci-pr: resolve validate
ci-master: resolve validate

.PHONY: resolve
resolve:
	npm run bootstrap

.PHONY: validate
validate:
	npm run conflict-check
	npm run lint-check
	# npm run markdownlint
	# npm run type-check
