import { Component, Input, OnInit } from "@angular/core";
import { xml2json } from "xml-js";
import { xml } from "@statics/sports";

interface RssOverallInteface {
  rss: {
    channel: {
      title: {
        _text: string;
      };
      item: RssItemInterface[];
    };
  };
}

interface RssItemInterface {
  comments: {
    _text: string;
  };
  description?: {
    _text: string;
  };
  image?: {
    _text: string;
  };
  link: {
    _text: string;
  };
  pubDate: {
    _text: string;
  };
  title: {
    _text: string;
  };
}

type Item = {
  comments: string;
  description?: string;
  image?: string;
  link: string;
  pubDate: string;
  title: string;
};

@Component({
  selector: "app-rss-list",
  templateUrl: "./rss-list.component.html",
  styleUrls: ["./rss-list.component.css"],
})
export class RssListComponent implements OnInit {
  // @Input() xml: string = "";
  // @Input() limit?: number;
  items: Item[];
  mediaName: string;

  constructor() {}

  ngOnInit(): void {
    // xmlデータをjson形式で取得
    const result = xml2json(xml, {
      compact: true,
      ignoreComment: true,
      spaces: 2,
    });
    const json: RssOverallInteface = JSON.parse(result);

    // メディア名取得
    this.mediaName = json.rss.channel.title._text;

    // コンテンツ取得
    this.items = json.rss.channel.item.map((v) => {
      return Object.fromEntries(
        Object.entries(v).map(([key, value]) => [key, value._text])
      ) as any;
    });
  }

  // titleを40文字にトリミング
  trimTitle(str: string | undefined): string {
    return str;
  }

  // dscriptionを200文字にトリミング
  trimDescription(str: string | undefined): string {
    return str;
  }
}
