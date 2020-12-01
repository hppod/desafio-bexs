class Queue {
    constructor() {
        this.range = []
    }

    addToQueue(item) {
        let addedToQueue = false
        if (!this.checkIfIsEmpty()) {
            this.range.forEach((value, index) => {
                if (item[1] < value[1]) {
                    this.range.splice(index, 0, item)
                    addedToQueue = true
                }
            })
        }

        if (this.checkIfIsEmpty() || !addedToQueue) {
            this.range.push(item)
        }
    }

    removeFirstFromQueue() {
        return this.range.shift()
    }

    checkIfIsEmpty() {
        return this.range.length === 0 ? true : false
    }

}

module.exports = Queue