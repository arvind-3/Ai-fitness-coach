 Settings Storage
const settings = JSON.parse(localStorage.getItem('fitnessSettings')) || {
    theme: 'light',
    notifications: {
        workoutReminders: true,
        mealReminders: true,
        progressReports: false
    },
    privacy: {
        dataSharing: false,
        dataCollection: true
    }
};

// Apply theme
function applyTheme(theme) {
    document.documentElement.classList.remove('dark');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1F2937');
    } else {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F9FAFB');
    }
}

// Initialize settings
function initializeSettings() {
    // Theme
    const currentTheme = settings.theme;
    applyTheme(currentTheme);
    document.querySelector(`.theme-option[data-theme="${currentTheme}"]`).classList.add('selected');

    // Notifications
    document.querySelectorAll('.toggle-checkbox').forEach(checkbox => {
        const settingName = checkbox.name;
        const [category, key] = settingName.includes('.') ? 
            settingName.split('.') : ['notifications', settingName];
        
        checkbox.checked = settings[category][key];
        updateToggleUI(checkbox);
    });
}

// Update toggle UI
function updateToggleUI(checkbox) {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
        label.classList.add('bg-green-500');
        label.classList.remove('bg-gray-300');
    } else {
        label.classList.add('bg-gray-300');
        label.classList.remove('bg-green-500');
    }
}

// Save settings
function saveSettings() {
    // Theme
    settings.theme = document.querySelector('.theme-option.selected').dataset.theme;

    // Notifications
    document.querySelectorAll('.toggle-checkbox').forEach(checkbox => {
        const settingName = checkbox.name;
        const [category, key] = settingName.includes('.') ? 
            settingName.split('.') : ['notifications', settingName];
        
        settings[category][key] = checkbox.checked;
    });

    localStorage.setItem('fitnessSettings', JSON.stringify(settings));
    showToast('Settings saved successfully!');
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fadeIn';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('animate-fadeOut');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Policy modal functionality
function setupPolicyModal() {
    const modal = document.getElementById('policyModal');
    const openBtn = document.getElementById('viewPolicyBtn');
    const closeBtn = document.getElementById('closePolicyBtn');

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setupPolicyModal();
    initializeSettings();

    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            settings.theme = this.dataset.theme;
            applyTheme(settings.theme);
            saveSettings();
        });
    });

    // Toggle switches
    document.querySelectorAll('.toggle-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateToggleUI(this);
            saveSettings();
        });
    });

    // Privacy settings
    document.querySelector('#exportData').addEventListener('click', () => {
        const dataStr = JSON.stringify(settings, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'fitness-settings.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    });
});