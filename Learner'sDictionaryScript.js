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
    const searchResult = [];
    searchResult.push(searchForKey(data, 't'));
    searchResult.push(searchForKey(data, 'shortdef'));
    searchResult.push(searchForKey(data, 'hw'));
    handleApiResponse(searchResult);
  })
  .catch(error => {
    alert('An error occurred while fetching the data. Please try again later.');
  });
 }
 //Search an Object recursively for the given key, Only finds the first true answer
 function searchForKey(object, key) {
   let result = null;
   
   if (object instanceof Array) {
     for (let i = 0; i < object.length; i++) {
       result = searchForKey(object[i], key); // Recursively searches until result != null
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
 
 
 function handleApiResponse(searchResult) {
 const h1 = document.getElementById('headword');
 const d1 = document.getElementById('definition');
 const e1 = document.getElementById('example');
 const info = document.getElementById('information');
 
   info.classList.toggle("slideOff");
   setTimeout(() => {
   
   h1.textContent = searchResult[2];
   d1.textContent = searchResult[1];
   e1.textContent = searchResult[0];
   
     
   info.classList.toggle("slideOff");
   info.classList.toggle("slideOn");
   }, 1000);
   
   setTimeout(() => {
     info.classList.toggle("slideOn")
   }, 5000);
   
 
   
 }
 
 
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
 

