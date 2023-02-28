import { DirBuffer } from "./dirBuffer"


class Chromander {
    constructor() {
        this.bufferA = new DirBuffer()
        this.bufferB = new DirBuffer()
    }

    swapBuffers() {
        a = this.bufferA.currentDir
        b = this.bufferB.currentDir
        a.setAbsolutePath(b)
        b.setAbsolutePath(a)
    }
}


export const chromander = new Chromander()

