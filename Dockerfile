FROM centos

RUN dnf --disablerepo '*' --enablerepo extras swap centos-linux-repos centos-stream-repos -y
RUN dnf distro-sync -y

RUN dnf update -y
RUN dnf upgrade -y
RUN dnf install rpm-build rpm-devel rpmdevtools dos2unix -y
RUN useradd builder

USER builder

COPY /buildRPM.sh /

ENTRYPOINT "/bin/sh"