function aiSuggestRoutine() {
    const routines = [
      "Full Body HIIT 3x per week",
      "Upper/Lower Split 4x per week",
      "Push/Pull/Legs (PPL) 6x per week",
      "Cardio + Strength combo (Alternate Days)",
      "Yoga + Bodyweight Mix"
    ];
  
    const suggestion = routines[Math.floor(Math.random() * routines.length)];
    document.getElementById("aiRoutine").innerHTML = `<p><strong>Suggested:</strong> ${suggestion}</p>`;
  }
  