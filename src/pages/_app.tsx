import '../styles/global.scss';
import React from 'react';

import Header from '../components/Header';
import Player from '../components/Player';
import { PlayerContext } from '../context/PlayerContext';

import styles from '../styles/app.module.scss';
// ---------------------------------------
function MyApp({ Component, pageProps }) {
	const [episodeList, setEpisodeList] = React.useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
	const [isPlaying, setIsPlaying] = React.useState(false);

	function play(episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
		setIsPlaying(true);
	}

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state);
	}

	return (
		<PlayerContext.Provider
			value={{
				episodeList,
				currentEpisodeIndex,
				play,
				isPlaying,
				togglePlay,
				setPlayingState,
			}}>
			<div className={styles.wrapper}>
				<main>
					<Header />
					<Component {...pageProps} />;
				</main>
				<Player />
			</div>
		</PlayerContext.Provider>
	);
}

export default MyApp;
