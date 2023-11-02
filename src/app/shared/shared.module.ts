import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolder } from "./placeHolder/placeHolder";
import { DropdownDirectiveDirective } from "./dropdown.directive.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolder,
    DropdownDirectiveDirective],
    imports:[CommonModule],
    exports:[
        AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolder,
    DropdownDirectiveDirective,
    CommonModule
    ]
})
export class SharedModule{}