import { Component } from '@angular/core';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  showData: any[] = [];             // Data for the list-talents component
  linkActive: number = 0;           // Button active

  constructor(private talentService: TalentService) { }

  ngOnInit(): void {
    this.allTalents(0);
  }

  filterTalentsByGen(nbutton:number, gen:string) {
    this.talentService.getGene(gen).subscribe(data => {
      this.showData = this.orderOneGen(data);
      this.linkActive = nbutton;
      this.talentService.shareData(this.showData);        // Share the data
    });
  }

  filterTalentsByBra(nbutton:number, bra:string) {
    this.talentService.getBranch(bra).subscribe(data => {
      this.showData = this.orderOneBranch(data);
      this.linkActive = nbutton;
      this.talentService.shareData(this.showData);
    });
  }

  allTalents(nbutton:number) {
    this.talentService.getBranches().subscribe(data => {
      this.showData = this.orderBranches(data);
      this.linkActive = nbutton;
      this.talentService.shareData(this.showData);
    });
  }

  
  orderOneGen(data:any):any {
    let activeTale = [];
    let alumTale = [];

    const tals = data.talentsGeneration;                // Save the talents in the branch
    for(let i=0; i<tals.length; i++){
        if(!tals[i].isAlum){                            // If not alum
            activeTale.push(tals[i]);
        }else{
            alumTale.push(tals[i]);                       // If alum
        }
    }

    activeTale = activeTale.concat(alumTale);                     // First talents, then alum
    return activeTale;
  }
  orderOneBranch(data:any):any {
    let activeTale = [];
    let alumTale = [];
    let noDupli = new Set<string>();

    const gens = data.generationsBranch;                    // Saves the generations in the branch
    for(let i=0; i<gens.length; i++){

        const tals = gens[i].talentsGeneration;             // Save the talents in the branch
        for(let j=0; j<tals.length; j++){
            if(!tals[j].isAlum){                            // If not alum
                activeTale.push(tals[j]);
            }else{
                alumTale.push(tals[j]);                     // If alum
            }
        }
    }

    let myData = activeTale.filter(talent => {
      if(noDupli.has(talent.name)) {
        return false;
      }
      noDupli.add(talent.name);
      return true;
    }); 
    myData = myData.concat(alumTale);                       // First talents, then alum
    return myData;
  }
  orderBranches(data:any):any {
    let activeTale = [];
    let otherTale = [];
    let noDupli = new Set<string>();

    for(let i=0; i<data.length; i++){
        if(data[i].name != 'alum' && data[i].name != 'staff'){      // Normal branches first

            const gens = data[i].generationsBranch;                 // Saves the generations in the branch
            for(let j=0; j<gens.length; j++){

                const tals = gens[j].talentsGeneration;             // Save the talents in the branch
                for(let k=0; k<tals.length; k++){
                    if(!tals[k].isAlum){                            // Only active talents
                      activeTale.push(tals[k]);
                    }
                }
            }
        }else{                                                      // Other branches
            const gens = data[i].generationsBranch;
            for(let j=0; j<gens.length; j++){
                
                const tals = gens[j].talentsGeneration;
                for(let k=0; k<tals.length; k++){
                  otherTale.push(tals[k]);                          // Only alum and staff
                }
            }
        }
    }

    let myData = activeTale.filter(talent => {
      if(noDupli.has(talent.name)) {
        return false;
      }
      noDupli.add(talent.name);
      return true;
    }); 		                                                        // Remove duplicate active talents
    myData = myData.concat(otherTale);                              // First talents, then others
    return myData;
  }
}
