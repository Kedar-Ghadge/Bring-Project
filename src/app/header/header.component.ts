import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() featuredSelect = new EventEmitter<string>();

  onSelect(featuredString: string)
  {
    this.featuredSelect.emit(featuredString);
  }
}
