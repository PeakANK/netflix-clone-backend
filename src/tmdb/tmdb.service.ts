import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  constructor(private readonly http: HttpService) {}

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const { data } = await firstValueFrom(this.http.get<T>(path, { params }));
    return data;
  }
}
