import React, { useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';

const VoiceRecorder = ({ setIsLoading, isLoading }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const startRecording = async () => {
        if (isLoading) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioFile = new File([audioBlob], "voice-message.webm", { type: 'audio/webm' });

                // Send the recorded file directly from here
                const formData = new FormData();
                formData.append('file', audioFile);
                setIsLoading(true); // Set loading state in parent
                try {
                    const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, formData, {
                        withCredentials: true
                    });
                    dispatch(setMessages([...messages, res.data]));
                } catch (error) {
                    console.error("Error sending voice message:", error);
                } finally {
                    setIsLoading(false); // Reset loading state in parent
                }
                // Stop media tracks to turn off microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Microphone access denied:", error);
            alert("Could not access microphone. Please check your browser permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    return (
        <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            onMouseLeave={stopRecording} // Stop if mouse slips off button
            className={`transition-colors duration-200 ${isRecording ? 'text-red-500' : 'text-gray-400'}`}
            disabled={isLoading}
        >
            <FaMicrophone size={'24px'} />
        </button>
    );
};

export default VoiceRecorder;