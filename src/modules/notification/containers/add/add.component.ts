import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-add',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './add.component.html',
    styleUrls: ['add.component.scss'],
})
export class AddComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
