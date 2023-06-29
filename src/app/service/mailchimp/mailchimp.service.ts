import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Injectable({
  providedIn: 'root',
})
export class MailchimpService {
  endpoint = environment.mailChimpEndpoint;
  hiddenInputName = environment.mailChimpInputName;
  name = 'EMAIL';
  constructor(private http: HttpClient) {}

  submit(email: string) {
    const params = new HttpParams()
      .set(this.name, email)
      .set(this.hiddenInputName, '');

    const mailChimpUrl = this.endpoint + params.toString();
    return this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c');
  }
}
