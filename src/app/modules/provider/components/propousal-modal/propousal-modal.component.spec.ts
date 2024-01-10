import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropousalModalComponent } from './propousal-modal.component';

describe('PropousalModalComponent', () => {
  let component: PropousalModalComponent;
  let fixture: ComponentFixture<PropousalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropousalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropousalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
