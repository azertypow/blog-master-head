import Https from "https"
import {Transform} from "stream"
import fs from "fs"
import path from "path"

let totalImages = 0
let totalMkdir = 0

/**
 * @return Promise<string>
 * @param {{
 *  imageUrl: string,
 *  imageToSaveDirectoryPath: string
 * }} param
 */
export default async function ({imageUrl, imageToSaveDirectoryPath}) {
    totalImages++

    /** @type {string} */
    const imageFileName = imageUrl.split("/").pop() || ""

    /** @type {string} */
    const imageName = imageFileName.split(".").shift() || "unnamed-file"

    /** @type {string} */
    const imageExt = imageFileName.split(".").pop() || "noExt"

    Https.request(imageUrl, (response) => {

        console.info("## new image load request for ", imageName, imageExt)

        const data = new Transform()

        response.on('data', chunk => {
            data.push(chunk)
        })

        response.on("error", () => {
            console.error("error with image: ", imageName, imageExt)
        })

        response.on('close', () => {

            console.info("#### image load ", imageName, imageExt)

            const imageDirectoryPath = path.resolve( imageToSaveDirectoryPath )

            fs.mkdir(imageDirectoryPath, {recursive: true}, (mkdirErr) => {

                totalMkdir++
                console.info("mkdir for", imageName, imageExt)
                console.info("totalMkdir: ", totalMkdir)

                if (mkdirErr) {

                    console.error(mkdirErr)

                } else {

                    fs.writeFile(`${imageDirectoryPath}/${imageName}.${imageExt}`, data.read(), writeFileErr => {

                        if (writeFileErr) {
                            console.error(writeFileErr)
                        } else {
                            console.info("###### image write ", imageName, imageExt)
                        }
                    })

                }
            })

        })

    }).end()

}

