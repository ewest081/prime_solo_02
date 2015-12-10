// ! ! !
// Three Bugs

//1. Corrected the var input into the document.creatTextNode so it would display the appropriate array
//2. Fixed a math error in getBaseSTI; mysterious -1
//3. Added Math.round, and .toFixed() in numerous locations to get the output to diaplay properly
//4. Created new displaySpace var to add spaces in displayed text of array

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
  array[i] = calculateSTI(array[i]);
 	newEl = document.createElement('li');
  //Incorrect input for createTextNode; it was displaying the wrong array (thus the NaNs)
  // newText = document.createTextNode(array);
  //Created new displaySpace var to add spaces in displayed text of array
	var displaySpace = array[i].join(', ');
  newText = document.createTextNode(displaySpace);
  newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array1){
  var newArray = [];

  newArray[0] = array1[0];
  var employeeNumber = array1[1];
  var baseSalary = array1[2];
  var reviewScore = array1[3]; 
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

//Math.round the below numbers so they'll be whole
  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus));
  newArray[3] = Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;

}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
    return basePercent
  // return basePercent - 1;
  //why -1??? I don't know why that was there. Now it's not and it works correctly.
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = salary;
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}