function calculateCalories() {
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activity = parseFloat(document.getElementById("activity").value);
    const result = document.getElementById("result");
  
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      result.innerHTML = "Please fill all fields correctly.";
      return;
    }
  
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const calories = Math.round(bmr * activity);
  
    result.innerHTML = `Your estimated daily calorie need is <strong>${calories} kcal</strong>.`;
  }
  