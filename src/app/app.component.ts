import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {split} from 'ts-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'credit-card';
  month: Array<string> = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  year = [];
  cardName: number | string | Array<number>;
  cardNumber: any;
  m = 'MM';
  num1;
  num2;
  num3;
  num4;
  yCard: string | number | string[] = 'YY';
  y: string | number | string[];
  cvv: any;

  pushYear() {
    for (let i = 1995; i < 2020; i++) {
      this.year.push(i);
    }
  }
  transformCard() {
    $('.flip-card-inner').addClass('transform-cart-rotateY');
  }
  convertYear() {
    this.y = $('#exampleFormControlSelect2').val();
    console.log(this.y.toString().slice(2), '23232323');
    this.y = this.y.toString().slice(2);
    return this.y;
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

  ngOnInit(): void {
    console.log(this.cardNumber, 'init');
    this.y = $('#exampleFormControlSelect2').val();
    console.log(this.y, '23232323');
    // this.y = (document.getElementById('exampleFormControlSelect2') as HTMLInputElement).value;
    // tslint:disable-next-line:no-unused-expression
    // @ts-ignore
    $('#number').change(() => {
      // this.cardNumber = this.cardNumber.split(' ');
      // while (this.cardNumber.length) {
      //   this.cardNumber = this.cardNumber.splice()
      // }
      this.cardNumber = $('#number').val().toString().split('');
      this.num1 = this.cardNumber.splice(0, 4).join('');
      this.num2 = this.cardNumber.splice(0, 4).join('');
      this.num3 = this.cardNumber.splice(0, 4).join('');
      this.num4 = this.cardNumber.splice(0, 4).join('');
      this.cardNumber.push(this.num1);
      this.cardNumber.push(this.num2);
      this.cardNumber.push(this.num3);
      this.cardNumber.push(this.num4);
      // console.log(this.num1, this.num2, this.num3, '999999');
      console.log(this.cardNumber.join('$nbsp'), '0======0');
      this.cardNumber = this.cardNumber.join('------')
      return this.cardNumber;
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
  }
}
