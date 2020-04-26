import Https from "https"
import {Transform} from "stream"
import fs from "fs"
import path from "path"

/**
 * @param {{
 *  imageUrl: string,
 *  imageToSaveDirectoryPath: string
 * }} param
 * @return {Promise<{
                    directoryPath: string,
                    fileName: string,
                }>} path of new image relative to imageToSaveDirectoryPath parameter
 */
export default async function ({imageUrl, imageToSaveDirectoryPath}) {

    return new Promise(resolve => {

        /** @type {string} */
        const imageFileName = imageUrl.split("/").pop() || ""

        /** @type {string} */
        const imageName = imageFileName.split(".").shift() || "unnamed-file"

        /** @type {string} */
        const imageExt = imageFileName.split(".").pop() || "noExt"

        Https.request(imageUrl, (response) => {

            // console.info("## new image load request for ", imageName, imageExt)

            const data = new Transform()

            response.on('data', chunk => {
                data.push(chunk)
            })

            response.on("error", () => {
                console.error("error with image: ", imageName, imageExt)
            })

            response.on('close', () => {

                // console.info("#### image load ", imageName, imageExt)

                const imageDirectoryPath = path.resolve( imageToSaveDirectoryPath )

                fs.mkdir(imageDirectoryPath, {recursive: true}, (mkdirErr) => {

                    if (mkdirErr) {

                        console.error(mkdirErr)

                    } else {

                        const imagesPath  = `${imageDirectoryPath}/${imageName}.${imageExt}`

                        fs.writeFile(imagesPath, data.read(), writeFileErr => {

                            if (writeFileErr) {
                                console.error(writeFileErr)
                            } else {
                                resolve({
                                    directoryPath: imageDirectoryPath,
                                    fileName: `${imageName}.${imageExt}`,
                                })
                            }
                        })

                    }
                })

            })

        }).end()

    })

}

