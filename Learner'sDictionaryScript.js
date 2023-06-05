//receive Submit and check it is legimate



//begin a fetch to merriam webster API
function merriamApiRequest(word){
 const url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=06eed36a-18cf-4365-8cf8-5ae5edd1c537`;

 fetch(url)
 .then(response => {
   if (!response.ok) {
     throw new Error("Network response was not OK");
   }
   console.log( response.json());
 })
 .then(data => handleApiResponse(data))
 .catch(error => {
   console.error("Error fetching data:", error);
   alert("An error occurred while fetching the data. Please try again later.");
 });
}
//query Headword/ Description and Example

function handleApiResponse(data){
  const headwordElement = document.getElementById('headword');
  headwordElement.textContent = data.hwi.hw.value;
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
    }
    merriamApiRequest(word);

    document.getElementById("word").value = ""
})