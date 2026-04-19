// HTML Variables
let Output = document.getElementById("output");
//Array
let data = [];

document.addEventListener("keydown", showall_names);
function showall_names(event) {
  let input = document.getElementById("input");
  let names = input.value;
  let total_names = document.getElementById("total");

  if (event.code === "Enter") {
    data.push(names);
    Output.innerHTML += `<p>${data[data.length - 1]}</p>`;
    total_names.innerHTML = "";
    total_names.innerHTML += `Total Names: ${data.length}`;
    input.value = ""; // This clears input field
  }
}

document.getElementById("btn").addEventListener("click", group_maker);

function group_maker() {
  let students_per_group = document.getElementById("num").value;
  let temp_data = data; // Copy of original data
  let groups = [];
  console.log(temp_data);
  if (temp_data.length === 0 || students_per_group <= 0) {
    alert(`Enter some names / Students per group must be greater than 0`);
  }

  //Create the main groups
  while (temp_data.length >= students_per_group) {
    let current_group = [];
    for (let i = 0; i < students_per_group; i++) {
      let randnum = Math.floor(Math.random() * temp_data.length);
      console.log(randnum);
      let picked = temp_data.splice(randnum, 1);
      current_group.push(picked);
    }
    groups.push(current_group);
  }
  console.log(groups);

  //Handle the leftovers
  let groupIndex = 0;
  while (temp_data.length > 0) {
    let randnum = Math.floor(Math.random() * temp_data.length);
    let picked = temp_data.splice(randnum, 1);

    //Add the student to group 0, then group 1, etc.
    groups[groupIndex].push(picked);

    // Move to the next group for the next leftover student
    groupIndex = groupIndex + 1 <= groups.length;
  }

  // display results
  Output.innerHTML = "<h3>Groups:</h3>";
  groups.forEach((group, index) => {
    Output.innerHTML += `<p><strong>Group ${index + 1}:</strong> ${group}</p>`;
  });
}
