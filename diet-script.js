document.addEventListener('DOMContentLoaded', async () => {
    // Load meal data
    const response = await fetch('data/meals.json');
    const data = await response.json();
    const meals = data.meals;
    
    // Get DOM elements
    const mealContainer = document.getElementById('meal-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Render meals based on filter
    function renderMeals(filter = 'all') {
        mealContainer.innerHTML = '';
        
        const filteredMeals = filter === 'all' 
            ? meals 
            : meals.filter(meal => meal.category === filter);
        
        filteredMeals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `
                <img src="${meal.image}" alt="${meal.name}" 
                     class="w-full h-48 object-cover" 
                     onerror="this.src='https://via.placeholder.com/300x200?text=Meal+Image'">
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-lg font-bold">${meal.name}</h3>
                        <span class="${meal.category === 'veg' ? 'veg-badge' : 'nonveg-badge'}">
                            ${meal.category === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-2">${meal.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium">${meal.calories} kcal</span>
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded">${meal.type}</span>
                    </div>
                </div>
            `;
            mealContainer.appendChild(mealCard);
        });
    }
    
    // Initialize with all meals
    renderMeals();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            button.classList.add('active', 'bg-blue-500', 'text-white');
            button.classList.remove('bg-gray-200', 'hover:bg-gray-300');
            
            // Filter meals
            const filter = button.dataset.filter;
            renderMeals(filter);
        });
    });
});