import { Inject, Injectable, Query } from '@nestjs/common';
import { ApiEntity } from '../entities/api.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiRepo {
  constructor(private readonly httpService: HttpService) {}

  public async getPage(page: number): Promise<ApiEntity[]> {
    const response = await this.httpService.axiosRef.get('/api/character', {
      params: { page: page },
    });
    return response.data.results;
  }

  public async getCharacterById(id: string): Promise<ApiEntity> {
    const response = await this.httpService.axiosRef.get(
      `/api/character/${id}`,
    );
    return response.data;
  }
}
