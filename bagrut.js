// import { handleInput } from './utils.js';



// Array of objects for subjects, units, and bonuses
const defaultTableSubjects = [
    { subject: "תנ\"ך", units: 2, bonus: 0 },
    { subject: "ספרות", units: 2, bonus: 0 },
    { subject: "עברית", units: 2, bonus: 0 },
    { subject: "אנגלית", units: 5, bonus: 0 },
    { subject: "היסטוריה", units: 2, bonus: 0 },
    { subject: "אזרחות", units: 2, bonus: 0 },
    { subject: "מתמטיקה", units: 5, bonus: 0 }
];
const mandatorySubjects = ["עברית", "אנגלית", "היסטוריה", "אזרחות", "מתמטיקה"];
const physics = ["פיזיקה", "פיסיקה"];
const compSci = ["מדעי המחשב", "מחשבים", "מדמח", "מדמ\"ח"];
const toshba = ["תושב\"ע", "תושבע", "תורה שבע\"פ", "תורה שבעל פה"];
const sciSubjects = [...physics, ...["ביולוגיה", "כימיה"]];
const techSubjects = [...compSci, ...["בקרת מכונות", "אלקטרוניקה ומחשבים", "אלקטרוניקה", "מדעי ההנדסה", "ביוטכנולוגיה", "מערכות ביוטכנולוגיה", "יישומי ביוטכנולוגיה"]];
const mizrafTechSubjects = [...sciSubjects, ...techSubjects];
const generalBigBonusSubjects =  [...sciSubjects, ...["אנגלית", "היסטוריה", "ספרות", "תנ\"ך"]];
const tauBigBonusSubjects = [...generalBigBonusSubjects];
const hujiBigBonusSubjects = [...generalBigBonusSubjects, ...compSci, ...["מחשבת ישראל", "ערבית", "אזרחות", "מתמטיקה"]];
const techBigBonusSubjects = [...generalBigBonusSubjects, ...techSubjects, ...["ערבית"]];
const bguBigBonusSubjects = [...generalBigBonusSubjects, ...compSci];
const biuBigBonusSubjects = [...generalBigBonusSubjects, ...compSci, ...toshba, ...["תלמוד", "מחשבת ישראל", "אזרחות"]];


// Reference to the bagrut table body
const BagrutTableBody = document.getElementById('bagrut-table-body');

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Code to run only on mobile devices
// Example: handle table resizing
function adjustTableForMobile() {
    const table = document.querySelector('.bagrut-table');

    // Your code for mobile adjustments
    if (table) {
        // Force a reflow with minimal disruption
        requestAnimationFrame(() => {
            table.style.opacity = '0'; // Fade out
            requestAnimationFrame(() => {
                table.style.opacity = '1'; // Fade in
            });
        });
    }
}

// Function to create a table row
function createBagrutRow(subject = '', units = 5, bonus = '', isNewRow = false) {
    let selectedOption = document.getElementById("bagrut-universities").value;
    
    // if (isMobile()) {
    //     adjustTableForMobile();    
    // }
    
    const row = document.createElement('tr');

    const subjectCell = document.createElement('td');
    if (isNewRow) {
        const subjectInput = document.createElement('input');
        subjectInput.type = 'text';
        subjectInput.name = 'subject';
        subjectInput.className = 'subject-input table-input'; // Use specific class
        subjectInput.addEventListener('input', () => {updateBonus(row); updateAvg();}); // Add event listener
        subjectCell.appendChild(subjectInput);
    } else {
        subjectCell.textContent = subject;
    }
    row.appendChild(subjectCell);

    const unitsCell = document.createElement('td');
    const unitsInput = document.createElement('input');
    unitsInput.type = 'number';
    unitsInput.name = 'units';
    unitsInput.value = units;  // Set the pre-filled value
    unitsInput.className = 'table-input'; // Use specific class
    // unitsInput.min = 1; // Set minimum value
    unitsInput.addEventListener('input', function() {
        
        this.value = this.value.replace(/\D/g, '');
        let val = parseInt(this.value, 10);
        if (isNaN(val)) {
            this.value = '';
        } else if (val < 1) {
            this.value = 1;
        } if (val > 10) {
            this.value = 10;
        }
        updateBonus(row); 
        updateAvg();
    }); // Add event listener
    unitsInput.addEventListener('keydown', function(e) {
        // Allow specific control keys, shortcuts, and page navigation keys
    const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
        'Tab', 'Enter', 'Escape', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ];
    const ctrlShortcuts = ['KeyA', 'KeyC', 'KeyV', 'KeyX', 'KeyR', 'Minus', 'Equal'];

    if (
        allowedKeys.includes(e.key) || 
        (ctrlShortcuts.includes(e.code) && e.ctrlKey) ||
        (/^[0-9]$/.test(e.key))
    ) {
        return; // Allow these keys
    }
        e.preventDefault(); // Prevent any other keys
    });
    unitsCell.appendChild(unitsInput);
    row.appendChild(unitsCell);

    const gradeCell = document.createElement('td');
    const gradeInput = document.createElement('input');
    gradeInput.type = 'number';
    gradeInput.name = 'grade';
    gradeInput.className = 'table-input'; // Use specific class
    // gradeInput.min = 0; // Set minimum value
    // gradeInput.max = 100; // Set maximum value
    gradeInput.addEventListener('input', function() {
        
        this.value = this.value.replace(/\D/g, '');
        let val = parseInt(this.value, 10);
        if (isNaN(val)) {
            this.value = '';
        } else if (val < 0) {
            this.value = 0;
        } if (val > 100) {
            this.value = 100;
        }
        updateBonus(row); 
        updateAvg();
    }); // Add event listener
    gradeInput.addEventListener('keydown', function(e) {
        // Allow specific control keys, shortcuts, and page navigation keys
    const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
        'Tab', 'Enter', 'Escape', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ];
    const ctrlShortcuts = ['KeyA', 'KeyC', 'KeyV', 'KeyX', 'KeyR', 'Minus', 'Equal'];

    if (
        allowedKeys.includes(e.key) || 
        (ctrlShortcuts.includes(e.code) && e.ctrlKey) ||
        (/^[0-9]$/.test(e.key))
    ) {
        return; // Allow these keys
    }
        e.preventDefault(); // Prevent any other keys
    });
    gradeCell.appendChild(gradeInput);
    row.appendChild(gradeCell);

    const examTypeCell = document.createElement('td');
    const examTypeSelect = document.createElement('select');
    examTypeSelect.className = 'table-select'; // Use specific class
    const option1 = document.createElement('option');
    option1.value = 'בחינה';
    option1.textContent = 'בחינה';
    option1.selected = true;
    const option2 = document.createElement('option');
    option2.value = 'עבודה';
    option2.textContent = 'עבודה';
    examTypeSelect.appendChild(option1);
    examTypeSelect.appendChild(option2);
    examTypeSelect.addEventListener('change', () => {updateBonus(row); updateAvg();}); // Add event listener
    examTypeCell.appendChild(examTypeSelect);
    row.appendChild(examTypeCell);

    const bonusCell = document.createElement('td');
    bonusCell.textContent = bonus;
    row.appendChild(bonusCell);

    if (isNewRow) {
        const deleteCell = document.createElement('td'); // Empty cell for delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.title = 'לחץ למחיקת מקצוע מחישוב הממוצע';
        deleteButton.onclick = function() {
            row.remove();
            if (selectedOption === 'TECH') {
                checkMizrafSsubjects()
            }
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
    } else {
        const emptyCell = document.createElement('td'); // Empty cell in the new column
        row.appendChild(emptyCell);
    }

    return row;
}


// Function to update the bonus based on the units value
function updateBonus(row) {
    const unitsInput = row.querySelector('input[name="units"]');
    const gradeInput = row.querySelector('input[name="grade"]');
    const subjectInput = row.querySelector('input[name="subject"]');
    const examTypeSelect = row.querySelector('select'); // Get the select element for סוג בחינה
    const bonusCell = row.cells[4]; // Access the בונוס cell
    const subjectCell = row.cells[0]; // Access the subject cell

    const units  = parseInt(unitsInput.value);
    const grade = parseInt(gradeInput.value);
    // Get the selected value from the select element
    const selectedExamType = examTypeSelect.value;
    // Get the subject value
    const subject = subjectInput ? subjectInput.value : subjectCell.textContent;
    let selectedOption = document.getElementById("bagrut-universities").value;
    let bonus = 0;
    if (!(isNaN(units) || isNaN(grade)) && subject)
    {
        switch (selectedOption) {
            case "TAU":
                bonus = getTauBonus(subject, units, grade, selectedExamType)
                break;
            case "HUJI":
                bonus = getHujiBonus(subject, units, grade, selectedExamType)
                break;
            case "TECH":
                bonus = getTechBonus(subject, units, grade, selectedExamType)
                if (bonus === undefined) {
                    return;
                }
                break;
            case "BGU":
                bonus = getBguBonus(subject, units, grade, selectedExamType)
                break;
            case "BIU":
                bonus = getBiuBonus(subject, units, grade, selectedExamType)
                break;
        }
    }
    else if (selectedOption === "TECH") {
        checkMizrafSsubjects()
    }
    bonusCell.textContent = bonus;
}

function getTauBonus(subject, units, grade, selectedExamType) {
    if (grade < 60) {
        return 0;
    }
    else if (selectedExamType == "עבודה" && units >= 5) {
        return 20;
    }
    else if (subject == "מתמטיקה" && units >= 5) {
        return 35;
    }
    else if ((subject == "מתמטיקה" || subject == "אנגלית") && units == 4) {
        return 12.5;
    }
    else if (tauBigBonusSubjects.includes(subject) && units >= 5) {
        return 25;
    }
    else if (units >= 5) {
        return 20;
    }
    else if (units == 4) {
        return 10;
    }
    return 0;
}

function getHujiBonus(subject, units, grade, selectedExamType) {
    if (grade < 60) {
        return 0;
    }
    else if (subject == "מתמטיקה" && selectedExamType == "בחינה" && units >= 5) {
        return 35;
    }
    else if (hujiBigBonusSubjects.includes(subject) && units >= 5) {
        return 25;
    }
    else if (hujiBigBonusSubjects.includes(subject) && units == 4) {
        return 15;
    }
    else if (units >= 5) {
        return 20;
    }
    else if (units == 4) {
        return 10;
    }
    return 0;
}

function getTechBonus(subject, units, grade, selectedExamType) {
    checkMizrafSsubjects()
    if (grade < 60) {
        return 0;
    }
    else if (subject != "היסטוריה" && selectedExamType == "עבודה" && units >= 5) {
        return 20;
    }
    else if (subject == "מתמטיקה" && selectedExamType == "בחינה" && units >= 5) {
        checkMizrafSsubjects()
        return 30;
    }
    else if (mizrafTechSubjects.includes(subject) && units >= 5) {
        return checkMizrafSsubjects()
    }
    else if (techBigBonusSubjects.includes(subject) && units >= 5) {
        return 25;
    }
    else if (units >= 5) {
        return 20;
    }
    else if (units == 4) {
        return 10;
    }
    return 0;
}

function getBguBonus(subject, units, grade, selectedExamType) {
    if (grade < 60) {
        return 0;
    }
    else if (selectedExamType == "עבודה" && units >= 5) {
        return 20;
    }
    else if (subject == "מתמטיקה" && units >= 5) {
        return 35;
    }
    else if (subject == "מתמטיקה" && units == 4) {
        return 20;
    }
    else if (bguBigBonusSubjects.includes(subject) && units >= 5) {
        return 25;
    }
    else if (subject == "אנגלית" && units == 4) {
        return 15;
    }
    else if (units >= 5) {
        return 20;
    }
    else if (units == 4) {
        return 10;
    }
    return 0;
}

function getBiuBonus(subject, units, grade, selectedExamType) {
    if (grade < 60) {
        return 0;
    }
    else if (selectedExamType == "עבודה" && units >= 5) {
        return 20;
    }
    else if (subject == "מתמטיקה" && units >= 5) {
        return 35;
    }
    else if (subject == "מתמטיקה" && units == 4) {
        return 15;
    }
    else if (biuBigBonusSubjects.includes(subject) && units >= 5) {
        return 25;
    }
    else if (biuBigBonusSubjects.includes(subject) && units == 4) {
        return 12.5;
    }
    else if (units >= 5) {
        return 20;
    }
    else if (units == 4) {
        return 10;
    }
    return 0;
}

function checkMizrafSsubjects() {
    // Collect all rows with the required subjects
    const rows = document.querySelectorAll('#bagrut-table-body tr');
    let relevantRows = [];

    rows.forEach(row => {
        const units = row.querySelector('input[name="units"]').value;
        const examType = row.querySelector('select').value;
        const grade = row.querySelector('input[name="grade"]').value;
        const subjectText = row.cells[0].textContent || row.querySelector('input[name="subject"]').value;

        if (subjectText == "מתמטיקה" && examType == "בחינה" && (units < 5 || grade < 60)) {
            isMath = false;
        }
        else if (subjectText == "מתמטיקה" && examType == "בחינה" && units >= 5 && grade >= 60){
            isMath = true;
        }

        if (mizrafTechSubjects.includes(subjectText) && examType === 'בחינה' && units == 5 && grade >= 60) {
            relevantRows.push({
                row: row,
                subject: subjectText,
                grade: parseInt(grade)
            });
        }
    });

    // Sort the relevant rows by grade, descending
    relevantRows.sort((a, b) => b.grade - a.grade);
    if (isMath && relevantRows.length >= 2) {
        relevantRows.slice(0, 2).forEach(item => {
            item.row.cells[4].textContent = 30;
        });
        relevantRows.slice(2).forEach(item => {
            item.row.cells[4].textContent = 25;
        });
    }
    else {
        relevantRows.forEach(item => {
            item.row.cells[4].textContent = 25;
        });;
    }
}

function updateAvg() {
    const university = document.getElementById("bagrut-universities").value;

    // Collect all rows with the required subjects
    const rows = document.querySelectorAll('#bagrut-table-body tr');
    rows.forEach(row => {updateBonus(row);});

    let sum = 0;
    let subjNum = 0;
    let sortedRows = [];
    let tempRows = [];
    rows.forEach(row => {
        const unitsInput = row.querySelector('input[name="units"]');
        const gradeInput = row.querySelector('input[name="grade"]');
        const subjectInput = row.querySelector('input[name="subject"]');
        const bonusCell = row.cells[4]; // Access the בונוס cell
        const subjectCell = row.cells[0]; // Access the subject cell

        const units  = parseInt(unitsInput.value);
        const grade = parseInt(gradeInput.value);
        const bonus = parseInt(bonusCell.textContent);
        // Get the subject value
        const subject = subjectInput ? subjectInput.value : subjectCell.textContent;

        if (units && grade) {
            if (subject == 'מתמטיקה' && university == 'TECH' && units >= 5) {
                sum += 10 * (grade + bonus);
                subjNum += 10;
                row.style.fontWeight = 'bold'; // Bold the text
                row.style.backgroundColor = '#ADD8E6'; // Set a distinct blue color that matches the table theme
            }
            else if (subject == 'מתמטיקה' && university == 'TECH' && units == 4) {
                sum += 8 * (grade + bonus);
                subjNum += 8;
                row.style.fontWeight = 'bold'; // Bold the text
                row.style.backgroundColor = '#ADD8E6'; // Set a distinct blue color that matches the table theme
            }
            else if (university == "default-uni" || !initialExcludeFromCalc(subject, university)) {
                sum += units * (grade + bonus);
                subjNum += units;
                row.style.fontWeight = 'bold'; // Bold the text
                row.style.backgroundColor = '#ADD8E6'; // Set a distinct blue color that matches the table theme
            }
            else {
                // Reset styles for all rows
                row.style.fontWeight = 'normal';
                row.style.backgroundColor  = ''; // Reset color
            }

        tempRows.push({row: row,
            subject: subject,
            gradeWithBonus: parseInt(grade+bonus)})
        }
        else {
            // Reset styles for all rows
            row.style.fontWeight = 'normal';
            row.style.backgroundColor  = ''; // Reset color
        }
    })
    
    tempRows.sort((a, b) => b.gradeWithBonus - a.gradeWithBonus);
    tempRows.forEach(item => {sortedRows.push(item.row)});
    
    let avg = Math.floor((sum / subjNum) * 100) / 100;
    sortedRows.forEach(row => {
        const unitsInput = row.querySelector('input[name="units"]');
        const gradeInput = row.querySelector('input[name="grade"]');
        const subjectInput = row.querySelector('input[name="subject"]');
        const bonusCell = row.cells[4]; // Access the בונוס cell
        const subjectCell = row.cells[0]; // Access the subject cell

        const units  = parseInt(unitsInput.value);
        const grade = parseInt(gradeInput.value);
        const bonus = parseInt(bonusCell.textContent);
        // Get the subject value
        const subject = subjectInput ? subjectInput.value : subjectCell.textContent;

        if (units && grade) {
            if (university == "default-uni" || isNaN(avg) ||checkIncludeInAvg(subject, university, grade, bonus, avg)) {
                row.style.fontWeight = 'bold'; // Bold the text
                row.style.backgroundColor = '#ADD8E6'; // Set a distinct blue color that matches the table theme
                sum += units * (grade + bonus);
                subjNum += units;
                avg = Number.parseFloat(Math.floor((sum / subjNum) * 100) / 100);
            }
            else if (initialExcludeFromCalc(subject, university)) {
                // Reset styles for all rows
                row.style.fontWeight = 'normal';
                row.style.backgroundColor  = ''; // Reset color
            }
        }
        else {
            // Reset styles for all rows
            row.style.fontWeight = 'normal';
            row.style.backgroundColor  = ''; // Reset color
        }
    })
    if (!avg || isNaN(avg)) {
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${0}`;
    }
    else if (avg > 117 && university === 'TAU') {
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${117}`;
    }
    else if (avg > 127 && university === 'HUJI') {
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${127}`;
    }
    else if (avg > 119 && university === 'TECH') {
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${119}`;
    }
    else if (avg > 120 && university === 'BGU') {
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${120}`;
    }
    else if (avg > 126 && university === 'BIU') {
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${126}`;
    }
    else {
        if (university === 'HUJI') {
            avg = Number.parseFloat(avg.toFixed(1));
        }
        document.getElementById("bagrut-result").innerText = `ממוצע בגרות מיטבי: ${avg}`;
    }
}

function initialExcludeFromCalc(subject, university) {
    if ((!mandatorySubjects.includes(subject) && university != 'TECH') ||
        (![...mandatorySubjects, "ספרות", "תנ\"ך"].includes(subject) && university == 'TECH')) {
            return true;
    }
    return false;
}

function checkIncludeInAvg(subject, university, grade, bonus, currentAverage) {
    if ((!mandatorySubjects.includes(subject) && university != 'TECH') ||
        (![...mandatorySubjects, 'ספרות', 'תנ"ך'].includes(subject) && university == 'TECH')) {
        const gain = grade + bonus;
        if (gain > currentAverage) { 
            return true 
        };
    }
    return false;
}

document.getElementById("bagrut-universities").onchange = function() {
    // Gets the selected option value & image element - makes updates accordingly
    const selectedUniversity = document.getElementById("bagrut-universities").value;

    // Gets the selected option value & image element - makes updates accordingly
    let imageElement = document.getElementById("bagrut-logo-image");

    switch (selectedUniversity) {
        case 'TAU':
            imageElement.src = 'data:image/png;base64,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';
            break;
        case 'HUJI':
            imageElement.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAACDCAMAAAC3D+yqAAABaFBMVEX///8AAABgvY2DER8mpZQLSEN5fFhInLwvd4kmFBe4t7ft7e3y8vL19fX6+vr8/Px9fHzY2NjHxsbo6OgIAACbmpqop6ciHh/Av79TuYVJRkcbFhe6ublDQEEqJieUk5N8AAA5NjdUUlKAABWAf39vbW5nZmZ2dHWKiYqwr6+joqJjYWHU09MAn4xYVlcxLi+gV14TDQ/Wuby8jZF+AAzp9u/R6ty338pxxJmOzqyGJzFPjoNzX15JocMmAAAAPj0+gJDW4uWOsLpucUgAMSoPbICFh2fLpqqmZWrgy82QNT62gofMqq2vdXvj09SJHSqZRk4+s3ms28Gc07Wy3cZxAACDyqTE3eiOv9O04Np+ts2ZxNdSs6Xa7uODxrxGT105JShOkaxcr5UaaWQiWVE4cmNonpVKjXVftIs8W2Y4Q0osFBSauMCNy8FKm3kulIdkclawsZ+0yMZKY09vnKjCw7WcnoZxgWtGe2KQAAARZUlEQVR4nO2diZ/bxnXHZ3al1Yo4SBwkIILHkiKXF0QatmQdiSU7ipwoaazEdlQ7tRy3ddqkaZ2kbeR/v++9mQEGILi7sqxFE+L3+WiXO8TMvJnvvLlJMVaqnxjl4bUuS8bJO1WbsO/66e3bVtU27LeenhzWblCtfnbz8PCmXbUV+6y3Tw4PD09+UrUZ+6xD1O2fV23GHusf0AkOT96u2o49FjnB4YlZtR37KxoJDg9/VrUde6y3btJQ8Iuq7dhfWcIJ6qGgOn0kEdSbRJXpqUBw+Daq5lCFpBccnoB+/VHV1uylFALCUO/VVSINwbOqbdlT/fKmInDzp1Xbsqd6J3WD2/WGdTXyUgT12qAqpT3RST0hqkhPT24KndSnNlXpF29JVW1IrVq1atWqtcdqClVtxj7rBulXVZuxz7pxgLpRLwuqk0Rwp2o79ld2jaBq3ZEIXlRtyP7qRY2gaikE71ZtyP7q3RpB1borEdyt2pD9VY2gcn0sEXxctSH7q08OagQVSyI4+KRqQ/ZX9yWC+1Ubsr96LhE8r9qQ/dW9GkHVkgQO7lVtyP7qhmJQtSH7qxpB1bIVghtVW7K3ulMjqFoZgvoORUV6kSKoTy4r0rs1gqpVI6hcd1ME9eFxRfq0RlC1Pk4R1IfHFUkdF7yZk0urXX/R0bm6/0YRRLz+Yotz9TxF8On2m6/9UeSNXyM4V/dSBNuHx+/8+ulrpl4juIAOdiN4enLzdT+GWSO4gNK96q3ze/xg/ut+HrxGcAFlCArn980H+C2+r+kGNYLzZWcICofHb93+Hr4WoUZwvu5kCPKHx/IrWi7sBt4w/2fXxV85BG2Hfg09+NFx0mf0mL0VvsncxVb61iT3Z7iixOZeFmTmnnBc+TtkzMjHFWrOcn92wpz1Mf5qxLlH2lpmVhZ7cUrhdr9HFk3ESsjsaDGXTokBSrsQvH2y69tB/rE0nWafZ4oYG3DetwBBJIPGUAK+xCcdvoGfI24yiDIy8KWUxTzu8ymYr2JpZV5p6c+YAQ+eAqoshLGufE11ueAtijbnbcbGWdRWmuA0C+zicw2mTGEsAOttsEaTw2L1cgVPruXrBtk8EwYGHljkY46YBJW2je85WjrbVfciQ6AfHmdfmFZ0g8+ula53DZ4EsuKCCOrba0VYgTIoCWCJ1uNrRjW1kBy8WQIlM6RtASBgzjqJUpMDDUFzwGX6foBlhAcDLKBIPoGatXyBn1PzD0Vm7BSIWInMwg/8zONS8kEyRQRLjISmBsIyNDgI0ogm66jM4HE7kJlBy4/HyYihmyaYdW+TICILrEdDZljahsoqCpKLIrCepV/WVXCDz65d+6wMAXOG/jpsgMLAJ//tYwWGvRA19IGK4XMbHB4dQpQYmyd4qNMQ0RABs7FmmUshG90LvKXf70For+OPqBHwAfygqL05NW5KJ1wJBB4PZEV7KgeImgyy9mM0ZCiP4JEln1O2vaFqKPBk2+9TkXpLHzPr0esh+inzKLNTTp0PH1GKE8raQfeEnxG1wRGPVUyIO+X57pr0bikCMRSXfGHab66Byr9GMFZOLupSIJAS9dKFn4boXeTGBSGQiiiamQRpyEhHwEzsL7DqiKFEIBRq/YuoB2ymmEOTB5q1Hu+XGE6wVMcFTZ9eEAJP1i2UbaWVc5q+HhICqwRByGfjZGA3eW4+0hbI8rqbIcgOj3+ufWlgzg2IwLV/KikH9suyEBGnpqYh8Kj7B4PnAKNNBopqfDUEI5nYRRBA0qI+BDdbRs0hkOUlBCFVHEN3oIZKCCwc1VAdrfW6F0LQ5h0rSMZi4EvzatOIU9CnGgJ1bPb5D2/rCDI3EAR2uMEZCFqcpgcxH7nC2pU0pQSBvxuBKM0FEYg8Q9FrnA5lVA2BMZNVSQhiyQrikWmEgKk2POHZFO1iCGYwBjk8GUXUrS02oiSlCD7eRnDn1pUHh2VuoAiUu0ERQTetQJNzagTNKBpQnUNvJJplCYJgk4bkEVhJQKmkCLIHyxB0KEzMwlQjziFIq5IQeIromjpvsAwLoZqRbmcZgr6WtUBApXdhqJ/jO2pUK0XwyUERgX3lypUflLlBSqDcDYoIWNqvYQdEWkU+zdCXXM6qtxHoyiOwA5+4KQTanZsyBDE9NqMp6uJ8BDBXyGdKyU8Fj7RIuXhMIVCm6AiixKKCJks90VIE97cQfAEIrvzwZs4NMAGNwLUPthPaRqDUTA8NFsLnW3Li+GoIYFqaQ6CpDAHMkplqxhdAYEXCU+1In7nPRQck0irGYymCXNaEwEgdI3HYOQieawjo8PjLW4gg3xWhG+gEzu6IggKCRWqzxyOzvYHFiy8DzkNg5P+0RCIXQoCxvdiPLHYhBLCWxClQvPSz/g17MGjEtteQi4x8PIYI9DW1hiCdQq19nJKdieCehgAPjz8XBApd0clHOoHfbCdDpnXbQ1C7iGCU1fOAVlfjhupEyhFYw+F8MjtdB0GQDrm94UxMM3ciaEOk1nS1CaAyzXgx3ODqKaKB8iIIRlGXjPP11GH2QKt+f16ItxSZjSAzUbmmO1xHGYKG6nvZyO+eg+Agj+CFJFDsin77noag/GtzXC4XoUkeQajmGgzbCR8ttd5FR+CnCNTGgO/zdHoENeGLcnhaemkWgCCLxO2leOFHI6r7bDge6fbKaajoZcaJT8hO9UqCOQ2E+tEmLMQLssw8VTKQQLBKezCGmy3jDMHwPAR3mXUlk9YVPfvq4T+fPRBg1rOW1CzXoxjzzH63ld+vGk4zHq2ZQmt0T2eTYXvZWfRc9e5qPVkuKF1jurXCjKcwAR2vpq05RmqEbJn0p+1FrBJ3p6Lkxkxrzc50KV5MqRdrrYZZBCVzM2s3HC9325birbLMhNWTZDwMRROZwspnOU0LGkMZ5lPRpfam+Y0/Uh7BFxqCrCt69tX1P2ZuUL5N9/9L1qV/v5X5nS9Fa8cFgODLWxqCtCt68NX169dTNyjfIar1naXtVR8c/MuVvB5kBK4/lG7wXtUW/91JR/DNvxYQ/OAkJZC6Qf0/fXzf0hD8/lERAXZFisD1h394729kIPgbk3Zc8PU2givPHlxPhW5Qvkda63WUHRf87tHVbQT/9lBD8If3ytdktV5L6XHBvz+6evXrAoBbX7C5r7tB/Wm0NyCF4BsgUEQABBj7KkNw/UdVW/t3KXlc8PurpG0CLOZZR3RcT4fegORxwdfbCG59KZ5QXdHD/zh+coYbGFJN2yBQTcOEhR8FCXBpOPyyZHjT8zyHlu6W5zienSUEj4jdCCMX12Qq0Bbv0GsMl38y09NShzRlq3Fc18N87aa00zQN6laNdPfBoEcyCzKrTQqwma0ZybJfENERG92afSyLBvYZTH8/r/tqKC4iUARYcyMQbI6Pj5/sXvdv5C6Z44prNB6eyiwoSOzLNMTGVYw7ZksKb8v9uL4jn4xw00ZsgJli69vjtI83FBvQhtgBtnGfzuXiMBTPzhw+URthNh/A06iFvAqDZ0QxWjfGfF11pWfTITstdVhm0D2lNSYiHhBkQtytnsotuJA2IYd4KUDE2iRNPBXicq9unt7aoF8qGsaj9yfqKDqn52ooLiBICaiu6I/HiOA/dyJwQ3ftL8LQcsX1FAOrsMHnbhiKDaue2CR0sORQfAj3sE4dp43lafC20xugvaMA3gqblo/7ygvuY0WPRZkMsbdp43msy6ME21TQxzTnTNQoVdmQLyl1j08dtwsBJo9CD3fLOty1w7DHx2AtS6Im7h7LA56Az2N3ygNIMxhAdLk/6CLoGYeChQb8MXfCEe+x5kBsenc3WK8TzwvJ2ZJIHLJ1hbktGY11fJ/qZCOPhbYRfKMIXC0jILoiGAiIwVlzohnt5+cRZHuzeQTqZGtGFezBkz18pI0IxPNjTO10NFhj016XIOj7Mw2BIfahp5DWUO6Ae+h/HnhOQ+BR+drioKADtWtH8gBhKqybYBTt9FohMOQfS/wxySHITtliPlEXYCQCufE6GaCV8H6fl1xsvIer4qtFBDkCOCt6+Nvj43PcAC31lNF4ZL+FoFeCAE0ekBcQgmWGoI0HUny+4hbYvixBsKA2pxCwFeZuIawCgimku9IRWCKZZrKBgFCmrO4ojc5HMMwhCNJqnXFrENklCMZrMm6StHOHbFLZUKwhKBDAyyfvHx+f6wYKwbSzXC7bAkFrseh4EsEMw+cCwRzCDSjx2l10Bw6NFJZLh86jYLFYNKhNwT8Xe4q2LGUeQdjB+hooBORCxHzIh5C6CbU/sZ0ucLIjvmlsIYCRIRz1VU3LgwQ8HA0GcRw7OQRLsMmCP9p2jJchdAQw8kyohE3ALw4yUwRtsAO6qMGsgfCClavcMY/gdxmBq38SBP6r+NT8WOksN1AIxOFZQgjwJCqUCMSdTx8R0MsYj8VxDEQEGEI3lEd4fBhhRW+g7k0kIYeCohdAfS0zBDgQszWevA0pdYfu2/Ix9s4mjIy+W0RgJ4FqlWlXhdeH6O7qWEdAJTLEJWK8+q0jYOCN1LOF4Mge+ZtCkIiB2uRzk/ehPTU87Yxbyc6GYtCjP5UTYOz9lMHxbjdQCNq2ZVme8IIFvG5KBPjajoUXhBSOY4Ht4kFng89kxYwCjM6wOu3+CLqLke1PFQJ6YQcSgcv95kYhgO7cMekBmD/ZmAL0QaqrZ8YcKyOPAAirI9BQecEGepJgYMBkWUfAHTIJHDwhNDkEEHskekImR7DUC0Q0B1oKoJ1ww/S3zlzZnW80AgJBGQH2wZMLuIFC8KrD8RzaYoO7Q3HAq8YC6CcaGHLKe+ocVk1K/ZVAALU+7KYIgP2C0s3GgmGY3QXF2+sFBE56TVGdR3s4lpSMBZ78YyEuiDUH4gxa9WN4ZcXkwbjb3eDzhbGgB+Xr8MVmjFP3rVrzdAKEoJQAYz96cr4bfBcEWKBT6JJwOO5TaIrA4diPw7w0u5YXRGnNEQLDD9KOiDG/f4rzzNxwPEt73zmkvhMBG4nJwhp7Jh1BiNnow/GYitGnqwYGT91zjVd1Jq1WC92kgKBNXW4X4Yx5cXFmf1tEcOvzHfX7/vluUIZg0mgs4hIEcwh3aDh2W9jvNqgjjfADHwG8tbCpwjlVZJReo5jwVeyJO++EADwlyhBMEnFXD9wJkvAIQXMD5TfbbtzGsXs3Aujm52GjS16ZIXDjMbYCGI4hQYOKZtI9jg4sLTxYc+CishGHXSAn6x1n2F0fRu8FIFiSHVOs925CkyJePL5/+eereQQ7CWhd0fGuJfIpIQh3rI4XO1fHExvfbeCPUVOujrHZrcSYOMiuTjVpJTqKWTr33ajVMdWoKGC2Om5RoEHZrAxaHTOcL8uLWTHPLlS4uIAWtw/Ti2bgG5Rytjpu0z1RC30KNMDBHD9uEzUgH3FHE1oXRoO00mgjXJAt6QrTkhc+wfWXx98WEOwkoHdFu75VwqI3mqZAZIKhtokSf9viN72dhsO4J7ZqxLum2WT0lqnFsEyNuRXLiyYyGxuzaZpiJ0hES1MXwRb89OJY7DWJew7y8dRUIU/u9KhkMEhEsyjBpnxeFMhWhtgOTWBtdYUCYovn02giPYqVz5Gxvz4+ynvBj/97R+WSZFf0ZMc1olqvLu/x0dH/XJyA7IrOXB/XeiVZR0d5BOcQEF3Rk/+9FOP2Qx8WEJxLgLqi99+8YXujl4/zCH5cctmxqA+ePKk/S/+96a9E4OjrVyEAXdH5nlLrgnIEgRTBo7M+oF/rDcg8OsohqAlcuj5UCCSBeqp/2Xr5OIegJnDp+ktKgBA8Kn60pNabVpwRIAQ1gcuWpxHALaJ6pn/Zso80/flRTeDy9TKHoCZw+dKGYtC3NYHLlw7g6MP6pnQFyhG49A/n1mI5BDWBalQTqFwZgfpzYxUpJVC1IfurmkDlIgCPawIVihC8rNqKvRb6QE2gUtUEKldNoHLVBCpXTaBq/R/iRdmrpmj87gAAAABJRU5ErkJggg==';
            break;
        case 'TECH':
            imageElement.src = 'data:image/png;base64,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';
            checkMizrafSsubjects();
            break;
        case 'BGU':
            imageElement.src = 'data:image/png;base64,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';
            break;
        case 'BIU':
            imageElement.src = 'https://cris.biu.ac.il/skin/footerIcon/';
            break;
        default:
            imageElement.src = 'data:image/png;base64,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';
    }
    updateAvg();
};


// Populate the table with initial rows
defaultTableSubjects.forEach(item => {
    const row = createBagrutRow(item.subject, item.units, item.bonus);
    BagrutTableBody.appendChild(row);
});

// Add event listener to the "הוסף מקצוע" button
document.getElementById('add-row-button').addEventListener('click', () => {
    const newRow = createBagrutRow('', 5, 0, true);
    BagrutTableBody.appendChild(newRow);
});



// document.addEventListener("DOMContentLoaded", function() {
//     const table = document.getElementById('bagrut-table-body');
//     const cells = Array.from(table.querySelectorAll('td'));

//     // Extract and filter interactive elements
//     const interactiveElements = cells
//         .flatMap(cell => Array.from(cell.querySelectorAll('input, select')))
//         .filter(element => element.tabIndex !== -1);
//     // console.log(interactiveElements)
    
//     // Assign tabindex values in reverse order
//     interactiveElements.reverse().forEach((element, index) => {
//         element.tabIndex = index + 1;
//     });
// });



//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// Rotate Phone

// Initialize Lottie animation
var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // The DOM element where the animation will be added
    renderer: 'svg', // Render the animation as SVG
    loop: true, // Loop the animation
    autoplay: true, // Autoplay the animation
    path: 'rotate-phone.json' // Replace with your Lottie JSON file URL
  });


  // Check if the animation is loaded successfully
  animation.addEventListener('DOMLoaded', function() {
      console.log('Lottie animation loaded successfully');
  });

  animation.addEventListener('error', function(e) {
      console.error('Lottie animation error:', e);
  });

  // Close button functionality
  document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('rotate-message').style.display = 'none';
});
