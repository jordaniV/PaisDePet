import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdp-menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.scss']
})
export class MenuToggleComponent {
  @Input() menu: string;

  constructor() {}
}
