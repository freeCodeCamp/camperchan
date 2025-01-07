/* eslint-disable @typescript-eslint/naming-convention -- Many of the Discourse properties use snake case. */
interface ForumData {
  users: Array<{
    id:              number;
    username:        string;
    name:            string;
    avatar_template: string;
  }>;
  primary_groups: Array<Record<string, unknown>>;
  topic_list: {
    can_create_topic: boolean;
    more_topics_url:  string;
    draft?:           unknown;
    draft_key:        string;
    draft_sequence:   number;
    per_page:         number;
    topics:           Array<ForumTopic>;
  };
}

interface ForumTopic {
  id:                   number;
  title:                string;
  fancy_title:          string;
  slug:                 string;
  posts_count:          number;
  reply_count:          number;
  highest_post_number:  number;
  image_url?:           string;
  created_at:           string;
  last_posted_at:       string;
  bumped:               boolean;
  bumped_at?:           string;
  archetype:            string;
  unseen:               boolean;
  pinned:               boolean;
  unpinned?:            unknown;
  visible:              boolean;
  closed:               boolean;
  archived:             boolean;
  bookmarked?:          unknown;
  liked?:               unknown;
  thumbnails?:          unknown;
  views:                number;
  like_count:           number;
  has_summary:          boolean;
  last_poster_username: string;
  category_id:          number;
  pinned_globally:      boolean;
  featured_link?:       string;
  has_accepted_answer:  boolean;
  vote_count?:          number;
  can_vote:             boolean;
  user_voted:           boolean;
  posters: Array<{
    extras?:           unknown;
    description:       string;
    user_id:           number;
    primary_group_id?: number;
  }>;
}

export type { ForumData, ForumTopic };
