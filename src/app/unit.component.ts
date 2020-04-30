import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Unit } from './unit'

@Component({
  selector: '[unitComponent]',
  template: `
    <th class="text-center">
      {{ unit.name }}
    </th>
    <th class="text-center">
      {{ getWood() }}
    </th>
    <th class="text-center">
      {{ getClay() }}
    </th>
    <th class="text-center">
      {{ getIron() }}
    </th>
    <th class="text-center">
      {{ getCrop() }}
    </th>
    <th class="text-center">
      {{ getSummary() }}
    </th>
    <th class="text-center">
      {{ totalUnits }}
    </th>
    <th class="text-center">
      <input type="number" min="0" max="100" [(ngModel)]="unitPercentage" (ngModelChange)="recomputeUnitTally()"/>
    </th>
    <th class="text-center">
      <input type="range" min="0" max="100" [(ngModel)]="unitPercentage" (ngModelChange)="recomputeUnitTally()"/>
    </th>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class UnitComponent implements OnChanges  {
  @Input() unitIndex: number
  @Input() unit: Unit
  @Input() allocation: number
  @Input() tribe: string

  @Output() totalChangedEvent = new EventEmitter<Object>()

  unitPercentage = 0
  totalUnits = 0

  ngOnChanges(changes: SimpleChanges) {
    this.recomputeUnitTally()
  }

  recomputeUnitTally() {
    this.totalUnits = Math.floor((this.allocation * (this.unitPercentage / 100)) / this.getTotal())

    this.totalChangedEvent.emit({
      index: this.unitIndex,
      tribe: this.tribe,
      resources: {
        wood: this.getWood(),
        clay: this.getClay(),
        iron: this.getIron(),
        crop: this.getCrop(),
        summary: this.getSummary(),
        units: this.totalUnits,
      }
    })
  }

  getWood() {
    return this.totalUnits * this.unit.wood
  }

  getClay() {
    return this.totalUnits * this.unit.clay
  }

  getIron() {
    return this.totalUnits * this.unit.iron
  }

  getCrop() {
    return this.totalUnits * this.unit.crop
  }

  getSummary() {
    return this.totalUnits * this.getTotal()
  }

  getTotal() {
    return this.unit.wood + this.unit.clay + this.unit.iron + this.unit.crop
  }
}