import { parse, stringify } from 'query-string';

export const parseQueryString = query =>
  parse(query, {
    arrayFormat: 'bracket',
  });

export const stringifyQuery = query =>
  stringify(query, {
    arrayFormat: 'bracket',
    encode: false,
  });

export const stringifyUrl = (pathname, query) => {
  if (Object.keys(query).length === 0) {
    return pathname;
  }
  return `${pathname}?${stringifyQuery(query)}`;
};
