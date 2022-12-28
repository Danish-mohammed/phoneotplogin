import { Component, OnInit, NgZone } from '@angular/core';
// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import {Auth,PhoneAuthProvider,signInWithCredential,signInWithPhoneNumber } from '@angular/fire/auth';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {
  otp!: string;
  verify: any;
  constructor(private router: Router, private ngZone: NgZone,private auth:Auth) {}

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit() {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  // async resend() {
  //   try {
  //     const response = await this.auth.signInWithPhoneNumber('+91' + this.phone);
  //     console.log(response);       
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  handleClick() {
    console.log(this.otp);
    var credential = PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
   signInWithCredential(this.auth,credential)
      .then((response: any) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error: { message: any; }) => {
        console.log(error);
        alert(error.message);
      });
  }
}