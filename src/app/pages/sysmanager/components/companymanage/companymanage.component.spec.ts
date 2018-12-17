import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymanageComponent } from './companymanage.component';

describe('CompanymanageComponent', () => {
  let component: CompanymanageComponent;
  let fixture: ComponentFixture<CompanymanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanymanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanymanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
