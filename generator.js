const workouts = {
    strength: ["Push-ups", "Deadlifts", "Pull-ups", "Squats", "Bench Press"],
    endurance: ["Jumping Jacks", "Burpees", "Mountain Climbers", "Running", "Cycling"],
    fatloss: ["HIIT", "Jump Rope", "Sled Push", "Stair Climbs", "Box Jumps"]
  };
  
  function generateWorkout() {
    const goal = document.getElementById("goal").value;
    const duration = parseInt(document.getElementById("duration").value || 30);
    const output = document.getElementById("output");
  
    const plan = [];
    const exercises = workouts[goal];
    for (let i = 0; i < Math.min(5, exercises.length); i++) {
      const random = exercises[Math.floor(Math.random() * exercises.length)];
      plan.push(random);
    }
  
    output.innerHTML = `
      <h2 class="font-semibold text-lg mb-2">Your Workout Plan:</h2>
      <ul class="list-disc pl-6">
        ${plan.map(e => `<li>${e} - ${Math.floor(duration / plan.length)} min</li>`).join("")}
      </ul>
    `;
  }
  