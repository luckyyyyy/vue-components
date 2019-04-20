/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

export const isDevelop = process.env.NODE_ENV !== 'production';

const cloneR = (obj, cache = new Map()) => {
  // check if obj has already cloned before (circular)
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  // new clone
  let newObj = obj;
  const type = typeof obj;
  if (type === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      newObj = [];
      cache.set(obj, newObj);
      obj.forEach((v, i) => {
        newObj[i] = cloneR(v, cache);
      });
    } else {
      newObj = {};
      cache.set(obj, newObj);
      Object.keys(obj).forEach((k) => {
        newObj[k] = cloneR(obj[k], cache);
      });
    }
  }
  return newObj;
};
export const clone = obj => cloneR(obj);

// export const clone = obj => JSON.parse(JSON.stringify(obj));

export const decodeJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
};

export const encodeJson = obj => JSON.stringify(obj);

export const isEmpty = obj => !obj || Object.keys(obj).length === 0;

/**
 * 时间戳 转换为 yyyy-MM-dd HH:mm:ss
 * @param {number} timestamp
 * @param {string} format
 */
export const timestampToDateTime = (timestamp: number = Date.now(), format: string = 'yyyy-MM-dd HH:mm:ss') => {
  if (isNaN(timestamp)) {
      return '';
  }

  if (format.length < 4 || 'yyyy-MM-dd HH:mm:ss'.indexOf(format) !== 0) {
      return '';
  }

  const date: Date = new Date(Number(timestamp));

  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();
  const second: number = date.getSeconds();

  return format.replace('yyyy', year.toString())
    .replace('MM', month > 9 ? month.toString() : `0${month}`)
    .replace('dd', day > 9 ? day.toString() : `0${day}`)
    .replace('HH', hour > 9 ? hour.toString() :`0${hour}`)
    .replace('mm', minute > 9 ? minute.toString() : `0${minute}`)
    .replace('ss', second > 9 ? second.toString() : `0${second}`);
}
