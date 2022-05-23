import axios, { AxiosRequestConfig } from 'axios';
import humps from 'humps';
import { ref } from 'vue';
import { default as appConfig } from '@/config';

export const useApi = (path: string, config?: AxiosRequestConfig) => {
  
  const api = axios.create({
    baseURL: appConfig.apiBaseUrl,
    ...config,
  });

  const data = ref();
  const loading = ref(false);
  const error = ref();

  const get = (config?: AxiosRequestConfig) => {
    loading.value = true;
    error.value = undefined;

    return api.get(path, config)
      .then(res => data.value = humps.camelizeKeys(res.data.data))
      .catch(e => {
        error.value = e;
        throw e;
      })
      .finally(() => loading.value = false);
  };

  const post = (payload?: Record<string, any>, config?: AxiosRequestConfig) => {
    loading.value = true;

    return api.post(path, payload, config)
      .then(res => data.value = humps.camelizeKeys(res.data.data))
      .finally(() => loading.value = false);
  };

  return { loading, data, error, get, post };

}
