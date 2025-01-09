const result = document.querySelector(`#result h2`);
const checkButton = document.getElementById("check-btn");
const userInput = document.getElementById("text-input");

const msgFilter = str => {
    // Removes everything except a-z and numbers + makes it lowercase
    const inputFilter = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    // Reverses the string
    const reversedStr = inputFilter.split("").reverse().join("");
    // Checks if it is a palindrome
    if (inputFilter === reversedStr) {
        result.innerText = `${userInput.value} is a palindrome`;
    } else {
        result.innerText = `${userInput.value} is not a palindrome`;
    }
};

checkButton.addEventListener('click', () => {
    const input = userInput.value.trim(); // Remove extra spaces
    if (input === '') {
        alert('Please input a value');
        return;
    }
    msgFilter(input);
    userInput.value = '';
});


//html

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Palindrome Checker</title>
        <meta name="description" content="An app to check if a word is a Palindrome">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="page.css">
    </head>
    <body>
        <main class="page-wrapper">
            <div class="content">
                <div class="top">
                    <h1>Is it a Palindrome?</h1>
                </div>
                <div class="middle">
                    <label for="text-input">Enter in text to check for a palindrome:</label>
                    <input type="text" value id="text-input" >
                    <button id="check-btn">Check</button>
                    <div id="result">
                        <h2 class="hidden">Is not a palindrome</h2>
                    </div>
                </div>
                <div class="bottom">
                    <span><i class="fas fa-lightbulb"></i></span>
                    <p>A <i>palindrome</i> is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.</p>
                </div>
            </div>
        </main>
        <script src="page.js"></script>
    </body>
</html>


//css

*{
    box-sizing: border-box;
    margin: 0;
    padding:0;
}
body{
    background-color: rgb(19, 15, 41);
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}
.page-wrapper{
    width:420px;
    height:100vh;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
}
.top{
    font-size: 24px;
    margin-bottom: 20px;
    color: white;
    align-items: center;
    text-align: center;
}
.middle{
    padding:20px;
    margin-bottom: 20px;
    border-radius: 20px;
    font-size: 20px;
    color: rgb(78, 78, 78);
    font-weight: 100;
    background-color: white;
    text-align: center;
    
}
.middle>div>h2{
    font-size: 22px;
    font-weight: 100;
    color: black;
}
.middle-container{
    display: flex;
    justify-content: center;
    align-items:center ;
    gap:20px;
}
#text-input{
    margin-top: 20px;
    margin-bottom: 20px;
    width: 240px;
    height:32px;
    font-size: 14px;
    overflow: hidden;
    padding: 8px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-color: blueviolet;
    outline: none;
    resize:none;
}
#check-btn{
    height:32px;
    width:64px;
    font-size: 14px;
    border-radius: 8px;
    color: white;
    font-weight: 700;
    background-color: blueviolet;
    border: none;
}
.bottom{
    font-size: 24px;
    padding: 20px;
    border-radius: 20px;
    background-color: blueviolet;
    color: white;
    display: flex;
}
.bottom>span{
    margin-right: 16px;
}
