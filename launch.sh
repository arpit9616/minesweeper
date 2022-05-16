
DIR="."
# Get absolute path of containing directory
get_dir_path () {
	SOURCE="${BASH_SOURCE[0]}"
	while [ -h "$SOURCE" ]; do
	DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
	SOURCE="$(readlink "$SOURCE")"
	[[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
	done
	DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
}

isMac=0
isLinux=0

case "$OSTYPE" in
  darwin*)  isMac=1 ;; 
  linux*)   isLinux=1 ;;
  *)        echo "[$OSTYPE] OS not suported." ;;
esac

# Launch in Safari on Mac OSx
if [ $isMac = 1 ]; then
	get_dir_path
	open -a "Safari" "$DIR/index.html"
fi

# Launch in FireFox for GNU Linux
if [ $isLinux = 1 ]; then
	get_dir_path
	firefox "$DIR/index.html"
fi
