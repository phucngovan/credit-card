import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CardServiceService} from './card-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'credit-card';
  month: Array<string> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  year = [];
  cardName: any;
  cardNumber = '';
  copyValueInput = '';
  m = 'MM';
  cardNumberInitial = '####\xa0\xa0\xa0\xa0\xa0####\xa0\xa0\xa0\xa0\xa0####\xa0\xa0\xa0\xa0\xa0####';
  cardNumberInitial1;
  num1 ;
  num2 ;
  num3 ;
  num4 ;
  yCard: string | number | string[] = 'YY';
  y: string | number | string[];
  cvv: any;
  addForm: FormGroup;
  submitted = false;
  keyID;
  get f() {
    return this.addForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private cardService: CardServiceService) {
  }

  initializeCardNumber(value) {
    const arr = [];
    for (const i of value) {
      arr.push(i);
    }
    return arr;
  }

  pushYear() {
    for (let i = 1995; i < 2020; i++) {
      this.year.push(i);
    }
    console.log(typeof this.year[0], 'year');
  }

  transformCard() {
    $('.flip-card-inner').addClass('transform-cart-rotateY');
  }
  showBorderNumber() {
    $('.flip-card-inner').removeClass('transform-cart-rotateY');
    $('.card-number').addClass('showBorder');
    $('.card-number').removeClass('hideBorder');
    $('.card-holder').addClass('hideBorder');
    $('.expires').addClass('hideBorder');
  }

  showBorderName() {
    $('.flip-card-inner').removeClass('transform-cart-rotateY');
    $('.card-holder').addClass('showBorder');
    $('.card-holder').removeClass('hideBorder');
    $('.card-number').addClass('hideBorder');
    $('.expires').addClass('hideBorder');
  }

  showBorderExpires() {
    $('.flip-card-inner').removeClass('transform-cart-rotateY');
    $('.card-holder').addClass('hideBorder');
    $('.expires').removeClass('hideBorder');
    $('.card-number').addClass('hideBorder');
    $('.expires').addClass('showBorder');
  }

  replaceWordToEmpty(event) {
    event.target.value = event.target.value.replace(/[^\d]/, '');
  }
  getFormValues() {
    // this.addForm.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
    this.addForm.get('cardNumber').valueChanges.subscribe(val => {
      console.log(typeof val, 'type val');
      val = val.split('');
      this.num1 = val.splice(0, 4);
      this.num2 = val.splice(0, 4);
      if (this.num2.length >= 1) {
        this.num2.unshift('\xa0\xa0\xa0\xa0\xa0');
      }
      this.num3 = val.splice(0, 4);
      if (this.num3.length >= 1) {
        this.num3.unshift('\xa0\xa0\xa0\xa0\xa0');
      }
      this.num4 = val.splice(0, 4);
      if (this.num4.length >= 1) {
        this.num4.unshift('\xa0\xa0\xa0\xa0\xa0');
      }
      val = [...this.num1, ...this.num2, ...this.num3, ...this.num4].join('');
      this.copyValueInput = val;
      console.log(val, 'val after', val.length);
      this.cardNumberInitial1[val.length - 1] = val.substr(val.length - 1);
      console.log(this.copyValueInput.length, 'copyValueInput');
    });
  }
  KeyCheck(event) {
    this.keyID = event.keyCode;
    console.log(this.keyID, 'key');
    if (this.keyID === 8) {
      // tslint:disable-next-line:prefer-for-of
      console.log(this.copyValueInput.length, 'test');
      if (this.copyValueInput.length === 4 || this.copyValueInput.length === 13 || this.copyValueInput.length === 22) {
        this.cardNumberInitial1[this.copyValueInput.length + 5] = '#';
      } else { this.cardNumberInitial1[this.copyValueInput.length] = '#'; }
    }
  }

  ngOnInit(): void {
    this.cardNumberInitial1 = this.initializeCardNumber(this.cardNumberInitial);
    this.addForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      name: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    $('#exampleFormControlSelect2').click(() => {
      this.yCard = $('#exampleFormControlSelect2').val();
      console.log($('#exampleFormControlSelect2').val(), '=====>>>>');
      if (this.yCard != null) {
        this.yCard = $('#exampleFormControlSelect2').val().toString().slice(2);
      }
      return this.yCard;
    });
    this.pushYear();
    this.getFormValues();
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.cardService.addCard(this.addForm.value).subscribe(data => {
      this.cardNumberInitial1 = this.initializeCardNumber(this.cardNumberInitial);
      this.yCard = 'YY';
      this.m = 'MM';
      alert('tao thanh cong');
    });
  }
}
