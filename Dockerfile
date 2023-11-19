FROM alpine:3.18.4

RUN apk update
RUN apk add --no-cache bash
RUN apk add rpm-dev

RUN addgroup --system rpm
RUN adduser --system builder --ingroup rpm

USER builder:rpm

RUN mkdir -p /home/builder/rpmbuild/BUILD
RUN mkdir -p /home/builder/rpmbuild/RPMS
RUN mkdir -p /home/builder/rpmbuild/SOURCES
RUN mkdir -p /home/builder/rpmbuild/SPECS
RUN mkdir -p /home/builder/rpmbuild/SRPMS

ENTRYPOINT "/bin/sh"