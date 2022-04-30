import axios from 'axios';
import type { TweetDTO } from '../../dtos/fragments/tweet-dto';
import type { Tweet } from '../../models/fragments/tweet';

const dtoToModel = (dto: TweetDTO): Tweet => {
	return {
		_type: dto._type,
		placeholderHeight: dto.placeholderHeight,
		tweetId: dto.tweetId
	};
};

export const tweetMapper = {
	dtoToModel
};
