const cron = require('node-cron')

let index: number = 0

const main = () => {
    console.log("testing... " + index)
    index = index + 1
}

cron.schedule('* * * * *', () => {
    main()
})