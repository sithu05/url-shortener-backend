import moment from 'moment';
import * as alphanumic from 'alphanum-increment';

export const generateUniqueNo = (uniqueNo: string, prefix = ''): string => {
	const current = moment().format('YYMM');

	if (!uniqueNo) {
		return `${prefix}${current}00000a`;
	} else if (uniqueNo.substr(prefix.length, 4) !== current) {
		return `${current}00000a`;
	} else {
		return alphanumic.increment(uniqueNo, {
			digit: false,
			dashes: false,
		});
	}
};
