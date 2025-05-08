import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor() {}

  ngOnInit(): void {}

  submitForm(): void {
    console.log('Submitted Contact Form:', this.contactForm);
    alert('Message sent successfully!');
    // Reset form
    this.contactForm = { name: '', email: '', message: '' };
  }
}
