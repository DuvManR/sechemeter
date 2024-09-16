// ~~~~~~~~~~ \\
// BGU Bagrut \\
// ~~~~~~~~~~ \\

import {
	bguBigBonusSubjects,
	fifteenBonus,
	noBonus,
	tenBonus,
	thirtyFiveBonus,
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

// Gets BGU's row's data and returns the appropriate bonus cell value accordingly
const getBguBonus = function (subject, units, grade, selectedExamType) {
	if (isFailureGrade(grade)) {
		return noBonus;
	} else if (isGemer(selectedExamType, units)) {
		return twentyBonus;
	} else if (isFiveUnitsMath(subject, units)) {
		return thirtyFiveBonus;
	} else if (isFourUnitsMath(subject, units)) {
		return twentyBonus;
	} else if (isFiveUnitsBonusSubject(subject, units, bguBigBonusSubjects)) {
		return twentyFiveBonus;
	} else if (isFourUnitsEnglish(subject, units)) {
		return fifteenBonus;
	} else if (isFiveUnitsSubject(units)) {
		return twentyBonus;
	} else if (isFourUnitsSubject(units)) {
		return tenBonus;
	}
	return noBonus; // No bonus subject
};

export default getBguBonus;
