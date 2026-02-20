// Signup Modal Integration
document.addEventListener('DOMContentLoaded', function() {
    // Load modal HTML if not already present
    if (!document.getElementById('signupModal')) {
        const container = document.createElement('div');
        container.id = 'signupModalContainer';
        document.body.appendChild(container);
        
        fetch('components/signup-modal.html')
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                initModalHandlers();
            });
    } else {
        initModalHandlers();
    }

    function initModalHandlers() {
        // Open modal when user icon clicked
        document.addEventListener('click', function(e) {
            if (e.target.closest('#userIcon')) {
                document.getElementById('signupModal').classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close modal
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('signupModal');
            if (e.target.closest('#closeSignup') || e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        // Social login buttons
        document.querySelector('.fa-google')?.closest('button')?.addEventListener('click', () => {
            alert('Redirecting to Google signup...');
        });

        document.querySelector('.fa-facebook-f')?.closest('button')?.addEventListener('click', () => {
            alert('Redirecting to Facebook signup...');
        });

        // Form submission
        document.getElementById('signupForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Account created successfully!');
            this.reset();
            document.getElementById('signupModal').classList.add('hidden');
        });
    }
});