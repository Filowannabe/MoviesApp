import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/peliculas.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideShow: Movie[] = [];
  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) * 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      if (this.peliculasSvc.cargando) { return; }
      this.peliculasSvc.getPeliculas().subscribe(movies => {

        this.movies.push(...movies);


      })
    }
  }

  constructor(private peliculasSvc: PeliculasService) {
  }

  peliculas() {
    this.peliculasSvc.getPeliculas().subscribe(movies => {  
      this.movies = movies;
      this.moviesSlideShow = movies;
    })

  }

  ngOnInit(): void {
    this.peliculas();
  }

  ngOnDestroy() {
    this.peliculasSvc.resetPeliculaPage();
  }


  aleatoridad() {
   let p = [this.peliculasSvc.getPeliculas().subscribe(movies => {
        this.movies = movies;
      this.moviesSlideShow = movies;
    })];
    const r = Math.floor(Math.random() * (p.length - 1));
    return this.moviesSlideShow[r];
  }
}
