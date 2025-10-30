import { NextRequest, NextResponse } from "next/server"

const NUM_RECENT_GAMES = 3

export async function GET(request: NextRequest) {
  const B2 = require("backblaze-b2")
  const b2 = new B2({
    applicationKeyId: process.env.BLAZEBACK_KEY_ID,
    applicationKey: process.env.BLAZEBACK_APP_KEY,
  })

  try {
    await b2.authorize()

    const GOAL_CLIPS_ID = "a01fe501f3c596e69c790d17"
    const response = await b2.listFileNames({
      bucketId: GOAL_CLIPS_ID,
      maxFileCount: 10,
      delimiter: "",
      prefix: ""
    })

    console.log(response.data.files)
  } catch (error: any) {
    console.log(`${error}`)
  }

  const data = "Successfully connected"
  return NextResponse.json(data, { status: 200 })
}
