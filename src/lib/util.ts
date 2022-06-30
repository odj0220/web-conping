export const guid = () => {
  const _s4 = () => {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };
  return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
};

export const toHHMMSS = (secs: number) => {
  if (!secs) {
    return '00:00';
  }
  const sec_num = parseInt(secs.toString(), 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => v < 10 ? '0' + v : v)
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};
