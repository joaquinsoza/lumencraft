import { writable } from 'svelte/store';

type NotificationType = 'info' | 'success' | 'error' | 'warning';

interface Notification {
    id: number;
    message: string;
    type: NotificationType;
}

function createNotifications() {
    const { subscribe, update } = writable<Notification[]>([]);

    return {
        subscribe,
        add: (message: string, type: NotificationType = 'info', duration = 3000) => {
            const id = Date.now();
            update(notifications => [...notifications, { id, message, type }]);
            
            setTimeout(() => {
                update(notifications => notifications.filter(n => n.id !== id));
            }, duration);
        },
        remove: (id: number) => {
            update(notifications => notifications.filter(n => n.id !== id));
        }
    };
}

export const notifications = createNotifications(); 