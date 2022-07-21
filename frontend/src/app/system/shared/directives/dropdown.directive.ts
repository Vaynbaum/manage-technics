import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDirectiveDropDown]'
})
export class DropdownDirective {
    @HostBinding('class.close') isClose = true;
    @HostListener('click') onClick() {
        this.isClose = !this.isClose;
    }

}
