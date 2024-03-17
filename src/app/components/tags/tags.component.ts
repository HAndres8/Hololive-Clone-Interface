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
      {'name:': 'Tokino Sora', 'branch': 'hololive', 'gen': 'gen-0'},
      {'name:': 'Robocosan', 'branch': 'hololive', 'gen': 'gen-0'},
      {'name:': 'Aki Rosenthal', 'branch': 'hololive', 'gen': 'gen-1'},
      {'name:': 'Akai Haato', 'branch': 'hololive', 'gen': 'gen-1'},
      {'name:': 'Shirakami Fubuki', 'branch': 'hololive', 'gen': 'gen-1'},
      {'name:': 'Natsuiro Matsuri', 'branch': 'hololive', 'gen': 'gen-1'},
      {'name:': 'Minato Aqua', 'branch': 'hololive', 'gen': 'gen-2'}
    ]
  }

  allTalents(nbutton: number) {
    this.showData = this.data;
    this.linkActive = nbutton;
    console.log(this.showData);
  }

  /* Implements whit switch-case */
  filterTalentsByBra(nbutton: number, branch: string) {
    for(let i=0; i<this.data.length; i++){
      if(this.data[i].branch == 'hololive' && this.data[i].branch == branch){
        this.myData.push(this.data[i]);
      }
      if(this.data[i].branch == 'branch2' && this.data[i].branch == branch){
        this.myData.push(this.data[i]);
      }
      if(this.data[i].branch == 'branch3' && this.data[i].branch == branch){
        this.myData.push(this.data[i]);
      }
    }

    this.showData = this.myData;
    this.myData = [];
    this.linkActive = nbutton;
    console.log(this.showData);
  }

  /* Implements whit switch-case */
  filterTalentsByGen(nbutton: number, gen: string) {
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
    console.log(this.showData);
  }
}
