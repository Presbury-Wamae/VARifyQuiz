fetch("http://localhost:3000/questions")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error));