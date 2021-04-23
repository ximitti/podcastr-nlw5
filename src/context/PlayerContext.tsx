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
	isLooping: boolean;
	isShuffling: boolean;
	hasNext: boolean;
	hasPrevious: boolean;
	play: (episode: Episode) => void;
	playList: (list: Episode[], index: number) => void;
	setPlayingState: (state: boolean) => void;
	playNext: () => void;
	playPrevious: () => void;
	togglePlay: () => void;
	toggleLoop: () => void;
	toggleShuffle: () => void;
	clearPlayer: () => void;
};

type PlayerContextProviderProps = {
	children: React.ReactNode;
};

// -----------------------------------------
export const PlayerContext = React.createContext({} as PlayerContextData);
// -----------------------------------------
export function PlayerContextProvider({
	children,
}: PlayerContextProviderProps) {
	const [episodeList, setEpisodeList] = React.useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [isLooping, setIsLooping] = React.useState(false);
	const [isShuffling, setIsShuffling] = React.useState(false);

	function play(episode: Episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
		setIsPlaying(true);
	}

	const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

	function playNext() {
		if (isShuffling) {
			const nextRandom = Math.floor(Math.random() * episodeList.length);

			setCurrentEpisodeIndex(nextRandom);
		} else if (hasNext) {
			setCurrentEpisodeIndex(currentEpisodeIndex + 1);
		}
	}

	const hasPrevious = currentEpisodeIndex > 0;

	function playPrevious() {
		if (hasPrevious) {
			setCurrentEpisodeIndex(currentEpisodeIndex - 1);
		}
	}

	function playList(list: Episode[], index: number) {
		setEpisodeList(list);
		setCurrentEpisodeIndex(index);
		setIsPlaying(true);
	}

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	function toggleLoop() {
		setIsLooping(!isLooping);
	}

	function toggleShuffle() {
		setIsShuffling(!isShuffling);
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state);
	}

	function clearPlayer() {
		setEpisodeList([]);
		setCurrentEpisodeIndex(0);
	}

	return (
		<PlayerContext.Provider
			value={{
				episodeList,
				currentEpisodeIndex,
				isPlaying,
				isLooping,
				isShuffling,
				hasNext,
				hasPrevious,
				play,
				playList,
				playNext,
				playPrevious,
				togglePlay,
				toggleLoop,
				toggleShuffle,
				setPlayingState,
				clearPlayer,
			}}>
			{children}
		</PlayerContext.Provider>
	);
}

export const usePlayer = () => React.useContext(PlayerContext);
