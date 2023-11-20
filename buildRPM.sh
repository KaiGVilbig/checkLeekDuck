usr=$(whoami)
rpmbuilddir=/home/$usr/rpmbuild

rpmdev-setuptree

cp /shared/leek-duck-0.0.1.tar.gz /home/builder/rpmbuild/SOURCES/

cp /shared/leek-duck.spec /home/builder/rpmbuild/SPECS/

cd $rpmbuilddir

rpmbuild -bb SPECS/leek-duck.spec

mv $rpmbuilddir/RPMS/noarch/*.rpm /shared/