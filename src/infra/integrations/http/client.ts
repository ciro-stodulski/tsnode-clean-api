import axios, { AxiosRequestConfig, AxiosInstance, Method } from 'axios';
import { axiosLogger } from 'src/shared/logger';
import { Http, HttpConfig, HttpResponse } from 'src/infra/integrations';

export class HttpClient implements Http {
  private instance: AxiosInstance;

  get<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.get(url, this.loadConfigs(config));
  }

  post<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.post(url, data, this.loadConfigs(config));
  }

  delete<T = any, R = HttpResponse<T>>(
    url: string,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.delete(url, this.loadConfigs(config));
  }

  patch<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.patch(url, data, this.loadConfigs(config));
  }

  put<T = any, R = HttpResponse<T>>(
    url: string,
    data?: any,
    config?: HttpConfig
  ): Promise<R> {
    return this.instance.put(url, data, this.loadConfigs(config));
  }

  createInstance(config: HttpConfig): void {
    this.instance = axios.create({
      ...this.loadConfigs(config),
    });
    axiosLogger.attachInterceptor.bind(axiosLogger)(this.instance);
  }

  protected loadConfigs(config?: HttpConfig): AxiosRequestConfig {
    if (!config) {
      return {};
    }
    const { base_url, data, headers, method, params, timeout, url } = config;
    const casted_method = method as Method;

    return {
      url,
      method: casted_method,
      baseURL: base_url,
      headers,
      params,
      data,
      timeout,
    };
  }
}
