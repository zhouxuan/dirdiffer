# dirdiffer

Try to find different files of two directories!

# install
	npm install dirdiffer - g

# usage
	Usage: dirdiffer {options}
	Standard Options:
		--oripath, -o the original directory which you want to compare
		--basepath, -b the base directory which you want to search
		--extension, -e extension name, split by "|"

# example
	var dirdiffer = require('dirdiffer');
	dirdiffer('original directory path', 'base directory path', "*");
	dirdiffer('original directory path', 'base directory path', "jade|json");

	or

	dirdiffer -o 'some directory path' -b 'some directory path' -e 'jade|json'
