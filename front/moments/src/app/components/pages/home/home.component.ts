import { Component } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch;
  searchTerm:string = '';

  constructor(private momentsService: MomentService){}

  ngOnInit():void{
    this.momentsService.getMoments().subscribe((items)=>{
      const data = items.data;

      data.map((item)=>{
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
      })
      this.allMoments = data;
      this.moments = data;
    } );
  }

  search(event:Event){

    const target = event.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter(moment => {
      return moment.title.toLocaleLowerCase().includes(value);
    })
    
  }


}
