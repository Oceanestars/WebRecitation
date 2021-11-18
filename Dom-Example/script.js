var submitButton = document.getElementById("submitButton");
var clearButton = document.getElementById("clearButton");
var listItem = document.querySelectorAll('li');

clearButton.addEventListener("click", clearForm);
submitButton.addEventListener("click", submitForm);
// Click on a li to strikethrough and on double click it removes the strikethrough
listItem.forEach((ele) => {
  ele.onclick = (ele) => {
    ele.target.style = "text-decoration:line-through";
  };
  ele.ondblclick = (ele) => {
    ele.target.style = "text-decoration:none";
  };
});

function submitForm() {
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  console.log(firstName);
  if (firstName == "" && lastName == "") {
    alert("Please provide your first and last name");
  }
  else {
    alert("Thank you " + firstName + "\nYou've submited this form");
    submitButton.disabled = true;
  }
}

function clearForm() {
  document.getElementById("fname").value = "";

}

const imagesArray = ["RandallPark.jpeg", "StevenYeun.jpeg", "SimuLiu.jpeg"];
let index = 0;

document.getElementById("buttonImage").addEventListener("click", buttonClicked);

function buttonClicked() {
  console.log(imagesArray[index]);
  document.getElementById("theImage").src = imagesArray[index];
  if (index >= 2) {
    index = 0;
  } else {
    index++;
  }
}

//querySelector and querySelectorAll example

var test1 = document.querySelector(".test1");
var test2 = document.querySelector(".test1")[0];
var test3 = document.querySelectorAll(".test1");
var test4 = document.querySelectorAll(".test1")[0];
var test5 = document.querySelector("div");
var test6 = document.querySelectorAll("div");
var test7 = document.querySelector("div")[0];
var test8 = document.querySelectorAll("div")[0];

console.log("test 1: " + JSON.stringify(test1));
console.log("test 2: " + test2);
console.log("test 3: " + test3);
console.log("test 4: " + test4);
console.log("test 5: " + test5);
console.log("test 6: " + JSON.stringify(test6));
console.log("test 7: " + test7);
console.log("test 8: " + JSON.stringify(test8));