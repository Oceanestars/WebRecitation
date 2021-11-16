// https://apipheny.io/free-api/ <- Grabbed api from there

// api url
const catapi_url =
  "https://catfact.ninja/fact";
const ageapi_url = "https://api.agify.io?name=";
var firstName = "";

// Defining async function
// I have a default parameter here so I don't have to pass in anything in the onclick in the HTML side, and since for the cat I do pass in the url, it overrides my default one
async function getapi(url = ageapi_url) {
  var firstNameID = document.getElementById("fname");
  if (firstNameID) firstName = document.getElementById("fname").value;
  url = url.concat(firstName);
  if (firstName == null || firstName == "") {
    // This is sort of catching the case if you leave the input blank
    document.getElementById("displayAge").innerHTML = "Age Predicted: No Name Provided";
  }

  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(response.status);
  }
  if (url == catapi_url) {
    showCatFact(data);
  }
  if (url == ageapi_url.concat(firstName)) {
    showAgePredicted(data);
  }

}
// Calling that async function
getapi(catapi_url);


function showCatFact(data) {
  document.getElementById("fact").innerHTML = data.fact;
}

function showAgePredicted(data) {
  document.getElementById("displayAge").innerHTML = "Age Predicted: " + data.age;
}
