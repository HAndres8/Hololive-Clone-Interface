import { Component } from '@angular/core';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  showData: any[] = [];             // Data for the list-talents component
  linkActive: string = 'all';       // Button active

  constructor(private talentService: TalentService) { }

  ngOnInit(): void {
    this.allTalents();
  }

  filterTalentsByGen(gen:string) {
    this.talentService.getGene(gen).subscribe(data => {
      this.showData = this.orderOneGen(data);
      this.linkActive = gen;
      this.talentService.shareData(this.showData);        // Share the data
    });
  }

  filterTalentsByBra(bra:string) {
    this.talentService.getBranch(bra).subscribe(data => {
      this.showData = this.orderOneBranch(data);
      this.linkActive = bra;
      this.talentService.shareData(this.showData);
    });
  }

  allTalents() {
    this.talentService.getBranches().subscribe(data => {
      this.showData = this.orderBranches(data);
      this.linkActive = 'all';
      this.talentService.shareData(this.showData);
    });
  }

  
  orderOneGen(data:any):any {
    const { nameG, talentsGeneration } = data;
    
    const allTale = talentsGeneration.map((talent:any) =>             // Save the talents in the branch
     ({ generation: nameG, talent }));

    // If active
    const activeTale = allTale.filter((t:any) => t.talent.isActive);
    // If inactive
    const alumTale = allTale.filter((t:any) => !t.talent.isActive);
    
    return [...activeTale, ...alumTale];                              // First talents, then alum
  }
  orderOneBranch(data:any):any {
    const { nameB, generationsBranch } = data                         // Saves the generations in the branch
    let noDupli = new Set<string>();

    const allTale = generationsBranch.flatMap((generation:any) =>
      generation.talentsGeneration.map((talent:any) =>                // Save the talents in the branch
        ({ generation: generation.name, talent }))
    );

    // If active, also skip duplicates
    const activeTale = allTale
    .filter((t:any) => t.talent.isActive)
    .filter((t:any) => {
      if(noDupli.has(t.talent.name)) {
        return false;
      }
      noDupli.add(t.talent.name);
      return true;
    });
    // If inactive
    const alumTale = allTale.filter((t:any) => !t.talent.isActive);

    return [...activeTale, ...alumTale];                              // First talents, then alum
  }
  orderBranches(data:any):any {
    let noDupli = new Set<string>();

    const allTale = data.flatMap((branch:any) =>
      branch.generationsBranch.flatMap((generation:any) =>            // Save the generations in the branch
        generation.talentsGeneration.map((talent:any) =>              // Save the talents in the branch
          ({ generation: generation.name, talent }))
    ));

    // Normal branches first, active talents and skip duplicates
    const activeTale = allTale
    .filter((t:any) => t.generation != 'alum' && t.generation != 'staff')
    .filter((t:any) => t.talent.isActive)
    .filter((t:any) => {
      if(noDupli.has(t.talent.name)) {
        return false;
      }
      noDupli.add(t.talent.name);
      return true;
    });

    // If talent is alum (All alums are inactive)
    const alumTale = allTale
    .filter((t:any) => t.generation == 'alum');

    // If talent is staff and active
    const activeStaff = allTale
    .filter((t:any) => t.generation == 'staff')
    .filter((t:any) => t.talent.isActive);

    // If talent is staff and inactive
    const alumStaff = allTale
    .filter((t:any) => t.generation == 'staff')
    .filter((t:any) => !t.talent.isActive);

    // First talents, then alums, then staff, then inactive staff
    return [...activeTale, ...alumTale, ...activeStaff, ...alumStaff];
  }
}
