import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit} from '@angular/core';
import { FirebaseApiService } from './firebase-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 MyBooks: any = [];
 titleValue='';
 authorValue='';

 constructor(public FirebaseApiService: FirebaseApiService) {

 }

 ngOnInit() {
   this.loadBooks();

 }

 loadBooks() {
   return this.FirebaseApiService.getBooks().subscribe((data: {}) =>{
     this.MyBooks = data;
   })
 }
 addBook() {
  return this.FirebaseApiService.addBook(this.titleValue,this.authorValue).subscribe((data: {}) =>{

    this.MyBooks = data;
    this.titleValue = '';
    this.authorValue = '';
  })
}
deleteBook(id:string) {
  return this.FirebaseApiService.delBook(id).subscribe((data: {}) =>{
    this.MyBooks = data;
  })
}
}
