export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + '亿';
  }
};

// 防抖函数
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: number;
  // 第一个位置入参this只是为了ts静态检查使用，编译时不会有该this的存在
  return function(this: any, ...args: any) {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList: any[]) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// 处理歌手列表拼接歌手名字
export const getName = (list: any[]) => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
};
