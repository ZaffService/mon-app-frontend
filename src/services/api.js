const API_URL = 'https://mon-app-backend.onrender.com/api';

const defaultOptions = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    mode: 'cors'
};

// Fonction pour créer un nouveau chat
export const createChat = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/chats`, {
            ...defaultOptions,
            method: 'POST',
            body: JSON.stringify({
                id: userId,
                messages: [],
                createdAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Erreur création chat');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};

// Fonction modifiée pour récupérer les messages
export const fetchChatMessages = async (chatId) => {
    try {
        const response = await fetch(`${API_URL}/chats/${chatId}`, {
            ...defaultOptions,
            method: 'GET'
        });

        if (response.status === 404) {
            // Si le chat n'existe pas, on le crée
            console.log(`Chat ${chatId} non trouvé, création...`);
            return await createChat(chatId);
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return { messages: [] };
    }
};

// Fonction modifiée pour ajouter un message
export const addMessage = async (userId, message) => {
    try {
        // D'abord on récupère le chat existant
        const chat = await fetchChatMessages(userId);
        
        // On ajoute le nouveau message
        const updatedMessages = [...(chat.messages || []), message];
        
        const response = await fetch(`${API_URL}/chats/${userId}`, {
            ...defaultOptions,
            method: 'PUT',
            body: JSON.stringify({
                id: userId,
                messages: updatedMessages,
                lastMessage: message.text,
                time: message.time,
                lastMessageTime: message.timestamp,
                updatedAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Erreur mise à jour chat');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding message:', error);
        throw new Error('Erreur mise à jour');
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
            body: JSON.stringify({
                ...message,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erreur mise à jour');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Erreur mise à jour');
    }
};