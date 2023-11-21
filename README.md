# Check Leek Duck Web Scraper
### A Pokemon Go events monitor

- Scrapes [LeekDuck](https://leekduck.com) to get current and upcoming events on Pokemon Go
- Stores the events in a MongoDB databse for use by other applications
- Uses a chronjob to execute once every day
    - Only fetch once a day as to not overwhelm [LeekDuck](https://leekduck.com)
    - Only checking once a day is necessary since events aren't being announced every minute
- Can be built as an [RPM](https://en.wikipedia.org/wiki/RPM_Package_Manager) to install to Linux
- RPMs will be built as a [Linux Service](https://www.imaginelinux.com/service-in-linux/) and will run on boot and restart on failure
- Uses [Docker](https://aws.amazon.com/docker/) and [CentOS](https://www.redhat.com/en/topics/linux/what-is-centos) to build the RPM

---

## Building
- To build the application for local use:
    - Clone the application
    - Run `npm i` to install required dependencies

- To build an [RPM](https://en.wikipedia.org/wiki/RPM_Package_Manager) to install on a Linux distribution:
    - Complete the steps listed above
    - Run the `build.bat` file
    - Once the RPM is build, it should be located in the `/shared` directory

## Running
- To run the aplication:
    - Run `npm run dev` to run in dev mode or,
    - Run `ts-node index.ts` 