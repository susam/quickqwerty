checks: tidy lint

tidy:
	# Workaround: tidy-html5 does not recognise form method "dialog",
	# so remove it to avoid spurious error.
	sed 's/ method="dialog"//' quickqwerty.html > tmp.html
	tidy -q -e --warn-proprietary-attributes no tmp.html
	rm tmp.html

lint:
	npm run lint

deps:
	npm install
	if command -v brew; then brew install tidy-html5; fi
