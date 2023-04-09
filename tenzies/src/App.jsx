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



    const dieElements = createDies();
    return (
        <main>
            <div className="game">
                <div className="dieholder">
                    {dieElements}
                </div>
            </div>
        </main>
    )
}