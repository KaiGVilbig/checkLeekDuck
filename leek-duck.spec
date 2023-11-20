Name:       leek-duck
Version:    0.0.1
Release:    1%{?dist}
Summary:    Simple web scraper that gets Pokemon go events and puts them into a mongodb server and

License:    ISC
Source0:    %{name}-%{version}.tar.gz

Requires:   nodejs dos2unix
BuildArch:  noarch

%description
LeekDuck scraper

%pre
useradd --system leek-duck
groupadd auto-services
usermod -a -G auto-services leek-duck

%prep
%setup -q

%build
find leek-duck.service -type f -exec dos2unix {} \;


%install
mkdir -p %{buildroot}/opt/auto/LeekDuck/node_modules/
mkdir -p %{buildroot}/etc/systemd/system/

cp -r * %{buildroot}/opt/auto/LeekDuck/
chmod -R -x+X %{buildroot}/opt/auto/LeekDuck/
cp leek-duck.service %{buildroot}/etc/systemd/system/
chmod -x %{buildroot}/etc/systemd/system/leek-duck.service

%files
%defattr(0664, leek-duck, auto-services)
/opt/auto/LeekDuck/
/etc/systemd/system/leek-duck.service

%post
systemctl daemon-reload
systemctl enable leek-duck
systemctl start leek-duck

%preun
systemctl stop leek-duck
systemctl disable leek-duck

%postun
if [ "$1" = "0" ]; then
    rm -rf /opt/auto/LeekDuck
    rm -f /etc/systemd/system/leek-duck.service
fi
systemctl daemon-reload
userdel leek-duck