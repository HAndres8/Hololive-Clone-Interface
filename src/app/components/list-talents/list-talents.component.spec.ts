import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTalentsComponent } from './list-talents.component';

describe('ListTalentsComponent', () => {
  let component: ListTalentsComponent;
  let fixture: ComponentFixture<ListTalentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTalentsComponent]
    });
    fixture = TestBed.createComponent(ListTalentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
