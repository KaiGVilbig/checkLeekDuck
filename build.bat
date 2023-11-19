rmdir leek-duck /s /q

mkdir leek-duck\node_modules
xcopy /s node_modules leek-duck\node_modules
copy connectMango.tsx leek-duck\
copy dbOps.ts leek-duck\
copy duckInferface.ts leek-duck\
copy duckModel.tsx leek-duck\
copy index.ts leek-duck\
copy package-lock.json leek-duck\
copy package.json leek-duck\
copy tsconfig.json leek-duck\

tar -czvf leek-duck-0.0.1.tar.gz leek-duck

docker run -it rpmbuild -v /leek-duck-.0.01.tar.gz:/