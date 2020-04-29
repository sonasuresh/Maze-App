import React, { Component } from 'react'
import Cell from '../components/Cell'

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

export class HomeView extends Component {

    constructor() {
        super()
        this.state = {
            rows: 10,
            columns: 10,
            manPosition: {
                x: 5,
                y: 5
            },
            foodPositions: [],
            totalMovements: 0,
        }


    }

    componentDidMount() {
        const newState = { ...this.state }
        newState.rows = Number(prompt('Enter number of Rows'))
        newState.columns = Number(prompt('Enter number of Columns'))
        newState.manPosition.x = between(0, newState.rows - 1)
        newState.manPosition.y = between(0, newState.columns - 1)
        for (let i = 0; i < Math.min(newState.columns - 1, newState.rows - 1); i++) {
            const foodPosition = { x: 0, y: 0 }
            foodPosition.x = between(0, newState.rows - 1)
            foodPosition.y = between(0, newState.columns - 1)
            newState.foodPositions.push(foodPosition)
        }

        this.setState(newState)
    }


    render() {

        const handleKeyDown = (e) => {

            const newState = { ...this.state }

            const incrementMovement = ({ x, y }) => {
                newState.totalMovements += 1
                if (newState.totalMovements > Math.max(newState.rows * 2, newState.columns * 2)) {
                    alert('Max movements reached. Your game will now reload')
                    window.location.reload()
                }
                else {
                    newState.foodPositions.forEach((foodPosition, positionIdx) => {
                        if (foodPosition.x === x && foodPosition.y === y) {
                            newState.foodPositions.splice(positionIdx, 1)
                            if (newState.foodPositions.length == 0) {
                                alert(`You've won the game with ${this.state.totalMovements} movements. `)
                                return;
                            }
                        }
                    })
                }

            }

            switch (e.key) {
                case 'ArrowUp':
                    if (newState.manPosition.x !== 0) {
                        newState.manPosition.x -= 1
                        incrementMovement({ x: newState.manPosition.x, y: newState.manPosition.y })
                    }
                    break;
                case 'ArrowDown':
                    if (newState.manPosition.x !== newState.rows - 1) {
                        newState.manPosition.x += 1
                        incrementMovement({ x: newState.manPosition.x, y: newState.manPosition.y })
                    }
                    break;
                case 'ArrowLeft':
                    if (newState.manPosition.y !== 0) {
                        newState.manPosition.y -= 1
                        incrementMovement({ x: newState.manPosition.x, y: newState.manPosition.y })
                    }
                    break;
                case 'ArrowRight':
                    if (newState.manPosition.y !== newState.columns - 1) {
                        newState.manPosition.y += 1
                        incrementMovement({ x: newState.manPosition.x, y: newState.manPosition.y })
                    }
                    break;

                default:
                    break;
            }

            this.setState(newState)
        }

        const { state: { rows, columns, manPosition, foodPositions } } = this

        const getContainsStatus = (x, y) => {
            if (manPosition.x === x && manPosition.y === y) {
                return 'man'
            }
            if (foodPositions.find((foodPosition) => foodPosition.x === x && foodPosition.y === y)) {
                return 'food'
            }
        }

        return (
            <div className="root" tabIndex="0" onKeyDown={handleKeyDown}>
                {
                    Array(rows).fill('rowItem').map((rowItem, rowIdx) => (
                        <div key={rowIdx} className="row">
                            {
                                Array(columns).fill('columnItem').map((columnItem, colIdx) => (
                                    <Cell key={colIdx} contains={getContainsStatus(rowIdx, colIdx)} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default HomeView