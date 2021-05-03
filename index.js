// global data variables - משתנים גלובלים של מידע
let colorsForUse = [];
const selectedColors = [];

// global dom elements variable - משתנים גלובלים המכילים אלמנטים
const colorInput = document.querySelector('input[type=color]');
const ulColors = document.querySelector('#colors');
const startBtn = document.querySelector('#start');
const gamePlaning = document.querySelector('#gane-planing');
const gane = document.querySelector('#game');
const usedColors = document.querySelector('#used-colors');
const selectedColorsDiv = document.querySelector('#selected-colors');
const guessesDivs = document.querySelectorAll('#guess div');
const cencel = document.querySelector('#cancel');
const guessbtn = document.querySelector('#guess-btn');
const results = document.querySelector('#results');
const win = document.querySelector('#win');
const newgame = document.querySelector('#newgame');



const addLiColorToUl = function (newColor) {
    const li = document.createElement('li');
    const spancolor = document.createElement('span');
    spancolor.classList.add('color');
    spancolor.style.backgroundColor = newColor;
    const delBtn = document.createElement('button');
    delBtn.innerHTML = ' - ';
    delBtn.classList.add('del-btn');
    delBtn.onclick = function () {
        // remove - מססירה אלמנט מה דום
        li.remove();
        // מחיקה של הצבע ממערך הצבעים
        // האינדקס של הצבע ממערך הצבעים
        const index = colorsForUse.indexOf(newColor);
        colorsForUse.splice(index, 1);
        if (colorsForUse.length < 5) {
            startBtn.disabled = true;
        }
    }
    // צרוף של ה span לתוך ה ul
    li.appendChild(spancolor);
    li.appendChild(delBtn);
    // הוספה של li
    // רשימה הקיימת ב dom
    ulColors.appendChild(li);

}

// הוספת צבע לרשימה
colorInput.onchange = function (event) {
    const newColor = event.target.value;
    // בדיקה שהצבע החדש עדיין לא קיים 
    if (!colorsForUse.includes(newColor)) {
        colorsForUse.push(newColor);
        event.target.value = '#ffffff';
        addLiColorToUl(newColor);
        if (colorsForUse.length >= 5) {
            startBtn.disabled = false;
        }
    }
}


// התחלת המשחק

let currentGuess = 0;
const guessesArray = [];



const printUsedColors = function () {
    colorsForUse.forEach(function (color) {
        const div = document.createElement('div');
        usedColors.append(div);
        div.style.backgroundColor = color;
        div.style.cursor = 'pointer';
        div.onclick = function () {
            if (currentGuess < 4) {
                // הוספת ניחוש חדש
                // הוספה למערך הניחושים
                guessesArray.push(color);
                // צביעה בצבע רקע של הניחוש
                guessesDivs[currentGuess].style.backgroundColor = color;
                currentGuess++;
            } if (currentGuess === 4) {
                // צריך להוסיף שהכפתור של ההוספה והביטול יהיו מאופשרים
                guessbtn.disabled = false;
                cancel.disabled = false;
            }
        }
    });
}

cencel.onclick = function () {
    guessbtn.disabled = true;
    cancel.disabled = true;
    guessesArray.splice(0, 4);
    guessesDivs.forEach(function (index) {
        index.style.backgroundColor = '#e8e8e8';
        currentGuess = 0;
    });

}


// פונקציה שתיצור את הצבעים הנבחרים
const generateColors = function () {
    selectedColors.splice(0, selectedColors.length);
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * colorsForUse.length);
        const color = colorsForUse[randomIndex];
        selectedColors.push(color);
        const div = document.createElement('div');
        selectedColorsDiv.append(div);
        div.style.backgroundColor = color;
        div.classList.add('hidden');

    }
}



startBtn.onclick = function () {
    gamePlaning.classList.add('hidden');
    gane.classList.remove('hidden');
    newgame.disabled = true;
    printUsedColors();
    generateColors();
}


let count = 0;

guessbtn.onclick = function () {
    if (count < 10) {
        count++;
        let bool = 0;
        let pgia = 0;
        guessesDivs.forEach(function (index) {
            index.style.backgroundColor = '#e8e8e8';
        });
        cancel.disabled = true;
        guessbtn.disabled = true;

        const resultguess = document.createElement('div');
        results.append(resultguess);

        results.classList.remove('hidden');

        let guessesArray_help = [];
        let selectedColors_help = [];

        guessesArray.forEach(function (index) {
            guessesArray_help.push(index);
        });
        selectedColors.forEach(function (index) {
            selectedColors_help.push(index);
        });




        for (let i = 0; i < 4; i++) {
            const div = document.createElement('div');
            resultguess.append(div);
            div.style.backgroundColor = guessesArray[i];
            if (selectedColors_help[i] === guessesArray_help[i]) {
                bool++;
                guessesArray_help[i] = undefined;
                selectedColors_help[i] = undefined;
            }

        }


        selectedColors.forEach(function (index, i) {
            if (guessesArray_help[i] != undefined) {
                if (selectedColors_help.includes(guessesArray_help[i])) {
                    pgia++;
                    selectedColors_help[selectedColors_help.indexOf(guessesArray_help[i])] = undefined;
                    guessesArray_help[i] = undefined;
                }
            }
        });




        const span = document.createElement('span');
        resultguess.append(span);
        span.innerHTML = ': בולים' + bool + ': פגיעות' + pgia;


        guessesArray.splice(0, 4);
        currentGuess = 0;
        if (bool === 4) {
            winner();
        }
    }
    if (count === 10) {
        let choose = document.querySelectorAll('#selected-colors div');
        choose.forEach(function (index) {
            index.classList.remove('hidden'); //הצגת הרצף של המחשב- התשובה
        });
        alert('עשית 10 ניחושים חבל המשחק נגמר');
        guessbtn.disabled = true;
        cancel.disabled = true;
        newgame.disabled = false;

    }
}

const winner = function () {
    let choose = document.querySelectorAll('#selected-colors div');
    choose.forEach(function (index) {
        index.classList.remove('hidden'); //הצגת הרצף של המחשב- התשובה
    });
    newgame.disabled = false;
    win.classList.remove('hidden');
    win.classList.add('func');
    cancel.disabled = true;
    guessbtn.disabled = true;
}

newgame.onclick = function () {
    cancel.disabled = true;
    guessbtn.disabled = true;
    gane.classList.add('hidden');
    gamePlaning.classList.remove('hidden');
    win.classList.add('hidden');
    startBtn.disabled = true;
    ulColors.innerHTML = ' ';
    newgame.disabled = true;
    usedColors.innerHTML = ' ';
    selectedColors.innerHTML = ' ';
    selectedColorsDiv.innerHTML = ' ';
    results.innerHTML = ' ';
    guessesDivs.innerHTML = ' ';
    colorsForUse = [];
    count = 0;


    guessesDivs.forEach(function (index) {

        index.style.backgroundColor.remove();
    });
}

// צריך להוסיף:

// שני כפתורים אמורים לפעול:
// בשניהם מערך הניחושים יתאפס בסופו של דבר, וכן מונה הניחושים, וכן כל הדיבים של הניחוש צריכים לחזור להיות לבנים.
// במקרה של ניחוש, צריך להתווסף מתחת לדיב שבו ניחשו, דיב שבו יופיע הניחוש הנוכחי עם הפיתרון - כמה במקום וכמה קיימים שלא במקום
// העיצוב אמור להיות דומה למה שכבר יש.
// כאשר ניחשו נכונה, אמור להיות חיווי, וכן הדיב שבתוכו יש את הצבעים המקוריים אמור להתגלות
// אמורה להיות אופציה של משחק חדש - איפוס כל המשתנים, וגילוי מחדש של הדיב של תכנון המשחק, והסתרה של הדיב של המשחק.
