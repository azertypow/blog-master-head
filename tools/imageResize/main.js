import {readdirSync, readFileSync, readFile} from "fs"
import path from "path"
import { FileInfo } from "./FileInfo.js"
import saveImageFromUrl from "./saveImageFromUrl.js"

async function main() {

    const mdFilesDirectoryPath = "./docs/"
    const directoryForImageLoadedPath = "./resources/images/"

    const filesInfoInDirectory = getDirentIsFilesRecursively(mdFilesDirectoryPath)

    for(const fileInfo of filesInfoInDirectory) {
        if( fileInfo.hasMarkdownExtension ) {

            const mdContentFilePath = path.resolve( fileInfo.directoryPath, fileInfo.fileName )

            readFile(mdContentFilePath, (err, data) => {

                const contentFile = data.toString()

                // const imageMarkdown = contentFile.match(/(?:!\[(.*?)\]\((.*?)\))/gi)
                const imageLinks = contentFile.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/gi)

                const pathDirectoryToSaveImageFromMDFile = path.relative("./", path.resolve( fileInfo.directoryPath ) )

                if( imageLinks ) {

                    console.info(`${imageLinks.length} images find in ${fileInfo.fileName}`)

                    for( const link of imageLinks ) {
                        saveImageFromUrl({
                            imageToSaveDirectoryPath: path.resolve( directoryForImageLoadedPath, pathDirectoryToSaveImageFromMDFile ),
                            imageUrl: link,
                        }).then(value => {
                            console.log("value: ", value)
                        })
                    }
                }

            })

        }
    }


}
main()

/**
 * @return {FileInfo[]}
 * @param {string} directoryPath
 */
function getDirentIsFilesRecursively(directoryPath) {

    /** @type {FileInfo[]} */
    let arrayOfDirentIsFile = []

    const filePath = path.resolve(directoryPath)
    const arrayOfDirentFile = readdirSync( filePath, { withFileTypes: true })

    for ( const direntFile of arrayOfDirentFile ) {

        if( direntFile.isDirectory() ) {

            const pathOfDirentFile = path.resolve( directoryPath, direntFile.name )
            const arrayOfDirentIsFileInChildFolder = getDirentIsFilesRecursively( pathOfDirentFile )
            arrayOfDirentIsFile = arrayOfDirentIsFile.concat(arrayOfDirentIsFileInChildFolder)

        } else if( direntFile.isFile() ) {

            arrayOfDirentIsFile.push(new FileInfo({
                    directoryPath: filePath,
                    fileName: direntFile.name,
                }),
            )

        }
    }

    return arrayOfDirentIsFile
}
