import {readdirSync, readFileSync, readFile, Dirent} from "fs"
import path from "path"
import { FileInfo } from "./FileInfo.js"
import saveImageFromUrl from "./saveImageFromUrl.js"
import sharp from "sharp"

async function main() {

    const postDirPath = "./docs/"
    const dirPathForImageLoaded = "./resources/"

    /**
     * array of markdown files in doc ref directory
     * @type {FileInfo[]}
     */
    const markdownFileArray = getFilesDirentRecursively( postDirPath ).filter( fileInfo => {
        return fileInfo.hasMarkdownExtension
    })

    console.log( markdownFileArray )

    for(const markdownFile of markdownFileArray) {

        readFile(markdownFile.path, async (err, data) => {

            const contentFile = data.toString()

            // const imageMarkdown = contentFile.match(/(?:!\[(.*?)\]\((.*?)\))/gi) // markdown image
            const imageLinks = contentFile.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/gi) // all image links

            if( imageLinks ) {

                console.info(`${imageLinks.length} images find in ${markdownFile.getRelativePath()}`)
                let fileImageLoaded = 0

                for ( const link of imageLinks ) {

                    const loadedImage = new FileInfo(await saveImageFromUrl({
                            imageToSaveDirectoryPath: path.resolve( dirPathForImageLoaded, markdownFile.getRelativeDirectoryPath( postDirPath ) ),
                            imageUrl: link,
                        })
                    )
                    fileImageLoaded++
                    console.info(`${fileImageLoaded} / ${imageLinks.length} images loaded for ${markdownFile.getRelativePath()}`)

                    const resizeImagePath_icon          = path.resolve( loadedImage.directoryPath, `icon-${loadedImage.fileName}` )
                    const resizeImagePath_small         = path.resolve( loadedImage.directoryPath, `small-${loadedImage.fileName}` )
                    const resizeImagePath_smallGrey     = path.resolve( loadedImage.directoryPath, `smallGrey-${loadedImage.fileName}` )
                    const resizeImagePath_medium        = path.resolve( loadedImage.directoryPath, `medium-${loadedImage.fileName}` )
                    const resizeImagePath_mediumGrey    = path.resolve( loadedImage.directoryPath, `mediumGrey-${loadedImage.fileName}` )

                    sharp(loadedImage.path).resize({
                        width: 10,
                    })
                        .toFile(resizeImagePath_icon)

                    sharp(loadedImage.path).resize({
                        width: 300,
                    })
                        .toFile(resizeImagePath_small)

                    sharp(loadedImage.path).resize({
                        width: 300,
                    })
                        .grayscale(true)
                        .toFile(resizeImagePath_smallGrey)

                    sharp(loadedImage.path).resize({
                        width: 600,
                    })
                        .toFile(resizeImagePath_medium)

                    sharp(loadedImage.path).resize({
                        width: 600,
                    })
                        .grayscale(true)
                        .toFile(resizeImagePath_mediumGrey)

                }


                console.info(`image import and resize process ended for ${markdownFile.getRelativePath()}`)

            }

        })

    }


}
main()

/**
 * @return {FileInfo[]}
 * @param {string} directoryPath
 */
function getFilesDirentRecursively(directoryPath) {

    directoryPath =  path.relative( "./", directoryPath ) // clean path

    /** @type {FileInfo[]} */
    let filesDirentArray = []

    /**
     * @type {Dirent[]}
     */
    const direntArray = readdirSync( directoryPath, { withFileTypes: true })

    for ( const dirent of direntArray ) {

        if( dirent.isDirectory() ) {

            const pathOfDirentFile = path.join( directoryPath, dirent.name )
            const arrayOfDirentIsFileInChildFolder = getFilesDirentRecursively( pathOfDirentFile )
            filesDirentArray = filesDirentArray.concat(arrayOfDirentIsFileInChildFolder)

        } else if( dirent.isFile() ) {

            filesDirentArray.push(new FileInfo({
                    directoryPath: directoryPath,
                    fileName: dirent.name,
                }),
            )

        }
    }

    return filesDirentArray
}

