const isEndWithConsonant = (korStr: string) => {
  const finalChrCode = korStr.charCodeAt(korStr.length - 1);
  // 0 = 받침 없음, 그 외 = 받침 있음
  const finalConsonantCode = (finalChrCode - 44032) % 28;
  return finalConsonantCode !== 0;
};

export const returnParticle = (string: string) => {
  if (isEndWithConsonant(string)) {
    return '은';
  }
  return '는';
};

export const convertDate = (time: number) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month < 10 ? `0${month}` : month}.${
    day < 10 ? `0${day}` : day
  }`;
};

export const getDay = (time: number) => {
  const DAYS = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WENSDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };

  switch (time) {
  case DAYS.SUNDAY:
    return '일';
  case DAYS.MONDAY:
    return '월';
  case DAYS.TUESDAY:
    return '화';
  case DAYS.WENSDAY:
    return '수';
  case DAYS.THURSDAY:
    return '목';
  case DAYS.FRIDAY:
    return '금';
  case DAYS.SATURDAY:
    return '토';
  default:
    return '알 수 없음';
  }
};

export const convertRegularDate = (time: number) => {
  const date = new Date(time);
  const day = getDay(date.getDay());
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const division = hours > 12 ? '오후' : '오전';
  return `(${day}) ${division} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};
