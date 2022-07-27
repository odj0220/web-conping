
const GRAPHQL_URL = '/api/graphql';
const BACKEND_URL = 'https://gollala-backend-wzsqjexeka-du.a.run.app';

interface fetchOption {
  method?: string;
  body?: any;
  params?: any;
  headers?: any;
  responseType?: string;
}

const defaultOption = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createParams = (params: any): string => {
  return new URLSearchParams(params).toString();
};


export function graphqlApi(query: string) {
  const body = { query };
  return fetch(GRAPHQL_URL, {
    method: 'post',
    body: body && JSON.stringify(body),
  }).then(res => res.json());
}

export function backEndApi(url: string, option: fetchOption) {
  let params = '';
  let requestUrl = `${BACKEND_URL}${url}`;

  if (option.params) {
    params = createParams(option.params);
    requestUrl += `?${params}`;
  }

  return fetch(requestUrl, {
    ...option,
    body: option.body ? JSON.stringify(option.body) : null,
  })
    .then(res => {
      if (option.responseType === 'text') {
        return res.text();
      }
      return res.json();
    });
}

export function GET(url: string, option?: fetchOption) {
  return backEndApi(url, {
    ...defaultOption,
    ...option,
    method: 'GET',
  });
}

export function POST(url: string, option?: fetchOption) {
  return backEndApi(url, {
    ...defaultOption,
    ...option,
    method: 'POST',
  });
}

export function DELETE(url: string, option?: fetchOption) {
  return backEndApi(url, {
    ...defaultOption,
    ...option,
    method: 'DELETE',
  });
}

export function PATCH(url: string, option?: fetchOption) {
  return backEndApi(url, {
    ...defaultOption,
    ...option,
    method: 'PATCH',
  });
}




