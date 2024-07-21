import { forwardRef, useImperativeHandle, useRef } from "react"
const ResultModal = forwardRef(function ResultModal({ targetTime, timeRemaing, onReset }, ref) {

    const dialog = useRef();

    const userLost = timeRemaing <= 0;
    const formattedRemainingTime = (timeRemaing / 1000).toFixed(2)
    const score = Math.round((1 - timeRemaing / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    });



    return (
        <dialog ref={dialog} className="result-modal"  >
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score :{score}</h2>}
            <p>
                The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong>
            </p>
            <p>
                You stopped the timer with <strong> {formattedRemainingTime} seconds left.</strong>
            </p>
            <form action="dialog" onSubmit={onReset}>
                <button >Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal;



