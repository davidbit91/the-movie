
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../share/interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Observable<Movie[]>;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.movies = this.getItems$();
  }

  getItems$(): Observable<Movie[]>{
    return this.firestore.collection<Movie>('movies').valueChanges();
  }

}
