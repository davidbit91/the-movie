import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from './../movie-info/movie-info.component';

import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Movie } from '../share/interfaces/movie';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Observable<Movie[]>;
  movie: any;
  getMovie: any;
  movieImg: string[];
  cont: number;

  constructor(private firestore: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.movies = this.getItems$();
  }

  getItems$(): Observable<Movie[]>{
    return this.firestore.collection<Movie>('movies').valueChanges();
  }
  getItem$(id){
    this.getMovie = this.firestore.collection('movies').doc('3');
    this.getMovie.ref.get()
        .then((doc)  => {
            if (doc.exists) {
                this.movie = doc.data();
            } else {
                console.error('Movie not found');
            }
    });
  }
  openDialog(movie): void {
    const dialogRef = this.dialog.open(MovieInfoComponent, {
      width: '250px',
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
