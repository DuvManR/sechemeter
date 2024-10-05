// ~~~~~~~~~~ \\
// TAU Bagrut \\
// ~~~~~~~~~~ \\

import {
	noBonus,
	tauBigBonusSubjects,
	tenBonus,
	thirtyFiveBonus,
	twelvePlusHalfBonus,
	twentyBonus,
	twentyFiveBonus,
} from "../bagrut-config.js";
import {
	isFailureGrade,
	isFiveUnitsMath,
	isFiveUnitsSubject,
	isFourUnitsSubject,
	isFiveUnitsBonusSubject,
	isGemer,
	isFourUnitsMath,
	isFourUnitsEnglish,
} from "../utils/bagrut-general-rules.js";

// Gets TAU's row's data and returns the appropriate bonus cell value accordingly
const getTauBonus = function (subject, units, grade, selectedExamType) {
	if (isFailureGrade(grade)) {
		return noBonus;
	} else if (isGemer(selectedExamType, units)) {
		return twentyBonus;
	} else if (isFiveUnitsMath(subject, units)) {
		return thirtyFiveBonus;
	} else if (
		isFourUnitsMath(subject, units) ||
		isFourUnitsEnglish(subject, units)
	) {
		return twelvePlusHalfBonus;
	} else if (isFiveUnitsBonusSubject(subject, units, tauBigBonusSubjects)) {
		return twentyFiveBonus;
	} else if (isFiveUnitsSubject(units)) {
		return twentyBonus;
	} else if (isFourUnitsSubject(units)) {
		return tenBonus;
	}
	return noBonus; // No bonus subject
};

export default getTauBonus;
