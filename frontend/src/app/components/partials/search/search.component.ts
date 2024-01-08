import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm = '';

  constructor(activatedRotue: ActivatedRoute, private router: Router) {
    activatedRotue.queryParams.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  search(term: string) {
    if (term) this.router.navigateByUrl('/search/' + term);
    else this.router.navigateByUrl('/');
  }
}
