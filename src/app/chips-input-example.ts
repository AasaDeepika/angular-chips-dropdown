import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface Fruit {
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input-example',
  templateUrl: 'chips-input-example.html',
  styleUrls: ['chips-input-example.css'],
})
export class ChipsInputExample implements OnInit, OnChanges {
  addOnBlur = true;
  Apply: boolean = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
  textField: any;
  simulate: any;
  keyPressCount = 0;

  ngOnInit(): void {
    this.simulate = document.getElementById('simulate');
    this.textField = document.getElementById('textfield');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.textField.addEventListener('keydown', (event: { key: any }) => {
      this.keyPressCount++;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  drop(event: CdkDragDrop<Fruit[]>) {
    moveItemInArray(this.fruits, event.previousIndex, event.currentIndex);
  }

  simulateKeyPress(key: any) {
    console.log('key down');
    const event = new KeyboardEvent('keydown', { keyCode: 73 });
    console.log(event);
    this.textField.dispatchEvent(event);
  }
  createEnter() {
    console.log('apply');
    this.simulateKeyPress('a');
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
