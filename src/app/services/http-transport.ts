enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: string;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}) {
    const query = queryStringify(options.data);
    const targetUrl = query ? `${url}${query}` : url;
    return this.request(targetUrl, { ...options, method: Method.GET });
  }

  put(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.PUT });
  }

  post(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.POST });
  }

  delete(url: string, options: OptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: Method.DELETE });
  }

  request(url: string, options: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

function queryStringify(data: {}) {
  return Object.entries(data).map(([key, value]) => `${key}=${value}`)
    .reduce((acc, cur) => acc += `${cur}&`, '?')
    .slice(0, -1);
}
