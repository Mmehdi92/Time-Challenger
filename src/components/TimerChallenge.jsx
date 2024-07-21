import { useState, useRef } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000)
    // console.log(remainingTime)
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if (remainingTime <= 0) {
        clearInterval(timer.current);
     
        dialog.current.open();
    }
    function handleStart() {
        timer.current = setInterval(() => {
            setRemainingTime((prevTime)=>{
                return prevTime -10
            });
        }, 10)

    }
    function handleReset(){
        setRemainingTime(targetTime * 1000);
    }

    function handleStop() {
        dialog.current.open()
        clearInterval(timer.current)
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} onReset={handleReset}  timeRemaing={remainingTime}/>
            <section className="challenge">
                <h2>{title}</h2>
                {/* {timerExpired && <p>You Lost</p>} */}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : ' Start'} Challenge</button>
                </p>

                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? ' Time is running .. ' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}