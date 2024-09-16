// ~~~~~~~~~~ \\
// BIU Bagrut \\
// ~~~~~~~~~~ \\

import {
	biuBigBonusSubjects,
	fifteenBonus,
	noBonus,
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
	isFourUnitsBonusSubject,
	isGemer,
	isFourUnitsMath,
} from "../utils/bagrut-general-rules.js";

// Gets BIU's row's data and returns the appropriate bonus cell value accordingly
const getBiuBonus = function (subject, units, grade, selectedExamType) {
	if (isFailureGrade(grade)) {
		return noBonus;
	} else if (isGemer(selectedExamType, units)) {
		return twentyBonus;
	} else if (isFiveUnitsMath(subject, units)) {
		return thirtyFiveBonus;
	} else if (isFourUnitsMath(subject, units)) {
		return fifteenBonus;
	} else if (isFiveUnitsBonusSubject(subject, units, biuBigBonusSubjects)) {
		return twentyFiveBonus;
	} else if (isFourUnitsBonusSubject(subject, units, biuBigBonusSubjects)) {
		return twelvePlusHalfBonus;
	} else if (isFiveUnitsSubject(units)) {
		return twentyBonus;
	} else if (isFourUnitsSubject(units)) {
		return tenBonus;
	}
	return noBonus; // No bonus subject
};
export default getBiuBonus;
