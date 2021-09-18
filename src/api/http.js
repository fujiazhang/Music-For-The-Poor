import axios from 'axios';
import qs from 'qs';
import { HOST } from './config';


axios.interceptors.response.use(
  response => {
    if (response.data) {
      return response;
    }
    return Promise.reject(response);
  },
  error => {
    return Promise.reject(error.response);
  },
);

export class Http {

  async request(config) {
    let response;

    try {
      response = await axios(
        {
          ...config,
          url: HOST + config.url,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }

  async get(url, params) {
    const config = {
      method: 'GET',
      url,
      params,
    };
    return this.request(config);
  }

  async post(url, params) {
    const config = {
      method: 'POST',
      url,
      data: params,
    };
    return this.request(config);
  }

  formPost(url, params) {
    const config = {
      method: 'POST',
      url,
      data: qs.stringify(params),
    };
    return this.request(config);
  }

  patch(url, params) {
    const config = {
      method: 'PATCH',
      url,
      data: params,
    };
    return this.request(config);
  }


  put(url, params) {
    const config = {
      method: 'PUT',
      url,
      data: params,
    };
    return this.request(config);
  }

  delete(url, params) {
    const config = {
      method: 'DELETE',
      url,
      data: params,
    };
    return this.request(config);
  }
}
