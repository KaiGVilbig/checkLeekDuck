Name:       leek-duck
Version:    0.0.1
Release:    1%{?dist}
Summary:    Simple web scraper that gets Pokemon go events and puts them into a mongodb server and

License:    ISC
Source0:    %{name}-%{version}.tar.gz

Requires:   Node

%prep
%setup -q

%install

%files