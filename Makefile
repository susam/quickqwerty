APP = quickqwerty.html

checks: tidy lint

tidy:
	# Workaround: tidy-html5 does not recognise form method "dialog",
	# so remove it to avoid spurious error.
	sed 's/ method="dialog"//' $(APP) > tmp.html
	tidy -q -e --warn-proprietary-attributes no tmp.html
	rm tmp.html

lint:
	npx standard --plugin html *.html

deps:
	npm install --no-save standard eslint-plugin-html
	if command -v brew; then brew install tidy-html5; fi

cp:
	cp $(APP) ~/git/susam.net/content/tree

pub: cp
	cd ~/git/susam.net/ && make copub
