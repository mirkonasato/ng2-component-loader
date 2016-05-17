import { Component, provide } from '@angular/core';
import { MyService } from './my.service';

@Component({
  selector:'my-component',
  providers: [
    provide(MyService, {useClass: MyService})
  ],
  templateUrl:'./my.component.html',
  styleUrls:['./my.component.css']
})
@SomeOtherDecorator({
  property: 'value'
})
export class MyComponent {

  constructor(private myService: MyService) { }

}
