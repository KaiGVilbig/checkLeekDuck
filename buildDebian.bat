docker build -f DebianDockerfile --cache-from debianbuilder -t debianbuilder .
rmdir shared /s /q
mkdir shared\opt\auto\LeekDuck\node_modules
mkdir shared\etc\systemd\system

xcopy /s node_modules shared\opt\auto\LeekDuck\node_modules
xcopy /s /I DEBIAN shared\DEBIAN
copy connectMango.tsx shared\opt\auto\LeekDuck
copy dbOps.ts shared\opt\auto\LeekDuck
copy duckInferface.ts shared\opt\auto\LeekDuck
copy duckModel.tsx shared\opt\auto\LeekDuck
copy index.ts shared\opt\auto\LeekDuck
copy package-lock.json shared\opt\auto\LeekDuck
copy package.json shared\opt\auto\LeekDuck
copy tsconfig.json shared\opt\auto\LeekDuck
copy leek-duck.service shared\etc\systemd\system\

docker run --rm -it -v E:\Projects\Home_auto\checkLeekDuck\shared:/leek-duck_0.0.1_all debianbuilder
