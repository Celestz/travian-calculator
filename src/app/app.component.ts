import { Component, } from '@angular/core'
import { Teutons } from './units/teutons'
import { Romans } from './units/romans'
import { Gauls } from './units/gauls'
import { Egyptians } from './units/egyptians'
import { Huns } from './units/huns'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Teuton Calculator'
  summary = {
    teutons: [],
    romans: [],
    gauls: [],
    egyptians: [],
    huns: [],
  }

  units = {
    teutons: Teutons,
    romans: Romans,
    gauls: Gauls,
    egyptians: Egyptians,
    huns: Huns,
  }

  tabs = [
    'romans',
    'teutons',
    'gauls',
    'egyptians',
    'huns'
  ]

  totalResources = 0
  cropStore = 0
  active

  currentTribe = 'romans'

  totalAllocation = 0

  totalHandler($event: Object) {
    this.summary[$event['tribe']][$event['index']] = $event['resources']
  }

  recomputeAllocation() {
    this.totalAllocation = this.totalResources - this.cropStore
  }

  totalWood() {
    return this.summary[this.currentTribe].reduce((acc, val) => acc + val['wood'], 0)
  }

  totalClay() {
    return this.summary[this.currentTribe].reduce((acc, val) => acc + val['clay'], 0)
  }

  totalIron() {
    return this.summary[this.currentTribe].reduce((acc, val) => acc + val['iron'], 0)
  }

  totalCrop() {
    return (this.summary[this.currentTribe].reduce((acc, val) => acc + val['crop'], 0) + this.cropStore)
  }

  totalSummary() {
    return (this.summary[this.currentTribe].reduce((acc, val) => acc + val['summary'], 0) + this.cropStore)
  }

  getTotalUnitCount() {
    return this.summary[this.currentTribe].reduce((acc, val) => acc + val['units'], 0)
  }
}
