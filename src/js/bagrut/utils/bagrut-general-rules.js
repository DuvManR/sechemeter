// ~~~~~~~~~~~~~~~~~~~~ \\
// Bagrut General Rules \\
// ~~~~~~~~~~~~~~~~~~~~ \\

import {
	mandatorySubjects,
	techMandatorySubjects,
	minBonusGrade,
	minUnitsNum,
	minTechUnitsNum,
	examTypeGemer,
	math,
	english,
	examTypeExam,
	fiveUnits,
	fourUnits,
} from "../bagrut-config.js";
import { TECH } from "../../utils/general-config.js";

// Gets a row's data and checks if its a 5-units math exam
export const isFiveUnitsMath = function (
	subject,
	units,
	examType = examTypeExam,
	grade = minBonusGrade,
	isMath = false
) {
	if (
		subject == math &&
		examType == examTypeExam &&
		(!isFiveUnitsSubject(units) || grade < minBonusGrade)
	) {
		return false;
	} else if (
		subject == math &&
		examType == examTypeExam &&
		isFiveUnitsSubject(units) &&
		grade >= minBonusGrade
	) {
		return true;
	}
	return isMath;
};

// Gets a row's data and checks if its a 4-units math exam
export const isFourUnitsMath = function (subject, units) {
	return subject == math && isFourUnitsSubject(units);
};

// Gets a row's data and checks if its a 4-units English exam
export const isFourUnitsEnglish = function (subject, units) {
	return subject == english && isFourUnitsSubject(units);
};

// Gets a row's data and checks if its a 5-units high-bonus subject
export const isFiveUnitsBonusSubject = function (subject, units, highBonusArr) {
	return highBonusArr.includes(subject) && isFiveUnitsSubject(units);
};

// Gets a row's data and checks if its a 4-units high-bonus subject
export const isFourUnitsBonusSubject = function (subject, units, highBonusArr) {
	return highBonusArr.includes(subject) && isFourUnitsSubject(units);
};

// Gets a row's data and checks if its a 5-units subject
export const isFiveUnitsSubject = function (units) {
	return units >= fiveUnits;
};

// Gets a row's data and checks if its a 4-units subject
export const isFourUnitsSubject = function (units) {
	return units == fourUnits;
};

// Gets a row's data and checks if its grade is under 60 (failure)
export const isFailureGrade = function (grade) {
	return grade < minBonusGrade;
};

// Gets a row's data and checks if its a 5-units gemer work
export const isGemer = function (examType, units) {
	return examType == examTypeGemer && isFiveUnitsSubject(units);
};

// Gets a subject and checks if it's an additional subject (regarding calculation scope), according to the given university scheme
export const isAdditionalCalcSubject = function (subject, university) {
	return (
		(!mandatorySubjects.includes(subject) && university != TECH) ||
		(!techMandatorySubjects.includes(subject) && university == TECH)
	);
};

// Gets a subject and checks if it's an additional subject (regarding calculation scope), according to the given university scheme
// If so, checks if its grade+bonus improves the current bagrut-average
export const shouldIncludeInAvg = function (
	subject,
	university,
	grade,
	bonus,
	currentAverage
) {
	if (isAdditionalCalcSubject(subject, university)) {
		const gain = grade + bonus;
		if (gain > currentAverage) {
			return true;
		}
	}
	return false;
};

// Checks if the bagrut certificate has an invalid number of units (less than 20)
export const isInvalidBagrutUnitsNum = function (unitsNum, university) {
	return (
		(unitsNum < minUnitsNum && university != TECH) ||
		(unitsNum < minTechUnitsNum && university == TECH)
	);
};
