document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const moodOptions = ['Happy', 'Sad', 'Tired', 'Angry', 'Excited', 'Relaxed', 'Anxious', 'Grateful', 'Stressed', 'Content', 'Confused', 'Hopeful', 'Frustrated', 'Lonely', 'Inspired', 'Loved'];
    const moodColors = ['#ffd700', '#009688', '#8a2be2', '#ff4500', '#ff6347', '#4caf50', '#607d8b', '#ffeb3b', '#f44336', '#03a9f4', '#9c27b0', '#ff9800', '#e91e63', '#795548', '#ff5722', '#e91e63'];

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    function updateCalendar() {
        calendar.innerHTML = "";
        monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = i;
            const dateString = date.toISOString().split("T")[0];
            const isPastDate = date < currentDate;
            const isFutureDate = date > currentDate;
            const isToday = dateString === currentDate.toISOString().split("T")[0];
            if (isFutureDate || isToday) {
                if (isToday) {
                    const moodSelect = document.createElement("select");
                    moodSelect.classList.add("mood-select");
                    moodOptions.forEach((option, index) => {
                        const moodOption = document.createElement("option");
                        moodOption.value = option.toLowerCase();
                        moodOption.textContent = option;
                        moodOption.style.backgroundColor = moodColors[index];
                        moodSelect.appendChild(moodOption);
                    });
                    moodSelect.addEventListener("change", function() {
                        const selectedMoodIndex = moodOptions.findIndex(option => option.toLowerCase() === moodSelect.value);
                        dayElement.style.backgroundColor = moodColors[selectedMoodIndex];
                        localStorage.setItem(dateString, moodSelect.value);
                    });
                    const storedMood = localStorage.getItem(dateString);
                    if (storedMood && moodOptions.includes(storedMood)) {
                        const selectedMoodIndex = moodOptions.findIndex(option => option.toLowerCase() === storedMood);
                        dayElement.style.backgroundColor = moodColors[selectedMoodIndex];
                        moodSelect.value = storedMood.toLowerCase();
                    }
                    dayElement.appendChild(moodSelect);
                } else {
                    dayElement.addEventListener("click", function() {
                        alert("You can only enter mood for today's date.");
                    });
                }
            } else {
                dayElement.classList.add("past");
                dayElement.addEventListener("click", function() {
                    alert("You can only enter mood for today's date.");
                });
            }
            calendar.appendChild(dayElement);
        }
    }

    function showPrevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        updateCalendar();
    }

    function showNextMonth() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        updateCalendar();
    }

    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");

    prevMonthButton.addEventListener("click", showPrevMonth);
    nextMonthButton.addEventListener("click", showNextMonth);

    updateCalendar();
});
