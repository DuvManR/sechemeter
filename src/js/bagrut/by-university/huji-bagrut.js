// ~~~~~~~~~~~ \\
// HUJI Bagrut \\
// ~~~~~~~~~~~ \\

import {
	fifteenBonus,
	hujiBigBonusSubjects,
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
	isFourUnitsBonusSubject,
} from "../utils/bagrut-general-rules.js";

// Gets HUJI's row's data and returns the appropriate bonus cell value accordingly
const getHujiBonus = function (subject, units, grade, selectedExamType) {
	if (isFailureGrade(grade)) {
		return noBonus;
	} else if (isFiveUnitsMath(subject, units, selectedExamType)) {
		return thirtyFiveBonus;
	} else if (isFiveUnitsBonusSubject(subject, units, hujiBigBonusSubjects)) {
		return twentyFiveBonus;
	} else if (isFourUnitsBonusSubject(subject, units, hujiBigBonusSubjects)) {
		return fifteenBonus;
	} else if (isFiveUnitsSubject(units)) {
		return twentyBonus;
	} else if (isFourUnitsSubject(units)) {
		return tenBonus;
	}
	return noBonus; // No bonus subject
};

export default getHujiBonus;
