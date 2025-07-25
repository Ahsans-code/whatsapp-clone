import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const AudioPlayer = ({ audioUrl, author, isSender }) => {
    // Refs for DOM elements
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    // Player state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Effect to set up audio event listeners
    useEffect(() => {
        const audio = audioRef.current;

        const setAudioData = () => {
            if (audio.duration !== Infinity) {
                setDuration(audio.duration);
            }
        };
        const setAudioTime = () => setCurrentTime(audio.currentTime);
        const handleAudioEnd = () => setIsPlaying(false);

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', handleAudioEnd);

        // Cleanup
        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Helper to format time (0:00)
    const formatTime = (time) => {
        if (isNaN(time) || time === 0) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    // Handle seeking by clicking on the progress bar
    const handleProgressClick = (e) => {
        const progressBar = progressBarRef.current;
        if (!progressBar || duration === 0) return;

        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;

        audioRef.current.currentTime = newTime;
    };

    // Calculate progress for the UI
    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    // Define colors based on sender/receiver to match WhatsApp UI
    const bubbleColor = isSender ? 'bg-green-100' : 'bg-white'; // Example colors
    const progressColor = isSender ? 'bg-teal-500' : 'bg-gray-500';
    const textColor = isSender ? 'text-gray-600' : 'text-gray-500';

    return (
        // The main container that looks like a chat bubble
        <div className={`flex items-center gap-3 p-2 rounded-lg w-full max-w-sm ${bubbleColor}`}>
            <audio ref={audioRef} src={audioUrl} preload="metadata" />

            {/* Play/Pause Button */}
            <button
                onClick={togglePlayPause}
                className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center focus:outline-none shadow"
            >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
            </button>

            {/* Progress bar and Author Avatar */}
            <div className="flex-grow flex items-center gap-2">
                <img src={author?.profilePhoto} className="w-10 h-10 rounded-full flex-shrink-0" alt="avatar" />
                <div className="w-full">
                    <div
                        ref={progressBarRef}
                        onClick={handleProgressClick}
                        className="relative w-full h-1 bg-gray-300 rounded-full cursor-pointer"
                    >
                        {/* Filled Progress */}
                        <div
                            className={`absolute top-0 left-0 h-full rounded-full ${progressColor}`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                        {/* Scrubber Knob */}
                        <div
                            className={`absolute top-1/2 -mt-1 w-2.5 h-2.5 rounded-full ${progressColor} shadow`}
                            style={{ left: `calc(${progressPercentage}% - 5px)` }}
                        />
                    </div>
                    {/* Time Display */}
                    <div className={`text-xs mt-1 text-right ${textColor}`}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;