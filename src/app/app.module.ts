import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { RssListComponent } from "./rss-list/rss-list.component";
import { RssListComponent as RssListAnswerComponent } from "./rss-list-answer/rss-list.component";
import { environment } from "src/environments/environment";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    environment.answer ? RssListAnswerComponent : RssListComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
