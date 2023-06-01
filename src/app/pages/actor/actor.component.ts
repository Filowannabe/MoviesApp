import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/pelicula.interface';
import { Actor } from 'src/app/interfaces/pelicula.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common'
import { Cast} from 'src/app/interfaces/credits.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actores?:MovieDetails;
  actor?:Actor;
  cast:Cast[]=[];

  constructor(config: NgbRatingConfig, private activatedRoute: ActivatedRoute, private peliculasSvc:PeliculasService, private location:Location, private router: Router) { 
     // customize default values of ratings used by this component tree
     config.max = 10;
     config.readonly = true;
  }

  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;
    combineLatest([
      this.peliculasSvc.getActor(id)  
    ]).subscribe(([actor])=>{

      if (!actor) {
        this.router.navigateByUrl('/');
          return;
        }

        this.actor=actor;
        // this.actor=actor;
        console.log(actor);
    })
  }

  regresar(){

this.location.back();

  }  

}
