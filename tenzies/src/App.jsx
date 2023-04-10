import React from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'

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
    const [rollNumber, setRollNumber] = React.useState(0)
    const [highScore, setHighScore] = React.useState(() => {return (localStorage.getItem('highscore') || 100)})
    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        if (!tenzies){
            checkWin()
        }
    }, [diceInfo])

    function toggleHold(index) {
        setDiceInfo(prevDiceInfo => {
            let infoCopy = [...prevDiceInfo];
            infoCopy[index].held = !infoCopy[index].held;
            return infoCopy;
        })
    }

    function restartGame() {
        setDiceInfo(initializeDice);
        setRollNumber(0);
        setTenzies(false);
    }

    function createDies() {
        let dies = []
        for (let i = 0; i <10; i++) {
            dies.push(<Die key={i} id={i} value={diceInfo[i].value} held={diceInfo[i].held} toggleHold={toggleHold}/>)
        }
        return dies;
    }

    function checkWin() {
        let check = diceInfo[0].value;
        let win = true
        diceInfo.forEach(dice => {
            if (dice.value != check) {
                win = false
            }
        })
        if (win == true) {
            alert('you win')
            if (rollNumber < highScore) {
                setHighScore(rollNumber)
                localStorage.setItem('highscore', rollNumber)
            }
            setTenzies(true);
        }
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

        setRollNumber(prevRollNumber => prevRollNumber + 1)
        
    }

    const dieElements = createDies();

    return (
        <main>
            {tenzies && <Confetti />}
            <div className="game">
                <h1>{tenzies ? 'You Win!' : 'Tenzies'}</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="rollinfo">
                    <div>
                        <h3>
                            # Of Rolls: <strong>{rollNumber}</strong>
                        </h3>
                    </div>
                    <div>
                        <h3>
                            High Score: <strong>{highScore}</strong>
                        </h3>
                    </div>
                </div>
                <div className="dieholder">
                    {dieElements}
                </div>
                <button className='rolldice' onClick={(tenzies) ? restartGame : handleRoll} >{(tenzies) ? 'New Game' : 'Roll Dice'}</button>
            </div>
        </main>
    )
}