import {ParsedQuery, parse, stringify} from 'query-string';
import {useState} from 'react';

export interface QueryStringResult {
  [0]: ParsedQuery;
  [1]: (values: object) => void;
}

export default function useQueryString(
  location: Location,
  navigate: (path: string) => void
): QueryStringResult {
  const [state, setState] = useState(parse(location.search));

  function setQuery(values: object): void {
    const newQuery = {
      ...state,
      ...values
    };

    setState(newQuery);
    navigate(location.pathname + '?' + stringify(newQuery));
  }

  return [state, setQuery];
}
