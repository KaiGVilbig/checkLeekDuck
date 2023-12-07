mv leek-duck_0.0.1_all/etc/systemd/system/leek-duck-debian.service leek-duck_0.0.1_all/etc/systemd/system/leek-duck.service
chmod -R 755 leek-duck_0.0.1_all/DEBIAN
chmod 644 leek-duck_0.0.1_all/DEBIAN/control leek-duck_0.0.1_all/etc/systemd/system/leek-duck.service

chmod 755 leek-duck_0.0.1_all
chmod 755 leek-duck_0.0.1_all/DEBIAN leek-duck_0.0.1_all/opt leek-duck_0.0.1_all/etc leek-duck_0.0.1_all/etc/systemd leek-duck_0.0.1_all/etc/systemd/system

dpkg-deb --build leek-duck_0.0.1_all

mv leek-duck_0.0.1_all.deb leek-duck_0.0.1_all/leek-duck_0.0.1_all.deb