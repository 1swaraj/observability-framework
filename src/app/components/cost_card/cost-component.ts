import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cost',
  templateUrl: './cost-component.html',
})
export class CostComponent{
    @Input() cost = "";
    @Input() cloud = "";
}
