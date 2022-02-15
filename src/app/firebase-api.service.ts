import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from "./book";
import { Observable, observable, throwError } from 'rxjs';
import {retry, catchError} from 'rxjs/operators'
import { errorMonitor } from 'events';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  apiURL ="";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'

    })
  }

  getBooks(): Observable<Book> {
    return this.http.get<Book>(this.apiURL + '/getBooks')
    .pipe(
      retry (1),
      catchError(this.handleError)
    )
    }

    addBook(title:string, author:string): Observable<Book> {
      return this.http.post<Book>(this.apiURL + '/addBook?title=' + title +'&authors' +author,null)
      .pipe(
        retry (1),
        catchError(this.handleError)
      )
      }

      delBook(id:string): Observable<Book> {
        return this.http.delete<Book>(this.apiURL + '/deleteBook?id=' + id)
        .pipe(
          retry (1),
          catchError(this.handleError)
        )
        }

handleError(error: { error: { message: string; }; status: any; message: any; }) {
  let errorMessage ='';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}


  }