rmdir leek-duck-0.0.1 /s /q

mkdir leek-duck-0.0.1\node_modules
xcopy /s node_modules leek-duck-0.0.1\node_modules
copy connectMango.tsx leek-duck-0.0.1\
copy dbOps.ts leek-duck-0.0.1\
copy duckInferface.ts leek-duck-0.0.1\
copy duckModel.tsx leek-duck-0.0.1\
copy index.ts leek-duck-0.0.1\
copy package-lock.json leek-0.0.1-duck\
copy package.json leek-duck-0.0.1\
copy tsconfig.json leek-duck-0.0.1\
copy leek-duck.service leek-duck-0.0.1\

tar -czvf leek-duck-0.0.1.tar.gz leek-duck-0.0.1
mkdir shared
copy leek-duck-0.0.1.tar.gz shared\
copy leek-duck.spec shared\
copy leek-duck.service shared\

docker run -it -v E:\Projects\Home_auto\checkLeekDuck\shared:/shared rpmbuilder

rmdir shared /s /q