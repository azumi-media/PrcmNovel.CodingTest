import { Component, VERSION } from '@angular/core';
import { xml as sportsXml } from "@statics/sports";
import { xml as itXml } from "@statics/it";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  sportsXml = sportsXml;
  itXml = itXml;
}
