//receive Submit and check it is legimate



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
   console.log(data);
   searchObject(data, t);
   handleApiResponse(data);
 })
 .catch(error => {
   alert('An error occurred while fetching the data. Please try again later.');
 });
}

function dataSorter(data){
let example = Object.keys(data).find(ele => ele == 't');
console.log(example);
}


function searchObject(data, searchTerm) {
  for (const value in data) {
    if (typeof data[key] === 'object') {
      const result = searchObject(data[key], searchTerm);
      if (result) return result;
    } else if (data[key] === searchTerm) {
      console.log(data[key]);
      return data[key];
    }
  }
  return null; // Element not found
}


function handleApiResponse(data) {

const definitionEle = document.getElementById('definition');
const exampleEle = document.getElementById('example')
  if (data[0].hwi.hw) {
    definitionEle.textContent = data[0].shortdef[0];
    exampleEle.textContent = data[0].def[0].sseq[0][0][1].dt[2][1][0].t;
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
    const headwordEle = document.getElementById('headword');
    let word = document.getElementById("word");

    if(word.value == ""){
      alert("Enter A Word!");
      return;
    } else {
        word.value = word.value.toLowerCase();
        merriamApiRequest(word.value);
        headwordEle.textContent = word.value;
    }
   

})

