<script lang="ts">
    import { notifications } from '$lib/stores/notifications';
    import { fade, fly } from 'svelte/transition';

    const typeStyles = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500'
    };
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    {#each $notifications as notification (notification.id)}
        <div
            class="px-4 py-2 rounded-lg text-white shadow-lg {typeStyles[notification.type]}"
            transition:fly={{ y: 50, duration: 300 }}
        >
            {notification.message}
        </div>
    {/each}
</div> 