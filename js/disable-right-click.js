// Disable right-click and context menu only if enabled in config
document.addEventListener('DOMContentLoaded', function() {
    if (profileConfig.advanced.disableRightClick) {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Optional: Add a subtle visual effect when attempting to right-click
        document.addEventListener('mousedown', function(e) {
            if (e.button === 2) { // Right mouse button
                // Create a ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                ripple.style.left = e.clientX + 'px';
                ripple.style.top = e.clientY + 'px';
                document.body.appendChild(ripple);
                
                // Remove the ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            }
        });
    }
});
