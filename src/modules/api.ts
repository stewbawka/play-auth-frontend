import axios, { AxiosRequestConfig } from 'axios';
import humps from 'humps';
import { ref } from 'vue';
import config from '@/config';

export const useApi = (path: string) => {
  const api = axios.create({
    baseURL: config.apiBaseUrl,
  });

  const data = ref();
  const loading = ref(false);

  const get = (config?: AxiosRequestConfig) => {
    loading.value = true;

    return api.get(path, config)
      .then(res => data.value = humps.camelizeKeys(res.data.data))
      .finally(() => loading.value = false);
  };

  const post = (payload?: Record<string, any>, config?: AxiosRequestConfig) => {
    loading.value = true;

    return api.post(path, payload, config)
      .then(res => data.value = humps.camelizeKeys(res.data.data))
      .finally(() => loading.value = false);
  };

  return { loading, data, get, post };

}
