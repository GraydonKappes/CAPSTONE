import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

export interface SystemModel {
  id?: number;
  // Add other system-specific properties here
}

@Injectable({
  providedIn: 'root'
})
export class SystemService extends BaseService<SystemModel> {
  constructor(http: HttpClient) {
    super(http, 'systems'); // 'systems' is the API route for system endpoints
  }
}
