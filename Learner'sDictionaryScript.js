//search for example



//begin a fetch to merriam webster API
function merriamApiRequest(word){
 const url = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=06eed36a-18cf-4365-8cf8-5ae5edd1c537`;

 fetch(url)
 .then(response => {
   if (!response.ok) {
     throw new Error('Network response was not OK');
   }
   return response.json();
 })
 .then(data => { 
  const searchResult = searchForKey(data[0].def, 't'); 
   handleApiResponse(data, searchResult);
 })
 .catch(error => {
   alert('An error occurred while fetching the data. Please try again later.');
 });
}

function searchForKey(object, key) {
  let result = null;
  
  if (object instanceof Array) {
    for (let i = 0; i < object.length; i++) {
      result = searchForKey(object[i], key); // Pass the 'key' parameter
      if (result) {
        break;
      }
    }
  } else {
    for (let prop in object) {
      if (prop === key) {
        result = object[prop];
        break;
      }

      if (
        object[prop] instanceof Object || // Check if the property is an object
        object[prop] instanceof Array // Check if the property is an array
      ) {
        result = searchForKey(object[prop], key); // Pass both 'object[prop]' and 'key' parameters
        if (result) {
          break;
        }
      }
    }
  }
  
  return result ;
}


function handleApiResponse(data, searchResult) {
console.log(data)
const headWord = document.getElementById('headword');
const definitionEle = document.getElementById('definition');
const exampleEle = document.getElementById('example');

  if (data[0].hwi.hw) {
    headWord.textContent = data[0].hwi.hw;
    definitionEle.textContent = data[0].shortdef[0];
    exampleEle.textContent = searchResult;
  } else {
    alert("No Word Found!");
  }
}
//Push headword to #headword
//push definition to #definition
//push example sentence to #example-sentence
let submission = document.getElementById("inputForm");

submission.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let word = document.getElementById("word");

    if(word.value == ""){
      alert("Enter A Word!");
      return;
    } else {
        word.value = word.value.toLowerCase();
        merriamApiRequest(word.value);
      
    }
   

})

