import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    TextareaComponent
  ],
  declarations: [TextareaComponent],
})
export class SharedModule {}
