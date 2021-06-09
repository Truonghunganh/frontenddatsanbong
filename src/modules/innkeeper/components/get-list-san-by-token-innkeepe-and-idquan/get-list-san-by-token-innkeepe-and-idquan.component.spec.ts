import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GetListSanByTokenInnkeepeAndIdquanComponent } from './get-list-san-by-token-innkeepe-and-idquan.component';

@Component({
    template: `
        <sb-get-list-san-by-token-innkeepe-and-idquan [someInput]="someInput" (someFunction)="someFunction($event)"></sb-get-list-san-by-token-innkeepe-and-idquan>
    `,
})
class TestHostComponent {
    // someInput = 1;
    // someFunction(event: Event) {}
}

describe('GetListSanByTokenInnkeepeAndIdquanComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: GetListSanByTokenInnkeepeAndIdquanComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, GetListSanByTokenInnkeepeAndIdquanComponent],
            imports: [NoopAnimationsModule],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('sb-get-list-san-by-token-innkeepe-and-idquan')).toEqual(jasmine.anything());
    });
});
