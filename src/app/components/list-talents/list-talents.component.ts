import { Component } from '@angular/core';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-list-talents',
  templateUrl: './list-talents.component.html',
  styleUrls: ['./list-talents.component.css']
})
export class ListTalentsComponent {
  showData: any[] = [];

  constructor(private talentService: TalentService) { }
  
  ngOnInit() {
    this.talentService.dataShared.subscribe(data => this.showData = data);
  }
}
