docker build --cache-from rpmbuilder -t rpmbuilder .
rmdir shared /s /q

mkdir leek-duck-0.0.1\node_modules
xcopy /s node_modules leek-duck-0.0.1\node_modules
copy tests\index.ts leek-duck-0.0.1\
copy package-lock.json leek-0.0.1-duck\
copy package.json leek-duck-0.0.1\
copy tsconfig.json leek-duck-0.0.1\
copy leek-duck.service leek-duck-0.0.1\

tar -czvf leek-duck-0.0.1.tar.gz leek-duck-0.0.1
mkdir shared
copy leek-duck-0.0.1.tar.gz shared\
copy leek-duck.spec shared\
copy leek-duck.service shared\

docker run --rm -it -v E:\Projects\Home_auto\checkLeekDuck\shared:/shared rpmbuilder

rmdir leek-duck-0.0.1 /s /q
del leek-duck-0.0.1.tar.gz