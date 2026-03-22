import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'chapter' | 'comment' | 'author' | 'system';
    read: boolean;
    createdAt: Date;
    link?: string;
}

export function useNotifications() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (user?.id) {
            loadNotifications();
        }
    }, [user?.id]);

    const loadNotifications = () => {
        try {
            const key = `notifications_${user?.id}`;
            const stored = localStorage.getItem(key);
            const data = stored ? JSON.parse(stored) : [];
            setNotifications(data);
            updateUnreadCount(data);
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    };

    const updateUnreadCount = (notifs: Notification[]) => {
        const count = notifs.filter(n => !n.read).length;
        setUnreadCount(count);
    };

    const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
        if (!user?.id) return;

        const newNotif: Notification = {
            ...notification,
            id: `notif_${Date.now()}`,
            createdAt: new Date()
        };

        const updated = [newNotif, ...notifications].slice(0, 50); // Keep last 50
        setNotifications(updated);
        updateUnreadCount(updated);

        const key = `notifications_${user.id}`;
        localStorage.setItem(key, JSON.stringify(updated));
    };

    const markAsRead = (notificationId: string) => {
        const updated = notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        );
        setNotifications(updated);
        updateUnreadCount(updated);

        const key = `notifications_${user?.id}`;
        localStorage.setItem(key, JSON.stringify(updated));
    };

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        setUnreadCount(0);

        const key = `notifications_${user?.id}`;
        localStorage.setItem(key, JSON.stringify(updated));
    };

    const deleteNotification = (notificationId: string) => {
        const updated = notifications.filter(n => n.id !== notificationId);
        setNotifications(updated);
        updateUnreadCount(updated);

        const key = `notifications_${user?.id}`;
        localStorage.setItem(key, JSON.stringify(updated));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);

        const key = `notifications_${user?.id}`;
        localStorage.removeItem(key);
    };

    return {
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        loadNotifications
    };
}
