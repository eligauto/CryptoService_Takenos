import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IHttpClient } from '../interfaces/http-client.interface';

@Injectable()
export class HttpClientService implements IHttpClient {
  constructor(private httpService: HttpService) {}

  async get(url: string, options?: any): Promise<AxiosResponse<any>> {
    return await lastValueFrom(this.httpService.get(url, options));
  }
}