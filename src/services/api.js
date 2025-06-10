const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5001'
    : 'https://mon-app-backend.onrender.com'; // Mettez votre URL de production correcte

const defaultOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    mode: 'cors'
};

export const fetchChats = async () => {
    try {
        const response = await fetch(`${API_URL}/chats`, {
            ...defaultOptions,
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching chats:', error);
        return [];
    }
};

export const sendMessage = async (message) => {
    try {
        const response = await fetch(`${API_URL}/chats`, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify(message)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        // Mettre à jour le state local immédiatement
        updateLocalChat(result);
        
        return result;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const addMessage = async (userId, message) => {
    try {
        const response = await fetch(`${API_URL}/chats/${userId}`, {
            ...defaultOptions,
            method: 'PUT',
            body: JSON.stringify({ 
                messages: message,
                lastMessage: message.text,
                time: message.time,
                lastMessageTime: message.timestamp
            })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};

export const handleAudio = async (audioBlob) => {
    try {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.mp3');

        const response = await fetch(`${API_URL}/audio`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error handling audio:', error);
        throw error;
    }
};

export const fetchChatMessages = async (chatId) => {
    try {
        const response = await fetch(`${API_URL}/chats/${chatId}`, {
            ...defaultOptions,
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return { messages: [] };
    }
};