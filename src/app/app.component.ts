import { Component, VERSION } from '@angular/core';
import { xml as sportsXml } from "@statics/sports";
import { xml as itXml } from "@statics/it";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: environment.answer ? './app.component.answer.html' : './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  sportsXml = sportsXml;
  itXml = itXml;
}
