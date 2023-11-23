import {connectMongo} from './connectMango'
import Duck from './duckModel'
import DuckInt from './duckInferface'

export default async function dbOps(ducks: Array<DuckInt>) {

    let db = await connectMongo()

    const ops = async () => {

        // Get data
        const gotDucks = await Duck.find({})
        const formattedDucks: Array<DuckInt> = gotDucks;
        const toCompare: Array<String> = formattedDucks.map((fd) => (fd.infoLink));
        const toGetOld: Array<String> = ducks.map((d) => (d.infoLink));
    
        // Compare with current data
        let newDucks: Array<DuckInt> = [];
        ducks.map((d: DuckInt) => {
            if (!toCompare.includes(d.infoLink)) {
                newDucks.push(d)
            }
        })
    
        // send new data
        if (newDucks.length > 0) {
            let key: string = "_id"
            
            await Promise.all(
                newDucks.map(async (nd: any) => {
                    delete nd[key]
                    await Duck.create(nd)
                })
            )
        }
    
        // get removed data
        let removedDucks: Array<DuckInt> = [];
        formattedDucks.map((fd) => {
            if (!toGetOld.includes(fd.infoLink)) {
                removedDucks.push(fd)
            }
        })
    
        // delete removed data
        if (removedDucks.length > 0) {
    
            await Promise.all(
                removedDucks.map(async (rd) => {
                    await Duck.findOneAndDelete({_id: rd._id})
                })
            )
        }
    }

    await ops()

    // Close connection
    db.connection.close()
}