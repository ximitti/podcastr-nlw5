import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Slider from 'rc-slider';

import { usePlayer } from '../../context/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';
// ----------------------------------
export default function Player() {
	const audioRef = React.useRef<HTMLAudioElement>(null);

	const [progress, setProgress] = React.useState(0);

	const {
		episodeList,
		currentEpisodeIndex,
		isPlaying,
		isLooping,
		isShuffling,
		hasNext,
		hasPrevious,
		setPlayingState,
		togglePlay,
		toggleLoop,
		toggleShuffle,
		playNext,
		playPrevious,
		clearPlayer,
	} = usePlayer();

	React.useEffect(() => {
		if (!audioRef.current) return;

		isPlaying ? audioRef.current.play() : audioRef.current.pause();
	}, [isPlaying]);

	function setupProgressListener() {
		audioRef.current.currentTime = 0;

		audioRef.current.addEventListener('timeupdate', () => {
			setProgress(Math.floor(audioRef.current.currentTime));
		});
	}

	function handleSeek(amount: number) {
		audioRef.current.currentTime = amount;
	}

	function handleEnded() {
		hasNext ? playNext() : clearPlayer;
	}

	const episode = episodeList[currentEpisodeIndex];

	return (
		<div className={styles.playerContainer}>
			<Head>
				<title>Home | Podcastr</title>
			</Head>
			<header>
				<img src='/playing.svg' alt='Tocando agora' />
				<strong>Tocando agora</strong>
			</header>

			{episode ? (
				<div className={styles.currentEpisode}>
					<Image
						width={592}
						height={592}
						src={episode.thumbnail}
						objectFit='cover'
					/>
					<strong>{episode.title}</strong>
					<span>{episode.members}</span>
				</div>
			) : (
				<div className={styles.emptyPlayer}>
					<strong>Selecione um podcast para ouvir</strong>
				</div>
			)}

			<footer className={!episode ? styles.empty : ''}>
				<div className={styles.progress}>
					<span>{convertDurationToTimeString(progress)}</span>
					<div className={styles.slider}>
						{episode ? (
							<Slider
								max={episode?.duration}
								value={progress}
								onChange={handleSeek}
								trackStyle={{ backgroundColor: '#04d361' }}
								railStyle={{ backgroundColor: '#9f75ff' }}
								handleStyle={{
									borderColor: '#04d361',
									borderWidth: 4,
								}}
							/>
						) : (
							<div className={styles.emptySlider} />
						)}
					</div>
					<span>
						{convertDurationToTimeString(episode?.duration ?? 0)}
					</span>
				</div>

				{episode && (
					<audio
						ref={audioRef}
						src={episode.url}
						loop={isLooping}
						autoPlay
						onEnded={handleEnded}
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
						onLoadedMetadata={setupProgressListener}
					/>
				)}

				<div className={styles.buttons}>
					<button
						type='button'
						disabled={!episode || episodeList.length < 2}
						onClick={toggleShuffle}
						className={isShuffling ? styles.isActive : ''}>
						<img src='/shuffle.svg' alt='Embaralhar' />
					</button>
					<button
						type='button'
						disabled={!episode || !hasPrevious}
						onClick={playPrevious}>
						<img src='/play-previous.svg' alt='Tocar anterior' />
					</button>
					<button
						type='button'
						className={styles.playButton}
						disabled={!episode}
						onClick={togglePlay}>
						{isPlaying ? (
							<img src='/pause.svg' alt='Tocar' />
						) : (
							<img src='/play.svg' alt='Tocar' />
						)}
					</button>
					<button
						type='button'
						disabled={!episode || !hasNext}
						onClick={playNext}>
						<img src='/play-next.svg' alt='Tocar próxima' />
					</button>
					<button
						type='button'
						disabled={!episode}
						onClick={toggleLoop}
						className={isLooping ? styles.isActive : ''}>
						<img src='/repeat.svg' alt='Repetir' />
					</button>
				</div>
			</footer>
		</div>
	);
}
