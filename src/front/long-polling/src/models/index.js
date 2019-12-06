import {fetchFeed, fetchFeeds, deleteFeed,
	asyncFetchFeeds, postFeed, putFeed} from './FeedsApi';
import {asyncFetchComments, postComment, fetchComments} from './CommentApi';
import {asyncFetchEvents, filterEvent} from './Event';
import {fetchLikes, postLike, asyncFetchLikes} from './LikeApi.js';


export {fetchFeed, fetchFeeds, deleteFeed, putFeed, asyncFetchFeeds, postFeed,
	asyncFetchComments, postComment, fetchComments,
	asyncFetchEvents, filterEvent,
	fetchLikes, postLike, asyncFetchLikes};
