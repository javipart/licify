import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { ProjectService } from './project.service';
import { map } from 'rxjs';
import { Item } from '../../../shared/models/items';

interface Propousal {
  project: string,
  provider: string,
  items: Item,
}

@Injectable({
  providedIn: 'root'
})
export class PropousalService {

  constructor(
    private http: HttpClient,
    private projecService: ProjectService,
  ) { }

  savePropousal(data: Propousal) {
    return this.http.post(`${environment.apiUrl}/propousal`, data)
    .pipe(map(() => {
      this.projecService.notifySuccess();
    }))
  }
}
