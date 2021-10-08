import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class IsoCodeService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCoordinatorData(programId: number) {
    return this.http.get(this.apiUrl + 'api/Admin/coordinators/' + programId);
  }

  postIsoCode(payload:any[], adminId: number) {
    return this.http.post(this.apiUrl + "api/IsoCode/addisocode/" + adminId, payload)
  }

  getIsoCode(programId: number) {
    return this.http.get(this.apiUrl + "api/IsoCode/program/" + programId)
  }
}
