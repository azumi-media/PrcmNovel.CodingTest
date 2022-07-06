import { Component, Input, OnInit } from "@angular/core";
import { xml2json } from "xml-js";

interface RssOverallInteface {
  rss: {
    channel: {
      title: Xml2JsonData;
      item: RssItemInterface[];
    };
  };
}

interface Xml2JsonData {
  _text: string;
}

interface RssItemInterface {
  comments: Xml2JsonData;
  description?: Xml2JsonData;
  image?: Xml2JsonData;
  link: Xml2JsonData;
  pubDate: Xml2JsonData;
  title: Xml2JsonData;
}

type Item = {
  [k in keyof RssItemInterface]: string;
};

@Component({
  selector: "app-rss-list",
  templateUrl: "./rss-list.component.html",
  styleUrls: ["./rss-list.component.css"],
})
export class RssListAnswerComponent implements OnInit {
  @Input() xml: string = "";
  @Input() limit?: number;
  items: Item[];
  mediaName: string;

  constructor() {}

  ngOnInit(): void {
    const json = this.parseJson();

    // メディア名取得
    this.mediaName = json.rss.channel.title._text;

    // コンテンツ取得
    const items = json.rss.channel.item.map((v) => {
      return Object.fromEntries(
        Object.entries(v).map(
          ([key, value]: [keyof RssItemInterface, Xml2JsonData]) => [
            key,
            value._text,
          ]
        )
      ) as Item;
    });

    this.items = !!this.limit ? items.slice(0, this.limit) : items;
  }

  parseJson(): RssOverallInteface {
    const result = xml2json(this.xml, {
      compact: true,
      ignoreComment: true,
      spaces: 2,
    });
    return JSON.parse(result);
  }

  // titleを40文字にトリミング
  trimTitle(str: string | undefined): string {
    return this.trim(str, 40);
  }

  // dscriptionを80文字にトリミング
  trimDescription(str: string | undefined): string {
    return this.trim(str, 80);
  }

  private trim(str: string, limit: number) {
    if (!str || str.length <= limit) {
      return str;
    }
    return str.slice(0, limit) + "…";
  }
}
