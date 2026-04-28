APP = quickqwerty.html

chk: tidy lint

tidy:
	# Workaround: tidy-html5 does not recognise form method "dialog",
	# so remove it to avoid spurious error.
	sed 's/ method="dialog"//' $(APP) > tmp.html
	tidy -q -e --warn-proprietary-attributes no tmp.html
	rm tmp.html

lint:
	npx standard --plugin html *.html

dep:
	npm install --no-save standard eslint-plugin-html
	if command -v brew; then brew install tidy-html5; fi

cp:
	cp $(APP) ../susam.net/content/tree/

PNG = ../blob/img/quickqwerty/quickqwerty.png

ss:
	osascript -e 'tell app "Chrome" to set bounds of front window to {0, 0, 1200, 709}'
	osascript -e 'tell app "Chrome" to activate'
	screencapture -w $(PNG)
	/Applications/ImageOptim.app/Contents/MacOS/ImageOptim $(PNG)
	open $(PNG)
