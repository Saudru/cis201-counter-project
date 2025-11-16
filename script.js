// Variables to store timer information
let timerInterval = null;
let targetDate = null;

// Get the Start button and add a click event
document.getElementById('startBtn').addEventListener('click', function() {
    // Get the number of days from the input
    const daysInput = document.getElementById('daysInput');
    const days = parseInt(daysInput.value);
    
    // Check if the input is valid (between 1 and 365)
    if (isNaN(days) || days < 1 || days > 365) {
        alert('Please enter a number between 1 and 365');
        return;
    }
    
    // Calculate the target date (today + number of days)
    const today = new Date();
    targetDate = new Date(today);
    targetDate.setDate(today.getDate() + days);
    
    // Show the target date
    document.getElementById('targetDate').textContent = targetDate.toLocaleDateString();
    
    // Hide welcome message, show countdown
    document.getElementById('initialMessage').style.display = 'none';
    document.getElementById('countdownDisplay').style.display = 'block';
    
    // Update countdown immediately, then every second
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
});

// Get the Reset button and add a click event
document.getElementById('resetBtn').addEventListener('click', function() {
    // Stop the timer
    clearInterval(timerInterval);
    
    // Hide countdown, show welcome message
    document.getElementById('countdownDisplay').style.display = 'none';
    document.getElementById('initialMessage').style.display = 'block';
    
    // Reset the input to default value
    document.getElementById('daysInput').value = 7;
});

// Function to update the countdown display
function updateCountdown() {
    // Get current time
    const now = new Date().getTime();
    
    // Calculate difference between target date and now
    const timeDifference = targetDate.getTime() - now;
    
    // If countdown is finished
    if (timeDifference <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        clearInterval(timerInterval);
        alert('🎉 Countdown finished!');
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    // Update the display (pad with zero if needed: 5 becomes "05")
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

