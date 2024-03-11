// Function to save data to local storage
function saveData() {
    // Get values from the form
    var creatineTaken = document.getElementById('creatineCheckbox').checked;
    var waterAmount = document.getElementById('waterInput').value;

    // Save values to local storage
    localStorage.setItem('creatineTaken', creatineTaken);
    localStorage.setItem('waterAmount', waterAmount);

    // Show confirmation message
    alert("Data saved successfully!");
}

// Function to load data from local storage
function loadData() {
    // Load values from local storage
    var creatineTaken = localStorage.getItem('creatineTaken');
    var waterAmount = localStorage.getItem('waterAmount');

    // Update form elements with loaded values
    document.getElementById('creatineCheckbox').checked = creatineTaken === 'true';
    document.getElementById('waterInput').value = waterAmount;
    document.getElementById('waterAmount').innerText = (waterAmount || 0) + " liters"; // Display 0 if waterAmount is null
}

// Function to display reminder notifications
function showReminder() {
    // Check if creatine is not taken
    var creatineTaken = localStorage.getItem('creatineTaken');
    if (creatineTaken !== 'true') {
        alert("Don't forget to take your creatine today!");
    }

    // Check if water intake is insufficient
    var waterAmount = localStorage.getItem('waterAmount');
    if (waterAmount < 3) {
        alert("Remember to drink more water! Your target is 3 liters per day.");
    }
}

// Reset data daily
function resetDaily() {
    // Check if it's a new day (based on Dutch timezone)
    var lastReset = localStorage.getItem('lastReset');
    var now = new Date();
    var today = now.toDateString();

    if (lastReset !== today) {
        // Reset data
        localStorage.removeItem('creatineTaken');
        localStorage.removeItem('waterAmount');

        // Update last reset date
        localStorage.setItem('lastReset', today);
    }
}

// Function to schedule notification reminders
function scheduleNotifications() {
    // Set initial notification time to 8 AM
    var notificationTime = new Date();
    notificationTime.setHours(8, 0, 0, 0); // Set to 8:00 AM

    // Schedule notifications every 2 hours starting from 8 AM
    setInterval(function() {
        // Get current time
        var currentTime = new Date();

        // Check if it's time for a notification (every 2 hours)
        if (currentTime.getHours() >= 8 && currentTime.getHours() % 2 === 0 && currentTime.getMinutes() === 0) {
            showReminder();
        }
    }, 1000 * 60); // Check every minute for the current hour and minute
}

// Function to update water amount display in real-time
function updateWaterAmount() {
    var waterAmount = document.getElementById('waterInput').value;
    document.getElementById('waterAmount').innerText = (waterAmount || 0) + " liters"; // Display 0 if waterAmount is null
}

// Load data when the page is loaded, reset daily, show reminders, and schedule notifications
window.onload = function() {
    loadData();
    resetDaily();
    showReminder();
    scheduleNotifications();

    // Update water amount display in real-time while dragging
    document.getElementById('waterInput').addEventListener('input', updateWaterAmount);
};
