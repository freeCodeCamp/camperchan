/* eslint-disable max-lines -- refactor later */
import { ChannelType, EmbedBuilder } from "discord.js";
import { ObjectId, UUID } from "mongodb";
// eslint-disable-next-line @typescript-eslint/naming-convention -- Importing a class.
import Parser from "rss-parser";
import { youtubeIds } from "../config/youtubeIds.js";
import { customSubstring } from "../utils/customSubstring.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { ForumData } from "../interfaces/forum.js";
import type {
  BlueskyRss,
  NewsRss,
  RedditRss,
  TwitchJson,
  YoutubeRss,
} from "../interfaces/rss.js";
import type { Prisma } from "@prisma/client";

const fetchBsky = async(
  bot: ExtendedClient,
  latest?: string,
): Promise<{ latestId: string | null; embeds: Array<EmbedBuilder> }> => {
  try {
    const parser = new Parser<BlueskyRss, BlueskyRss["items"]>();
    const { items } = await parser.parseURL(
      "https://bsky.app/profile/did:plc:wvd2adsms7gniik5ggqowjah/rss",
    );
    const latestIndex = items.findIndex((item) => {
      return item.guid === latest;
    });
    const latestPosts
      = latest !== undefined && latestIndex === -1
        ? items.slice(0, 5)
        : items.slice(0, Math.min(latestIndex, 5));
    const embeds = latestPosts.map((post) => {
      return new EmbedBuilder().
        setTitle("freeCodeCamp posted on Bluesky!").
        setDescription(customSubstring(post.content, 4096)).
        setURL(post.link);
    });
    const latestId = items[0]?.guid ?? null;
    return { embeds, latestId };
  } catch (error) {
    await errorHandler(bot, "fetch bsky rss", error);
    return { embeds: [], latestId: null };
  }
};

const fetchReddit = async(
  bot: ExtendedClient,
  latest?: string,
): Promise<{ latestId: string | null; embeds: Array<EmbedBuilder> }> => {
  try {
    const parser = new Parser<RedditRss, RedditRss["items"]>();
    const { items } = await parser.parseURL(
      "https://reddit.com/r/freeCodeCamp.rss",
    );
    const latestIndex = items.findIndex((item) => {
      return item.id === latest;
    });
    const latestPosts
      = latest !== undefined && latestIndex === -1
        ? items.slice(0, 5)
        : items.slice(0, Math.min(latestIndex, 5));
    const embeds = latestPosts.map((post) => {
      return new EmbedBuilder().
        setTitle("New Reddit post!").
        setDescription(customSubstring(post.title, 4096)).
        setURL(post.link);
    });
    const latestId = items[0]?.id ?? null;
    return { embeds, latestId };
  } catch (error) {
    await errorHandler(bot, "fetch reddit rss", error);
    return { embeds: [], latestId: null };
  }
};

const fetchNews = async(
  bot: ExtendedClient,
  latest?: string,
): Promise<{ latestId: string | null; embeds: Array<EmbedBuilder> }> => {
  try {
    const parser = new Parser<NewsRss, NewsRss["items"]>();
    const { items } = await parser.parseURL(
      "https://www.freecodecamp.org/news/rss",
    );
    const latestIndex = items.findIndex((item) => {
      return item.guid === latest;
    });
    const latestPosts
      = latest !== undefined && latestIndex === -1
        ? items.slice(0, 5)
        : items.slice(0, Math.min(latestIndex, 5));
    const embeds = latestPosts.map((post) => {
      return new EmbedBuilder().
        setTitle("New article!").
        setDescription(customSubstring(post.contentSnippet, 4096)).
        setURL(post.link);
    });
    const latestId = items[0]?.guid ?? null;
    return { embeds, latestId };
  } catch (error) {
    await errorHandler(bot, "fetch news rss", error);
    return { embeds: [], latestId: null };
  }
};

const fetchYoutube = async(
  bot: ExtendedClient,
  url: string,
  latest?: string,
): Promise<{ latestId: string | null; embeds: Array<EmbedBuilder> }> => {
  try {
    const parser = new Parser<YoutubeRss, YoutubeRss["items"]>();
    const { items } = await parser.parseURL(url);
    const latestIndex = items.findIndex((item) => {
      return item.id === latest;
    });
    const latestPosts
      = latest !== undefined && latestIndex === -1
        ? items.slice(0, 5)
        : items.slice(0, Math.min(latestIndex, 5));
    const embeds = latestPosts.map((post) => {
      return new EmbedBuilder().
        setTitle("New video!").
        setDescription(customSubstring(post.title, 4096)).
        setURL(post.link);
    });
    const latestId = items[0]?.id ?? null;
    return { embeds, latestId };
  } catch (error) {
    await errorHandler(bot, "fetch youtube rss", error);
    return { embeds: [], latestId: null };
  }
};

const fetchForum = async(
  bot: ExtendedClient,
  latest?: string,
): Promise<{ latestId: string | null; embeds: Array<EmbedBuilder> }> => {
  try {
    const request = await fetch("https://forum.freecodecamp.org/latest.json");
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Necessary as .json() does not accept a generic.
    const result = (await request.json()) as ForumData;

    const latestIndex = result.topic_list.topics.findIndex((topic) => {
      return topic.id.toString() === latest;
    });
    const latestPosts
      = latest !== undefined && latestIndex === -1
        ? result.topic_list.topics.slice(0, 5)
        : result.topic_list.topics.slice(0, Math.min(latestIndex, 5));

    const embeds = latestPosts.map((post) => {
      return new EmbedBuilder().
        setTitle("New forum post!").
        setDescription(customSubstring(post.title, 4096)).
        setURL(
          `https://forum.freecodecamp.org/t/${post.slug}/${post.id.toString()}`,
        );
    });
    const latestId = result.topic_list.topics[0]?.id.toString() ?? null;
    return { embeds, latestId };
  } catch (error) {
    await errorHandler(bot, "fetch forum data", error);
    return { embeds: [], latestId: null };
  }
};

const fetchTwitch = async(
  bot: ExtendedClient,
): Promise<Array<EmbedBuilder>> => {
  try {
    if (
      process.env.TWITCH_CLIENT_ID === undefined
      || process.env.TWITCH_CLIENT_SECRET === undefined
    ) {
      throw new Error("Twitch client ID or secret not set");
    }
    const channelIds: Array<string> = [ "freecodecamp", "freecodecampes" ];
    const tokenRequest = await fetch("https://id.twitch.tv/oauth2/token", {
      body: new URLSearchParams({
        // eslint-disable-next-line @typescript-eslint/naming-convention -- These are Twitch's property names.
        client_id:     process.env.TWITCH_CLIENT_ID,
        // eslint-disable-next-line @typescript-eslint/naming-convention -- These are Twitch's property names.
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        // eslint-disable-next-line @typescript-eslint/naming-convention -- These are Twitch's property names.
        grant_type:    "client_credentials",
      }),
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention -- This is a standard header.
        "Content-Type": "application/x-www-form-urlencoded",
        "accept":       "application/json",
      },
      method: "POST",
    });
    const { access_token: token }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Necessary as .json() does not accept a generic.
      = (await tokenRequest.json()) as {
        // eslint-disable-next-line @typescript-eslint/naming-convention -- These are Twitch's property names.
        access_token?: string;
        // eslint-disable-next-line @typescript-eslint/naming-convention -- These are Twitch's property names.
        token_type?:   string;
        // eslint-disable-next-line @typescript-eslint/naming-convention -- These are Twitch's property names.
        expires_in?:   number;
      };
    if (token === undefined) {
      throw new Error("Twitch token not received");
    }
    const embeds = await Promise.all(
      channelIds.map(async(channelId) => {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("Client-ID", process.env.TWITCH_CLIENT_ID ?? "");
        const request = await fetch(
          `https://api.twitch.tv/helix/streams?user_id=${channelId}`,
          {
            headers: headers,
            method:  "GET",
          },
        );
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Necessary as .json() does not accept a generic.
        const response = (await request.json()) as TwitchJson;
        if (response.data.length === 0) {
          return null;
        }
        const [ current ] = response.data;
        if (!current) {
          return null;
        }
        if (current.id === bot.twitchCache[channelId]) {
          return null;
        }
        bot.twitchCache[channelId] = current.id;
        return new EmbedBuilder().
          setTitle(`${channelId} is live!`).
          setDescription(customSubstring(current.title, 4096)).
          setURL(`https://twitch.tv/${current.user_name}`);
      }),
    );
    return embeds.filter((embed): embed is EmbedBuilder => {
      return embed !== null;
    });
  } catch (error) {
    await errorHandler(bot, "fetch twitch data", error);
    return [];
  }
};

/**
 * Aggregates data from our various socials and RSS feeds, constructs them
 * as Discord embeds, and posts the latest content to the socials channel.
 * @param bot - The bot's Discord instance.
 */
export const fetchRss = async(bot: ExtendedClient): Promise<void> => {
  try {
    const channel = await bot.homeGuild.channels.fetch("1267979916964794530");
    if (channel === null || channel.type !== ChannelType.GuildText) {
      throw new Error("Socials channel not found or not text based");
    }
    const latestPosts = await bot.db.rss.findFirst();
    const { embeds: bskyEmbeds, latestId: bskyLatestId } = await fetchBsky(
      bot,
      latestPosts?.blueskyId,
    );
    const { embeds: redditEmbeds, latestId: redditLatestId }
      = await fetchReddit(bot, latestPosts?.redditId);
    const { embeds: newsEmbeds, latestId: newsLatestId } = await fetchNews(
      bot,
      latestPosts?.hashnodeId,
    );
    const { embeds: enYoutubeEmbeds, latestId: enYoutubeLatestId }
      = await fetchYoutube(
        bot,
        `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeIds.english}`,
        latestPosts?.youtubeId,
      );
    const { embeds: esYoutubeEmbeds, latestId: esYoutubeLatestId }
      = await fetchYoutube(
        bot,
        `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeIds.espanol}`,
        latestPosts?.youtubeId,
      );
    const { embeds: ptYoutubeEmbeds, latestId: ptYoutubeLatestId }
      = await fetchYoutube(
        bot,
        `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeIds.portugues}`,
        latestPosts?.youtubeId,
      );
    const { embeds: forumEmbeds, latestId: forumLatestId } = await fetchForum(
      bot,
      latestPosts?.forumId,
    );
    const twitchEmbeds = await fetchTwitch(bot);

    const query: Prisma.rssUpsertArgs["update"] = {};

    if (bskyLatestId !== null) {
      query.blueskyId = bskyLatestId;
    }
    if (newsLatestId !== null) {
      query.hashnodeId = newsLatestId;
    }
    if (redditLatestId !== null) {
      query.redditId = redditLatestId;
    }
    if (enYoutubeLatestId !== null) {
      query.youtubeId = enYoutubeLatestId;
    }
    if (esYoutubeLatestId !== null) {
      query.esYoutubeId = esYoutubeLatestId;
    }
    if (ptYoutubeLatestId !== null) {
      query.ptYoutubeId = ptYoutubeLatestId;
    }
    if (forumLatestId !== null) {
      query.forumId = forumLatestId;
    }

    await bot.db.rss.upsert({
      create: {
        blueskyId:   bskyLatestId ?? "",
        esYoutubeId: esYoutubeLatestId ?? "",
        forumId:     forumLatestId ?? "",
        hashnodeId:  newsLatestId ?? "",
        ptYoutubeId: ptYoutubeLatestId ?? "",
        redditId:    redditLatestId ?? "",
        youtubeId:   enYoutubeLatestId ?? "",
      },
      update: query,
      where:  {
        id: latestPosts?.id ?? new ObjectId().toString(),
      },
    });

    const allEmbeds = [
      ...bskyEmbeds,
      ...redditEmbeds,
      ...newsEmbeds,
      ...enYoutubeEmbeds,
      ...esYoutubeEmbeds,
      ...ptYoutubeEmbeds,
      ...forumEmbeds,
      ...twitchEmbeds,
    ];
    await Promise.allSettled(
      allEmbeds.map(async(embed) => {
        await channel.send({ embeds: [ embed ] }).catch((error: unknown) => {
          return void errorHandler(bot, "send rss embed", error);
        });
      }),
    );
  } catch (error) {
    await errorHandler(bot, "fetch rss module", error);
  }
};
