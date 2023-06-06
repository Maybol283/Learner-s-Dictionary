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
   handleApiResponse(data);
 })
 .catch(error => {
   alert('An error occurred while fetching the data. Please try again later.');
 });
}


function handleApiResponse(data) {
  const headwordEle = document.getElementById('headword');
 console.log(data[0].hwi.hw);
  if (data[0].hwi.hw) {
    headwordEle.textContent = data[0].hwi.hw;
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
   
    document.getElementById("word").value = ""
})