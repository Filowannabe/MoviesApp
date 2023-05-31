import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits.interface';
import { MovieDetails } from 'src/app/interfaces/pelicula.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Buy, WatchProviders } from '../../interfaces/provider.interface';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  pelicula?: MovieDetails;
  providers?: WatchProviders;
  cast: Cast[] = [];
  flatrates?: Buy[];
  link?: string;

  constructor(
    config: NgbRatingConfig,
    private activatedRoute: ActivatedRoute,
    private peliculasSvc: PeliculasService,
    private location: Location,
    private router: Router
  ) {
    // customize default values of ratings used by this component tree
    config.max = 10;
    config.readonly = true;
  }

  ngOnInit() {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasSvc.getPeliculaDetalle(id),
      this.peliculasSvc.getCast(id),
    ]).subscribe(([movie, cast]) => {
      if (!movie) {
        this.router.navigateByUrl('/');
        return;
      }

      this.pelicula = movie;
      this.cast = cast;
    });

    this.peliculasSvc.getwatchProviders(id).subscribe((providers) => {
      if (
        providers &&
        providers.results &&
        providers.results.CO &&
        providers.results.CO.flatrate &&
        providers.results.CO.link
      ) {
        const { flatrate, link } = providers.results.CO;
        this.flatrates = flatrate;
        this.link = link;
      }
    });
  }

  regresar() {
    this.location.back();
  }
}
