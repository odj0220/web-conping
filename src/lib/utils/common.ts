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

export const getParams = (params: {[key:string]: any}): string => {
  return Object.keys(params).map((key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)).join('&');
};
