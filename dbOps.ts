// src/dbOps.ts
import Duck, { IDuck } from "./duckModel"
import DuckInt from "./duckInferface"
import { connectMongo } from "./connectMango"

export default async function dbOps(ducks: DuckInt[]) {
  const db = await connectMongo()

  // Get current data
  const gotDucks: IDuck[] = await Duck.find({})
  const toCompare: string[] = gotDucks.map(fd => fd.infoLink)
  const toGetOld: string[] = ducks.map(d => d.infoLink)

  // Insert new ducks
  const newDucks = ducks.filter(d => !toCompare.includes(d.infoLink))
  if (newDucks.length > 0) {
    await Duck.insertMany(newDucks)
    console.log(`Inserted ${newDucks.length} duck events.`)
  }

  // Remove outdated ducks
  const removedDucks = gotDucks.filter(fd => !toGetOld.includes(fd.infoLink))
  if (removedDucks.length > 0) {
    await Promise.all(
      removedDucks.map(async rd => Duck.findOneAndDelete({ _id: rd._id }))
    )
    console.log(`Removed ${removedDucks.length} old duck events.`)
  }

  await db.connection.close()
}

