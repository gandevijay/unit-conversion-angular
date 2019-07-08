import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conv-unit',
  templateUrl: './conv-unit.component.html',
  styleUrls: ['./conv-unit.component.scss']
})
export class ConvUnitComponent implements OnInit, OnDestroy {

  unitTypes = [
    { value: 'temperature', viewValue: 'Temperature' },
    { value: 'volume', viewValue: 'Volume' }
  ]

  temperatureMap = {
    'Degrees Celsius (\'C)': { factor: 1, increment: 0 },
    'Degrees Fahrenheit (\'F)': { factor: 0.555555555555, increment: -32 },
    'Degrees Kelvin (\'K)': { factor: 1, increment: -273.15 },
    'Degrees Rankine (\'R)': { factor: 0.555555555555, increment: -491.67 }
  }

  temperatureUnits = Object.keys(this.temperatureMap)
  

  volumeMap = {
    'Cup': { factor: 0.0002365882 },
    'Liter (new)': { factor: 0.001 },
    'Liter (old)': { factor: 0.001000028 },
    'Tablespoon': { factor: 0.00001478676 },
    'Cubic inch (in^3)': { factor: 0.00001638706 },
    'Cubic foot': { factor: 0.02831685 },
    'Gallon (US,liq)': { factor: 0.003785412 }
  }

  volumnUnits = Object.keys(this.volumeMap)

  unitMap = {
    temperature: this.temperatureMap,
    volume: this.volumeMap
  }

  unitForm: FormGroup;

  unitFormValueChangesSub: Subscription
  unitTypeCtrlValueChangesSub: Subscription

  unitTypeCtrl: FormControl
  targetValueCtrl: FormControl
  expectedTargetValueCtrl: FormControl

  outputMessage = '';

  get units() {
    const unitType = this.unitTypeCtrl.value
    return unitType 
      ? (unitType === 'temperature' ? this.temperatureUnits : this.volumnUnits)
      : []
  }

  constructor() { }

  ngOnInit() {
    this.buildForm()
  }

  ngOnDestroy() {
    this.unitTypeCtrlValueChangesSub.unsubscribe();
    this.unitFormValueChangesSub.unsubscribe();
  }

  buildForm() {
    this.unitForm = new FormGroup({
      inputValue: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      inputUnit: new FormControl('', [Validators.required]),
      targetUnit: new FormControl('', [Validators.required]),
      targetValue: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)])
    })
    
    this.unitTypeCtrl = new FormControl('temperature', [Validators.required])
    this.targetValueCtrl = new FormControl('', [Validators.required])
    this.expectedTargetValueCtrl = new FormControl({value: '', disabled: true}, [Validators.required])
    
    this.unitTypeCtrlValueChangesSub = this.unitTypeCtrl.valueChanges.subscribe(value => {
      this.unitForm.reset();
    })
    
    this.unitFormValueChangesSub = this.unitForm.valueChanges.subscribe((value) => {
      let result = null;
      if (this.unitForm.valid) {
        result = this.calculateUnit();
      }
      
      this.expectedTargetValueCtrl.setValue(result);
      this.expectedTargetValueCtrl.updateValueAndValidity();

      this.outputMessage = this.unitForm.invalid 
        ? 'invalid'
        : (Math.floor(value.targetValue) === Math.floor(result))
          ? 'correct'
          : 'incorrect'
    })
  }

  calculateUnit() {
    const unitType = this.unitTypeCtrl.value;
    const { inputValue, inputUnit, targetUnit } = this.unitForm.value;
    const { increment, factor } = this.unitMap[unitType][inputUnit];
    const { increment: targetIncrement, factor: targetFactor } = this.unitMap[unitType][targetUnit];
    let result = inputValue;
    if (unitType === 'temperature') {
      result = parseFloat(result) + increment;
    }
    result = result * factor;
    result = result / targetFactor;
    if (unitType === 'temperature') {
      result = parseFloat(result) - targetIncrement;
    }

    return result;
  }

  onUnitTypeSelectionChange(value: any) {
    console.log('value...', value);
    this.unitForm.reset();
    this.expectedTargetValueCtrl.reset();
  }

}
