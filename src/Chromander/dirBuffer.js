
class DirBuffer {
    constructor() {
        this.remoteSelectedDirectory = null
    }
    setAbsolutePath() {}
    goToParentDirectory() {}
    goToSubDirectory(directoryName) {}
    setSelecteced(nodeName) {}
    get currentDir() { return this.remoteSelectedDirectory }
}


export { DirBuffer }
