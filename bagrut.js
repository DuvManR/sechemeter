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


// Reference to the table body
const tableBody = document.getElementById('table-body');

// Function to create a table row
function createRow(subject = '', units = 5, bonus = '', isNewRow = false) {
    let selectedOption = document.getElementById("bagrut-universities").value;
    const row = document.createElement('tr');

    if (isNewRow) {
        const deleteCell = document.createElement('td'); // Empty cell for delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-button';
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

    const bonusCell = document.createElement('td');
    bonusCell.textContent = bonus;
    row.appendChild(bonusCell);

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

    const gradeCell = document.createElement('td');
    const gradeInput = document.createElement('input');
    gradeInput.type = 'number';
    gradeInput.name = 'grade';
    gradeInput.className = 'table-input'; // Use specific class
    gradeInput.min = 55; // Set minimum value
    gradeInput.max = 100; // Set maximum value
    gradeInput.addEventListener('input', function() {
        let val = parseInt(this.value);
        if (val < 0) this.value = 0;
        if (val > 100) this.value = 100;
        updateBonus(row); 
        updateAvg();
    }); // Add event listener
    gradeCell.appendChild(gradeInput);
    row.appendChild(gradeCell);

    const unitsCell = document.createElement('td');
    const unitsInput = document.createElement('input');
    unitsInput.type = 'number';
    unitsInput.name = 'units';
    unitsInput.value = units;  // Set the pre-filled value
    unitsInput.className = 'table-input'; // Use specific class
    unitsInput.min = 1; // Set minimum value
    unitsInput.addEventListener('input', function() {
        let val = parseInt(this.value);
        if (val < 1) this.value = 1;
        updateBonus(row); 
        updateAvg();
    }); // Add event listener
    unitsCell.appendChild(unitsInput);
    row.appendChild(unitsCell);

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

    return row;
}


// Function to update the bonus based on the units value
function updateBonus(row) {
    const unitsInput = row.querySelector('input[name="units"]');
    const gradeInput = row.querySelector('input[name="grade"]');
    const subjectInput = row.querySelector('input[name="subject"]');
    const examTypeSelect = row.querySelector('select'); // Get the select element for סוג בחינה
    const bonusCell = row.cells[1]; // Access the בונוס cell
    const subjectCell = row.cells[5]; // Access the subject cell

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
    const rows = document.querySelectorAll('#table-body tr');
    let relevantRows = [];

    rows.forEach(row => {
        const units = row.querySelector('input[name="units"]').value;
        const examType = row.querySelector('select').value;
        const grade = row.querySelector('input[name="grade"]').value;
        const subjectText = row.cells[5].textContent || row.querySelector('input[name="subject"]').value;

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
            item.row.cells[1].textContent = 30;
        });
        relevantRows.slice(2).forEach(item => {
            item.row.cells[1].textContent = 25;
        });
    }
    else {
        relevantRows.forEach(item => {
            item.row.cells[1].textContent = 25;
        });;
    }
}

function updateAvg() {
    const university = document.getElementById("bagrut-universities").value;

    // Collect all rows with the required subjects
    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach(row => {updateBonus(row);});

    let sum = 0;
    let subjNum = 0;
    let sortedRows = [];
    let tempRows = [];
    rows.forEach(row => {
        const unitsInput = row.querySelector('input[name="units"]');
        const gradeInput = row.querySelector('input[name="grade"]');
        const subjectInput = row.querySelector('input[name="subject"]');
        const bonusCell = row.cells[1]; // Access the בונוס cell
        const subjectCell = row.cells[5]; // Access the subject cell

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
    })
    
    tempRows.sort((a, b) => b.gradeWithBonus - a.gradeWithBonus);
    tempRows.forEach(item => {sortedRows.push(item.row)});
    
    let avg = Math.floor((sum / subjNum) * 100) / 100;
    sortedRows.forEach(row => {
        const unitsInput = row.querySelector('input[name="units"]');
        const gradeInput = row.querySelector('input[name="grade"]');
        const subjectInput = row.querySelector('input[name="subject"]');
        const bonusCell = row.cells[1]; // Access the בונוס cell
        const subjectCell = row.cells[5]; // Access the subject cell

        const units  = parseInt(unitsInput.value);
        const grade = parseInt(gradeInput.value);
        const bonus = parseInt(bonusCell.textContent);
        // Get the subject value
        const subject = subjectInput ? subjectInput.value : subjectCell.textContent;

        if (units && grade) {
            if (university == "default-uni" || checkIncludeInAvg(subject, university, grade, bonus, avg)) {
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
    const selectedOption = document.getElementById("bagrut-universities").value;
    if (selectedOption === 'TECH') {
            checkMizrafSsubjects();
            updateAvg();
    }
    else {
            updateAvg();
    }
};


// Populate the table with initial rows
defaultTableSubjects.forEach(item => {
    const row = createRow(item.subject, item.units, item.bonus);
    tableBody.appendChild(row);
});

// Add event listener to the "הוסף מקצוע" button
document.getElementById('add-row-button').addEventListener('click', () => {
    const newRow = createRow('', 5, 0, true);
    tableBody.appendChild(newRow);
});