// Welcome message with time-based greeting
document.addEventListener('DOMContentLoaded', function() {
    // Skip if welcome message is disabled in config
    if (!profileConfig.welcomeMessage.enable) {
        document.getElementById('welcome-popup').style.display = 'none';
        return;
    }
    
    // Function to get time-based greeting
    function getTimeGreeting() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour >= 0 && hour <= 5) {
            return "凌晨"; // Midnight to early morning (12am-5am)
        } else if (hour >= 6 && hour <= 8) {
            return "早上"; // Early morning (6am-8am)
        } else if (hour >= 9 && hour <= 11) {
            return "上午"; // Morning (9am-11am)
        } else if (hour >= 12 && hour <= 13) {
            return "中午"; // Noon (12pm-1pm)
        } else if (hour >= 14 && hour <= 17) {
            return "下午"; // Afternoon (2pm-5pm)
        } else if (hour >= 18 && hour <= 22) {
            return "晚上"; // Evening (6pm-10pm)
        } else {
            return "深夜"; // Late night (11pm-12am)
        }
    }
    
    // Set the greeting
    document.getElementById('time-greeting').textContent = getTimeGreeting();
    
    // Show the welcome popup after the loading screen is clicked
    const loadingScreen = document.getElementById('loading-screen');
    const welcomePopup = document.getElementById('welcome-popup');
    
    loadingScreen.addEventListener('click', function() {
        // Show welcome popup after a short delay
        setTimeout(() => {
            welcomePopup.style.opacity = '1';
            welcomePopup.style.top = '20px';
            welcomePopup.style.pointerEvents = 'auto';
            welcomePopup.classList.add('glow-animation');
            
            // Hide the popup after the fade-in completes plus 2 seconds of full visibility
            setTimeout(() => {
                welcomePopup.style.opacity = '0';
                welcomePopup.style.top = '-50px';
                welcomePopup.style.pointerEvents = 'none';
                setTimeout(() => {
                    welcomePopup.classList.remove('glow-animation');
                }, 500);
            }, 5000);
        }, 1000);
    });
});
