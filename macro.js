function calculateMacros() {
    const calories = parseInt(document.getElementById("totalCalories").value);
    const goal = document.getElementById("goal").value;
    const result = document.getElementById("macroResult");
  
    if (isNaN(calories)) {
      result.innerHTML = "Please enter your total calories.";
      return;
    }
  
    let proteinPercent, fatPercent, carbPercent;
  
    switch (goal) {
      case "cutting":
        proteinPercent = 0.40;
        fatPercent = 0.25;
        carbPercent = 0.35;
        break;
      case "bulking":
        proteinPercent = 0.30;
        fatPercent = 0.20;
        carbPercent = 0.50;
        break;
      default:
        proteinPercent = 0.30;
        fatPercent = 0.25;
        carbPercent = 0.45;
    }
  
    const proteinGrams = Math.round((calories * proteinPercent) / 4);
    const fatGrams = Math.round((calories * fatPercent) / 9);
    const carbGrams = Math.round((calories * carbPercent) / 4);
  
    result.innerHTML = `
      <p><strong>Protein:</strong> ${proteinGrams}g</p>
      <p><strong>Fats:</strong> ${fatGrams}g</p>
      <p><strong>Carbohydrates:</strong> ${carbGrams}g</p>
    `;
  }
  