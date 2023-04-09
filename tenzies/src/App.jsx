import React from 'react'
import Die from './components/Die'

export default function App() {
    function initializeDice() {
        let tempDice = []
        for (let i = 0; i<10; i++) {
            tempDice.push( {
                held:false,
                value: (Math.floor(Math.random()*6) + 1)
            })
        }
        return tempDice
    }

    const [diceInfo, setDiceInfo] = React.useState(initializeDice())

    function toggleHold(index) {
        setDiceInfo(prevDiceInfo => {
            let infoCopy = [...prevDiceInfo];
            infoCopy[index].held = !infoCopy[index].held;
            return infoCopy;
        })
    }

    function createDies() {
        let dies = []
        for (let i = 0; i <10; i++) {
            dies.push(<Die key={i} id={i} value={diceInfo[i].value} held={diceInfo[i].held} toggleHold={toggleHold}/>)
        }
        return dies;
    }

    function handleRoll() {
        setDiceInfo(prevInfo => {
            return (
                prevInfo.map(die => {
                    if (die.held) {
                        return die
                    } else {
                        return {
                            ...die,
                            value: (Math.floor(Math.random()*6) + 1)
                        }
                    }
                })
            )

        })

    }

    const dieElements = createDies();

    return (
        <main>
            <div className="game">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dieholder">
                    {dieElements}
                </div>
                <button className='rolldice' onClick={handleRoll} >Roll Dice</button>
            </div>
        </main>
    )
}