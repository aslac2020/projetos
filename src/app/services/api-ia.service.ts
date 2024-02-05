import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN_API = '4069ae3a-8059-4a8b-b9c4-db644ba59275';
const API_URL = 'https://api.deepai.org/api/text2img';

@Injectable({
  providedIn: 'root',
})
export class ApiIaService {
  constructor(private http: HttpClient) {}

  public uploadImage(imageUrl: string) {
    const formData = new FormData();
    formData.append('image', imageUrl);

    return this.http.post<any>(API_URL, formData, {
      headers: {
        'Api-Key': TOKEN_API,
      },
    });
  }
}
