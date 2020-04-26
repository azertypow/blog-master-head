import path from "path"

export class FileInfo {
    /**
     * @param {{directoryPath?: string, fileName?: string}} param
     */
    constructor({
                    directoryPath = "",
                    fileName = "",
                }) {
        this.directoryPath = path.resolve( directoryPath )
        this.fileName = fileName
    }

    /** @return {string} */
    get path() {
        return path.resolve( this.directoryPath, this.fileName )
    }

    /** @return {string} */
    getRelativePath(from = "./") {
        return path.relative(from, this.path)
    }

    /** @return {string} */
    getRelativeDirectoryPath(from = "./") {
        return path.relative(from, this.directoryPath)
    }

    /**
     * @return {boolean}
     */
    get hasMarkdownExtension() {
        return path.extname( this.fileName ) === ".md"
    }
}
