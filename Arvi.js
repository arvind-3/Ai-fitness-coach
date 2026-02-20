document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Back to top functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Webcam and AI Form Analysis
const toggleWebcam = document.getElementById('toggleWebcam');
const webcam = document.getElementById('webcam');
const poseCanvas = document.getElementById('poseCanvas');
let isWebcamOn = false;

toggleWebcam.addEventListener('click', async () => {
    if (!isWebcamOn) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcam.srcObject = stream;
            toggleWebcam.innerHTML = '<i class="fas fa-video-slash mr-2"></i> Disable Camera';
            isWebcamOn = true;
            
            // Mock AI analysis (would be replaced with real pose detection)
            setInterval(() => {
                const feedbackContainer = document.getElementById('feedbackContainer');
                const randomFeedback = [
                    'Great form! Keep it up!',
                    'Try to keep your back straight',
                    'Bend your knees slightly more',
                    'Perfect alignment!',
                    'Slow down your movement for better control'
                ];
                
                feedbackContainer.innerHTML = `
                    <div class="p-4 bg-green-50 rounded-lg">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 text-green-500">
                                <i class="fas fa-check-circle text-xl"></i>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-lg font-medium text-green-800">Form Feedback</h3>
                                <p class="mt-1 text-green-700">${randomFeedback[Math.floor(Math.random() * randomFeedback.length)]}</p>
                            </div>
                        </div>
                    </div>
                `;
            }, 3000);
        } catch (err) {
            console.error("Error accessing webcam:", err);
        }
    } else {
        webcam.srcObject.getTracks().forEach(track => track.stop());
        toggleWebcam.innerHTML = '<i class="fas fa-video mr-2"></i> Enable Camera';
        isWebcamOn = false;
    }
});

// Wearable device simulation
const connectWearable = document.getElementById('connectWearable');
const heartRate = document.getElementById('heartRate');

connectWearable.addEventListener('click', () => {
    connectWearable.innerHTML = '<i class="fas fa-sync-alt fa-spin mr-2"></i> Connecting...';
    
    // Simulate device connection
    setTimeout(() => {
        connectWearable.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Connected';
        connectWearable.classList.remove('btn-secondary');
        connectWearable.classList.add('bg-green-100', 'text-green-800', 'hover:bg-green-200');
        
        // Simulate heart rate updates
        setInterval(() => {
            heartRate.textContent = `${Math.floor(Math.random() * 40) + 70} bpm`;
        }, 2000);
    }, 1500);
});

// Rest Timer Functionality
const timerCircle = document.getElementById('timerCircle');
const timerDisplay = document.getElementById('timerDisplay');
const startTimer = document.getElementById('startTimer');
const resetTimer = document.getElementById('resetTimer');
const timerRange = document.getElementById('timerRange');
let timerInterval;
let timeLeft = 60;
let totalTime = 60;

timerRange.addEventListener('input', function() {
    timeLeft = parseInt(this.value);
    totalTime = timeLeft;
    updateTimerDisplay();
});

startTimer.addEventListener('click', function() {
    if (this.innerHTML.includes('Start')) {
        this.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                startTimer.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
                // Alert sound when timer ends
                try {
                    new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3').play();
                } catch (err) {
                    console.error("Could not play audio:", err);
                }
            }
        }, 1000);
    } else {
        this.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
        clearInterval(timerInterval);
    }
});

resetTimer.addEventListener('click', function() {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    updateTimerDisplay();
    startTimer.innerHTML = '<i class="fas fa-play mr-2"></i> Start';
});

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    const circumference = 283;
    const offset = circumference - (timeLeft / totalTime) * circumference;
    timerCircle.style.strokeDashoffset = offset;
}

// Initialize timer display
updateTimerDisplay();

// NEW CODE: Workout Generator Functionality
document.querySelector('.btn-primary i.fas.fa-magic').closest('button').addEventListener('click', function() {
    const workoutType = document.querySelector('select:nth-of-type(1)').value;
    const duration = document.querySelector('input[type="number"]').value;
    const difficulty = document.querySelector('select:nth-of-type(2)').value;
    const focusArea = document.querySelector('select:nth-of-type(3)').value;
    
    // Alert to confirm workout generation
    alert(`Generated ${workoutType} workout for ${duration} minutes, ${difficulty} difficulty, focusing on ${focusArea}`);
    
    // You could insert the generated workout into the DOM here
    // For demonstration, we'll add a simple success message
    const workoutGenerator = document.querySelector('.max-w-6xl .bg-white:nth-of-type(1)');
    const successMessage = document.createElement('div');
    successMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded';
    successMessage.innerHTML = `<i class="fas fa-check-circle mr-2"></i> ${workoutType} workout successfully generated!`;
    workoutGenerator.appendChild(successMessage);
});

// NEW CODE: Exercise Library Search Functionality
document.querySelector('.btn-secondary i.fas.fa-search').closest('button').addEventListener('click', function() {
    // Create a search input that appears when search is clicked
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mt-4 mb-6';
    searchContainer.innerHTML = `
        <div class="relative">
            <input type="text" placeholder="Search exercises..." class="w-full p-2 pl-10 border border-gray-300 rounded-md">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
            </div>
        </div>
    `;
    
    // Insert the search container after the heading
    const libraryHeading = document.querySelector('.max-w-6xl h2.text-2xl.font-bold.text-gray-800');
    if (libraryHeading.nextElementSibling.classList.contains('relative')) {
        // Search already exists, focus on it
        libraryHeading.nextElementSibling.querySelector('input').focus();
    } else {
        libraryHeading.parentNode.insertBefore(searchContainer, libraryHeading.nextElementSibling);
        searchContainer.querySelector('input').focus();
    }
});

// NEW CODE: Add to Workout Functionality
const addToWorkoutButtons = document.querySelectorAll('.exercise-card .btn-primary');
addToWorkoutButtons.forEach(button => {
    button.addEventListener('click', function() {
        const exerciseName = this.closest('.exercise-card').querySelector('h3').textContent;
        
        // Change button text and style to indicate it's been added
        this.innerHTML = '<i class="fas fa-check mr-2"></i> Added';
        this.classList.add('bg-green-500');
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50';
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i> ${exerciseName} added to your workout`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});