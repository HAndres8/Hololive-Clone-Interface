import { Component } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  showData: any[] = [];
  myData: any[] = [];
  data: any[] = [];
  linkActive: number = 0;

  ngOnInit(): void{
    this.data = [
      {'name:': 'Tokino Sora', 'gen': 'gen-0'},
      {'name:': 'Robocosan', 'gen': 'gen-0'},
      {'name:': 'Aki Rosenthal', 'gen': 'gen-1'},
      {'name:': 'Akai Haato', 'gen': 'gen-1'},
      {'name:': 'Shirakami Fubuki', 'gen': 'gen-1'},
      {'name:': 'Natsuiro Matsuri', 'gen': 'gen-1'},
      {'name:': 'Minato Aqua', 'gen': 'gen-2'}
    ]
  }

  filterTalents(nbutton: number, gen: string) {
    for(let i=0; i<this.data.length; i++){
      if(this.data[i].gen == 'gen-0' && this.data[i].gen == gen){
        this.myData.push(this.data[i]);
      }
      if(this.data[i].gen == 'gen-1' && this.data[i].gen == gen){
        this.myData.push(this.data[i]);
      }
      if(this.data[i].gen == 'gen-2' && this.data[i].gen == gen){
        this.myData.push(this.data[i]);
      }
    }

    this.showData = this.myData;
    this.myData = [];
    this.linkActive = nbutton;
  }
}
