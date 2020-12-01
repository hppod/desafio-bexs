const Queue = require('./queue')

class Fork {
    constructor() {
        this.points = new Array()
        this.adjacentPoints = new Object()
    }

    addStartPoints(point) {
        this.points.push(point)
        this.adjacentPoints[point] = new Array()
    }

    addFinalPoints(startPoint, endPoint, value) {
        this.adjacentPoints[startPoint].push({
            point: endPoint,
            value: value
        })
        this.adjacentPoints[endPoint].push({
            point: startPoint,
            value: value
        })
    }

    findBetterWay(startPoint, endPoint) {
        const times = new Object()
        const way = new Object()
        const queue = new Queue()

        times[startPoint] = 0

        this.points.forEach((point) => {
            if (startPoint !== point) {
                times[point] = Infinity
            }
        })

        queue.addToQueue([startPoint, 0])

        while (!queue.checkIfIsEmpty()) {
            const paths = queue.removeFirstFromQueue()
            const point = paths[0]

            this.adjacentPoints[point].forEach((item) => {
                const time = times[point] + item['value']

                if (time < times[item['point']]) {
                    times[item['point']] = time
                    way[item['point']] = point
                    queue.addToQueue([item['point'], time])
                }
            })
        }

        const path = [endPoint]
        let finalStep = endPoint

        while (finalStep !== startPoint) {
            path.unshift(way[finalStep])
            finalStep = way[finalStep]
        }

        const best = {
            bestRoute: path,
            price: times[endPoint]
        }

        return best
    }
}

module.exports = Fork