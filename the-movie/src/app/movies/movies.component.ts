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

  constructor(private firestore: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.movies = this.getItems$();
  }

  getItems$(): Observable<Movie[]>{
    return this.firestore.collection<Movie>('movies').valueChanges();
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MovieInfoComponent, {
      width: '50%',
      height: '60%',
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
