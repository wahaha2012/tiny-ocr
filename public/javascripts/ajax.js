var ajax = {
  get: function(url, options) {
    return fetch(url, {
      method: 'GET',
      headers: new Headers(Object.assign({

      }, options.headers || {})),
    });
  },
  post: function(url, data, options) {
    return fetch(url, {
      method: 'POST',
      headers: new Headers(Object.assign({

      }, options.headers || {})),
      body: options.type === 'json' ? JSON.stringify(data) : data,
    })
  }
};