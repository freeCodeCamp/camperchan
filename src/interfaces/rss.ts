/* eslint-disable @typescript-eslint/naming-convention -- There are a lot of properties that we don't get to rename. */
interface BlueskyRss {
  items: Array<{
    link:           string;
    pubDate:        string;
    content:        string;
    contentSnippet: string;
    guid:           string;
    isoDate:        Date;
  }>;
  title:       string;
  description: string;
  link:        string;
}

interface RedditRss {
  items: Array<{
    title:   string;
    link:    string;
    pubDate: Date;
    author:  string;
    content: string;
    id:      string;
    isoDate: Date;
  }>;
  link:          string;
  feedUrl:       string;
  title:         string;
  lastBuildDate: Date;
}

interface NewsRss {
  items: Array<{
    "creator":         string;
    "title":           string;
    "link":            string;
    "pubDate":         string;
    "content:encoded": string;
    "dc:creator":      string;
    "content":         string;
    "contentSnippet":  string;
    "guid":            string;
    "categories":      Array<string>;
    "isoDate":         Date;
  }>;
  feedUrl: string;
  image: {
    link:  string;
    url:   string;
    title: string;
  };
  paginationLinks: {
    self: string;
  };
  title:         string;
  description:   string;
  generator:     string;
  link:          string;
  lastBuildDate: string;
  ttl:           string;
}

interface YoutubeRss {
  items: Array<{
    title:   string;
    link:    string;
    pubDate: Date;
    author:  string;
    id:      string;
    isoDate: Date;
  }>;
  link:    string;
  feedUrl: string;
  title:   string;
}

interface TwitchJson {
  data:       Array<{
    id:            string;
    user_id:       string;
    user_login:    string;
    user_name:     string;
    game_id:       string;
    game_name:     string;
    type:          string;
    title:         string;
    viewer_count:  number;
    started_at:    Date;
    language:      string;
    thumbnail_url: string;
    tag_ids:       Array<unknown>;
    tags:          Array<string>;
    is_mature:     boolean;
  }>;
  pagination: {
    cursor: string;
  };
}

export type { BlueskyRss, RedditRss, NewsRss, YoutubeRss, TwitchJson };
