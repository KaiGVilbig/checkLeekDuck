chmod -R 755 leek-duck_0.0.1_all/DEBIAN

dpkg-deb --build leek-duck_0.0.1_all

mv leek-duck_0.0.1_all.deb leek-duck_0.0.1_all/leek-duck_0.0.1_all.deb