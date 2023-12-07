# Check Leek Duck Web Scraper
### A Pokemon Go events monitor

- Scrapes [LeekDuck](https://leekduck.com) to get current and upcoming events on Pokemon Go
- Stores the events in a [MongoDB](https://en.wikipedia.org/wiki/MongoDB) databse for use by other applications
- Uses a [Cronjob](https://en.wikipedia.org/wiki/Cron) to execute once every day
    - Only fetch once a day as to not overwhelm [LeekDuck](https://leekduck.com)
    - Only checking once a day is necessary since events aren't being announced every minute
- Can be built as an [RPM](https://en.wikipedia.org/wiki/RPM_Package_Manager) to install to RPM based Linux distributions
- Can also be build as a [Debian package](https://en.wikipedia.org/wiki/Deb_(file_format)) to install on debian based distributions
- RPMs and Deb packages will be built as a [Linux Service](https://www.imaginelinux.com/service-in-linux/) and will run on boot and restart on failure
- Uses [Docker](https://aws.amazon.com/docker/) and [CentOS](https://www.redhat.com/en/topics/linux/what-is-centos) to build the RPM
- Uses Docker and [Ubuntu](https://en.wikipedia.org/wiki/Ubuntu) to build the .deb
- The /tests directory contains a test index.ts file for testing the building, installing, running and unsinstalling the RPM and Debian packages as a service

---

## Building
- To build the application for local use:
    - Clone the application
    - Run `npm i` to install required dependencies
- To build an [RPM](https://en.wikipedia.org/wiki/RPM_Package_Manager) to install on a Linux distribution:
    - Complete the steps listed above
    - Run the `build.bat` file
    - Once the RPM is build, it should be located in the `/shared` directory

## Installing
- To install the RPM:
    - Navigate to the directory containing the RPM package
    - Open a terminal
    - Run `sudo dnf install leek-duck-0.0.1-1.el8.noarch.rpm`
- The above step should install the service as well as the required dependencies
- To confirm the service is running:
    - Run `systemctl status leek-duck`

## Running
- To run the aplication in dev mode:
    - Run `npm run dev` to run in dev mode or,
    - Run `ts-node index.ts` 

## Rasberry Pi?
- If you want to run this on a rasberyr pi the only way I found that works so far is:
    - use Rasberry Pi OS (Latest 64 bit)
    - curl -sSL https://get.docker.com | sh
    - mkdir mongodb (in /home/user/)
    - sudo docker pull mongo:4.4.13
    - sudo docker run --rm -d -p 27017:27017 -v ~/mongodb:/data/db --name mongodb mongo:4.4.13
    - To install .deb on RPi, Since the debian version < 12, zstd is needed to modify the .deb package.
        - ar x leek-duck_0.0.1_all.deb
        - zstd -d < control.tar.zst | xz > control.tar.xz
        - zstd -d < data.tar.zst | xz > data.tar.xz
        - ar -m -c -a sdsd /tmp/leek-duck_0.0.1_all.deb debian-binary control.tar.xz data.tar.xz
        - rm debian-binary control.tar.xz data.tar.xz control.tar.zst data.tar.zst
        - apt-get install /tmp/some-package.deb