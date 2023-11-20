@REM rmdir leek-duck /s /q

@REM mkdir leek-duck\node_modules
@REM xcopy /s node_modules leek-duck\node_modules
@REM copy connectMango.tsx leek-duck\
@REM copy dbOps.ts leek-duck\
@REM copy duckInferface.ts leek-duck\
@REM copy duckModel.tsx leek-duck\
@REM copy index.ts leek-duck\
@REM copy package-lock.json leek-duck\
@REM copy package.json leek-duck\
@REM copy tsconfig.json leek-duck\

@REM tar -czvf leek-duck-0.0.1.tar.gz leek-duck
mkdir shared
copy leek-duck-0.0.1.tar.gz shared\

docker run -it -v E:\Projects\Home_auto\checkLeekDuck\shared:/shared rpmbuild

rmdir shared /s /q