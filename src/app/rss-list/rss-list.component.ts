import { Component, OnInit } from "@angular/core";
import { xml2json } from "xml-js";
import { xml } from "@app/statics/anmanmv-all";
import { __values } from "tslib";

interface Xml2JsonData {
  _text: string;
}

interface RssItemInterface {
  comments: Xml2JsonData;
  description: Xml2JsonData;
  image: Xml2JsonData;
  link: Xml2JsonData;
  pubDate: Xml2JsonData;
  title: Xml2JsonData;
}

interface Item {
  comment: string;
  description: string;
  image: string;
  link: string;
  pubDate: string;
  title: string;
}

@Component({
  selector: "app-rss-list",
  templateUrl: "./rss-list.component.html",
  styleUrls: ["./rss-list.component.css"],
})
export class RssListComponent implements OnInit {
  items: Item[];

  constructor() {}

  ngOnInit(): void {
    // xmlデータをjson形式で取得
    const result = xml2json(xml, {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    });
    const json: { [key: string]: any } = JSON.parse(result);
    console.dir(json);

    this.items = json.rss.channel.item.map((v) => {
      return Object.fromEntries(
        Object.entries(v).map(([key, value]: [string, Xml2JsonData]) => [
          key,
          value._text,
        ])
      );
    });
    console.log(this.items);
  }
}
