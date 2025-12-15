// Temp comment to get everything to stop complaining
//
//
// import { NextRequest, NextResponse } from "next/server"
//
// const NUM_RECENT_GAMES = 3
// const BB_URL = "s3.us-east-005.backblazeb2.com"
//
// export async function GET(request: NextRequest) {
//   const B2 = require("backblaze-b2")
//   const b2 = new B2({
//     applicationKeyId: process.env.BLAZEBACK_KEY_ID,
//     applicationKey: process.env.BLAZEBACK_APP_KEY,
//   })
//
//   try {
//     await b2.authorize()
//
//     const allFiles = await b2.listFileNames({
//       bucketId: process.env.BLAZEBACK_GOAL_CLIPS_ID,
//       maxFileCount: NUM_RECENT_GAMES,
//     })
//
//     const files = allFiles.data.files
//     const urls = files.map((file: Array<string>) => `${BB_URL}/${file.fileName}`)
//
//     return NextResponse.json(urls, { status: 200 })
//   } catch (error: any) {
//     console.log(error)
//   }
//
//   return NextResponse.json("Error", { status: 400 })
// }
