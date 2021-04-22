import React from 'react';

// ---------------------------------------------
type Episode = {
	title: string;
	members: string;
	thumbnail: string;
	duration: number;
	url: string;
};

type PlayerContextData = {
	episodeList: Episode[];
	currentEpisodeIndex: number;
	isPlaying: boolean;
	play: (episode: Episode) => void;
	setPlayingState: (state: boolean) => void;
	togglePlay: () => void;
};
export const PlayerContext = React.createContext({} as PlayerContextData);
// -----------------------------------------
// export const PlayerProvider = ({ children }) => {
// 	return <PlayerContext.Provider value={}>{children}</PlayerContext.Provider>;
// };

// export const usePlayer = () => React.useContext(PlayerContext);
