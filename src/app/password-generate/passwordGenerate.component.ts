import { Component } from '@angular/core';

import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './password-generate.component.html',
  styleUrls: ['./password-generate.component.css']
})
export class PasswordGenerateComponent {

  @Input()
  password: string;

  @Output()
  newPassword: EventEmitter<string> = new EventEmitter<string>();

  value = 0;
  progressDivShow: boolean;
  progressValue: number;
  progressWidth: any;
  consonant: any;
  vowel: any;
  timer: any;

  generatePassword() {
    this.progressDivShow = true;
    this.progressValue = 0;
    this.progressWidth = this.progressValue;
    this.generatePasswordProgress();

    if(this.password) {
      this.newPassword.emit(this.password);
    } else {
      setTimeout(() => {
        this.newPassword.emit(this.password);
      },21);
    }
  }

  generatePasswordProgress() {
    this.timer = setTimeout(() => {
      if(this.progressValue < 100) {
        this.password = this.generatePasswordValue(10, false);
        this.progressValue += 2;
        this.progressWidth = this.progressValue;
        this.generatePasswordProgress();
      } else {
        this.progressDivShow = false;
      }
    }, 20)
  }

  generatePasswordValue(length, memorable, pattern?, prefix?) {
    let char, n;
    if(length === undefined || length === null) {
      length = 10;
    }
    if(memorable === undefined || memorable === null) {
      memorable = true;
    }
    if(pattern === undefined || pattern === null) {
      pattern = /[a-zA-Z0-9]/;
    }
    if(prefix === undefined || prefix === null) {
      prefix = '';
    }
    if(prefix.length >=length) {
      return prefix;
    }
    if(memorable) {
      if(prefix.match(this.consonant)) {
        pattern = this.vowel;
      } else {
        pattern = this.consonant;
      }
    }

    n = (Math.floor(Math.random() * 100) % 94) + 33;
    char = String.fromCharCode(n);
    if(memorable) {
      char = char.toLowerCase();
    }
    if(!char.match(pattern)) {
        return this.generatePasswordValue(length, memorable, pattern, prefix);
    }
    return this.generatePasswordValue(length, memorable, pattern, '' + prefix + char);
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/