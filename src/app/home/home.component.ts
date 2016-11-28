import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  providers: [],
  styleUrls: ['./home.component.styl'],
  templateUrl: './home.component.pug'
})
export class HomeComponent {
  constructor(private router: Router) { }

  ngOnInit() {}

  onClick(id: number) {
    this.router.navigate(['/group', id]);
  }
}
