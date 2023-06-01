import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/credits.interface';
import Swiper, { FreeMode } from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast?:Cast[];
  
  actores:Cast[]= []

  constructor( private router: Router) { 
  
  }
  
  ngAfterViewInit(){
    
 
    const swiper = new Swiper('.swiper', {
      slidesPerView:5.3,
      freeMode:true,
      spaceBetween:15

    })

    
  }

  ngOnInit(): void {

    //console.log(this.cast)
  }

  onActorClick(actor:any){


    this.router.navigate(['/actor', actor.id])
    

  }


}
