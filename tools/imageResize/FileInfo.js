import path from "path"

export class FileInfo {
    /**
     * @param {{directoryPath?: string, fileName?: string}} param
     */
    constructor({
                    directoryPath = "",
                    fileName = "",
                }) {
        this.directoryPath = directoryPath
        this.fileName = fileName
    }

    /**
     * @return {boolean}
     */
    get hasMarkdownExtension() {
        return path.extname( this.fileName ) === ".md"
    }
}
