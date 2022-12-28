import { Component, OnInit, NgZone } from '@angular/core';
import {initializeApp} from 'firebase/app';
// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Auth, signInWithPhoneNumber, RecaptchaVerifier } from '@angular/fire/auth';
import { Router } from '@angular/router'; 

var config = {
    apiKey: "AIzaSyDSl-E89SHgts-oe7ezw_k9PCqr9ORY3cE",
    authDomain: "otp-auth-87a58.firebaseapp.com",
    projectId: "otp-auth-87a58",
    storageBucket: "otp-auth-87a58.appspot.com",
    messagingSenderId: "440214657557",
    appId: "1:440214657557:web:3d588b541d44e75cd54c1c"
}
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent implements OnInit {
  phoneNumber: any;
  reCaptchaVerifier!: any;

  constructor(private router: Router, private ngZone: NgZone, private auth: Auth) { }

  ngOnInit() {
    initializeApp(config)
  }

  getOTP() {
    this.reCaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      },
      this.auth
    );
    console.log(this.reCaptchaVerifier);

    console.log(this.phoneNumber);
    
   signInWithPhoneNumber(this.auth,this.phoneNumber, this.reCaptchaVerifier)
      .then((confirmationResult: { verificationId: any; }) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/code']);
        });
      })
      .catch((error: { message: any; }) => {
        console.log(error.message);
        alert(error.message);       
      });
  }

}
