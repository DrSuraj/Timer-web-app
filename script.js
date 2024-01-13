    const setButton = document.getElementById("set-btn");
    const activeTimersContainer = document.getElementById(
    "active-timers-container"
    );
    const noTimerDisplayMessage = document.getElementById("no-timers-display-msg");
    const audio = document.getElementById("audio-file");
    let numberOfActiveTimers = 0;

    
    function addNewTimer() {
        const hours = Number(document.getElementById("hour").value);
        const minutes = Number(document.getElementById("minute").value);
        const seconds = Number(document.getElementById("seconds").value);
    
        
        const totalTime = hours * 3600 + minutes * 60 + seconds;
    
        if (totalTime > 0) {
        const newTimerCard = document.createElement("div");
        newTimerCard.classList.add("timer-card");
        newTimerCard.innerHTML = `
            <span>Time Left :</span>
            <span id="timer-container">
                <input id="hour" type="number" min="0" max="24" placeholder="${hours}">
                <input id="minute" type="number" min="0" max="60" placeholder="${minutes}">
                <input id="seconds" type="number" min="0" max="60" placeholder="${seconds}">
            </span>
            <button class="btn" onclick="deleteTimer(this)">Delete</button>
            `;
        activeTimersContainer.appendChild(newTimerCard);
        numberOfActiveTimers++;
        noTimerDisplayMessage.style.display = "none";
        runtimer(totalTime, newTimerCard);
        }
    }
    
    function runtimer(totalTime, newTimerCard) {
        let timerContainer = newTimerCard.querySelector("#timer-container");
        let hour = timerContainer.querySelector("#hour");
        let minute = timerContainer.querySelector("#minute");
        let seconds = timerContainer.querySelector("#seconds");
    
        
        const myTimerUpdate = setInterval(() => {
        if (totalTime == 0) {
            newTimerCard.classList.toggle("time-up");
            newTimerCard.innerHTML = `
                        <span></span>
                        <span>Timer is Up!</span>
                        <button class="btn delete-btn" onclick="deleteTimer(this)">Stop</button>
                    `;
            audio.play();
            clearInterval(myTimerUpdate);
        } else {
            --totalTime;
            hour.value = Math.floor(totalTime / 3600);
            minute.value = Math.floor((totalTime % 3600) / 60);
            seconds.value = totalTime % 60;
        }
        }, 1000);
    }
    
    // delete timer function
    function deleteTimer(deleteButton) {
        audio.pause();
        let currentTimerCard = deleteButton.parentNode;
        currentTimerCard.remove();
        --numberOfActiveTimers;
        if (numberOfActiveTimers == 0) {
        noTimerDisplayMessage.style.display = "block";
        }
    }
    // event listeners
    setButton.addEventListener("click", addNewTimer);