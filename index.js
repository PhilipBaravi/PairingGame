

const n = 5;
const arr = [];
if (n == 0) {
  console.log(null);
}
do {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  if (!arr.includes(randomNumber)) {
    arr.push(randomNumber);
  }
} while (arr.length < 5);
const newArr = arr.concat(arr);

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const shuffledImages = shuffle(newArr);
let sectionDiv = document.querySelector("section");
for (let i = 0; i < 10; i++) {
  let e_1 = document.createElement("div");
  e_1.classList.add("card-wrap");
  e_1.style.backgroundImage = "url(./Images/coin.png)";
  let e_0 = document.createElement("div");
  e_0.classList.add("card");
  e_0.style.backgroundImage = `url(./Images/card${shuffledImages[i]}.png)`;
  e_1.appendChild(e_0);
  sectionDiv.appendChild(e_1);
  e_1.addEventListener("click", function pairingGame() {
    this.classList.add("test");
    let testArr = document.querySelectorAll(".test");
    testArr[0].style.transform = "rotateY(180deg)";
    if (
      testArr.length === 2 &&
      testArr[0].firstChild.style.backgroundImage ===
        testArr[1].firstChild.style.backgroundImage
    ) {
      testArr[1].style.transform = "rotateY(180deg)";
      setInterval(function () {
        testArr[0].style.backgroundImage = ""
        testArr[0].firstChild.style.backgroundImage = "";
        testArr[1].style.backgroundImage = "";
        testArr[1].firstChild.style.backgroundImage = "";
      }, 1000);
      testArr[0].classList.add("done");
        testArr[1].classList.add("done");
        testArr[0].classList.remove("test");
        testArr[1].classList.remove("test");
      win();
    } else if (
      testArr.length === 2 &&
      testArr[0].firstChild.style.backgroundImage !==
        testArr[1].firstChild.style.backgroundImage
    ) {
      testArr[0].style.transform = "";
      testArr[1].style.transform = "";
      testArr[0].classList.remove("test");
      testArr[1].classList.remove("test");
    } 
  });
}
var win = function(){
  let doneArr = document.querySelectorAll('.done');
  if(doneArr.length === 10){
    document.getElementById('startGame').textContent = `Your Time ${minutesLabel.textContent}:${secondsLabel.textContent}`;
    localStorage.setItem('time', `${minutesLabel.textContent}:${secondsLabel.textContent}`);
    document.getElementById('restartGame').textContent = 'Restart';
    document.querySelector('.description').style.display = 'none';
    document.querySelector('section').style.display = 'none';
    document.getElementById('startGame').style.marginTop = '20%';
  }
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
document.getElementById("startGame").addEventListener("click", function () {
  document.getElementById('startGame').textContent = '';
  document.querySelector('section').style.pointerEvents = 'visible';
  setInterval(function setTime() {
    ++totalSeconds;
    secondsLabel.textContent = pad(totalSeconds % 60);
    minutesLabel.textContent = pad(parseInt(totalSeconds / 60));
  }, 1000);
});

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

document.getElementById('restartGame').addEventListener('click', function(){
  location.reload();
})

document.addEventListener("DOMContentLoaded", function() {
  let lastTime = localStorage.getItem('time');
  if(lastTime === null){
    console.log('No Records')
  }else{
    document.getElementById('lastGameTime').textContent = `Last Time : ${lastTime}`;
  }
});