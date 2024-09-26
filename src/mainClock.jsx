import React from 'react'
import {useState} from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
function MainClock(props) {
    const [isStart, setIsStart] = useState(false);
    const [sessionTime, setSessionTime] = useState(60 * 25);
    const [breakTime, setBreakTime] = useState(300);
    const [isSession, setIsSession] = useState(true);
    const [currentBreakTime, setCurrentBreakTime] = useState(300);
    const [currentSessionTime, setCurrentSessionTime] = useState(60 * 25);

    const handleRunOrStop = () => {
        setIsStart(!isStart);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleIncreaseSession = () => {
        if (!isStart) {
            setSessionTime((prev) => {
                const updated = prev + 60 - (prev % 60);
                setCurrentSessionTime(updated);
                return updated;
            });
        }
    };

    const handleDecreaseSession = () => {
        if (!isStart && sessionTime > 60) {
            setSessionTime((prev) => {
                const updated = prev - 60 - (prev % 60);
                setCurrentSessionTime(updated);
                return updated;
            });
        }
    };

    const handleIncreaseBreak = () => {
        if (!isStart) {
            setBreakTime((prev) => {
                const updated = prev + 60 - (prev % 60);
                setCurrentBreakTime(updated);
                return updated;
            });
        }
    };

    const handleDecreaseBreak = () => {
        if (!isStart && breakTime > 60) {
            setBreakTime((prev) => {
                const updated = prev - 60 - (prev % 60);
                setCurrentBreakTime(updated);
                return updated;
            });
        }
    };

    useEffect(() => {
        let interval = null;
        if (isStart) {
            interval = setInterval(() => {
                if (isSession) {
                    setSessionTime((prev) => {
                        if (prev > 0) return prev - 1;
                        setIsSession(false);
                        return breakTime;
                    });
                } else {
                    setBreakTime((prev) => {
                        if (prev > 0) return prev - 1;
                        setIsSession(true);
                        return sessionTime;
                    });
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStart, isSession, breakTime, sessionTime]);

    return (
        <main>
            <div className="label">
                <label id="break-label">
                    <p className="break-length">Break Length</p>
                    <div className="control-container">
                        <button onClick={handleDecreaseBreak} className="break-decrement">
                            <span className="material-symbols-outlined">arrow_downward</span>
                        </button>
                        <p id="break-length">{Math.floor(currentBreakTime / 60)}</p>
                        <button onClick={handleIncreaseBreak} className="break-increment">
                            <span className="material-symbols-outlined">arrow_upward</span>
                        </button>
                    </div>
                </label>
                <label id="session-label">
                    <p className="session-length">Session Length</p>
                    <div className="control-container">
                        <button onClick={handleDecreaseSession} className="session-decrement">
                            <span className="material-symbols-outlined">arrow_downward</span>
                        </button>
                        <p id="session-length">{Math.floor(currentSessionTime / 60)}</p>
                        <button onClick={handleIncreaseSession} className="session-increment">
                            <span className="material-symbols-outlined">arrow_upward</span>
                        </button>
                    </div>
                </label>
            </div>
            <div className="countdown-container">
                <div className={(sessionTime <= 60 || breakTime <= 60) ? "display red" : "display"}>
                    <p id="timer-label">{isSession ? 'Session' : 'Break'}</p>
                    <p id="time-left">{isSession ? formatTime(sessionTime) : formatTime(breakTime)}</p>
                </div>
                <div className="control-container b">
                    <button onClick={handleRunOrStop} id="start_stop">
                        <span className="material-symbols-outlined">
                            {isStart ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                    <button onClick={() => {
                        setBreakTime(300);
                        setSessionTime(60 * 25);
                        setIsStart(false);
                        setCurrentBreakTime(300);
                        setCurrentSessionTime(60 * 25);
                    }} id="reset">
                        <span className="material-symbols-outlined">restart_alt</span>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default MainClock;
