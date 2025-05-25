<script lang="ts">
  import { onMount } from 'svelte';
  import Notification from '$lib/components/Notification.svelte';
  import { notifications } from '$lib/stores/notifications';
  
  const SERVER_IP = 'lumencraft.xyz';

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      notifications.add('Server IP copied to clipboard!', 'success');
    }).catch(() => {
      notifications.add('Failed to copy server IP', 'error');
    });
  }
  
  onMount(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600&family=Lora:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
</script>

<svelte:head>
  <title>LumenCraft - Stellar Developer Minecraft Server</title>
</svelte:head>

<main class="min-h-screen pixel-bg text-[#0F0F0F]">
  <!-- Hero Section -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-[#011d3a] opacity-80"></div>
    <div class="relative z-10 text-center px-4">
      <h1 class="font-['Anton'] text-6xl md:text-8xl text-[#FDDA24] mb-6 tracking-wider">
        LUMENCRAFT
      </h1>
      <p class="font-['Lora'] text-2xl md:text-3xl text-white mb-8">
        Where Stellar Developers Build Together
      </p>
      <button
        on:click={() => copyToClipboard(SERVER_IP)}
        class="bg-[#FDDA24] text-[#0F0F0F] px-8 py-4 rounded-lg inline-block font-['Lora'] font-semibold text-xl hover:bg-[#e6c520] transition-colors cursor-pointer"
      >
        {SERVER_IP}
      </button>
    </div>
  </section>
</main>

<Notification />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
  
  /* Minecraft-style pixel background */
  .pixel-bg {
    position: relative;
    min-height: 100vh;
    background: #111112;
    overflow: hidden;
  }
  .pixel-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.7;
    /* Layer 1: Large blocks */
    background:
      repeating-linear-gradient(90deg, #18191b 0 32px, transparent 32px 64px),
      repeating-linear-gradient(180deg, #18191b 0 32px, transparent 32px 64px),
      /* Layer 2: Medium blocks */
      repeating-linear-gradient(90deg, #222325 0 16px, transparent 16px 32px),
      repeating-linear-gradient(180deg, #222325 0 16px, transparent 16px 32px),
      /* Layer 3: Small blocks */
      repeating-linear-gradient(90deg, #232425 0 8px, transparent 8px 16px),
      repeating-linear-gradient(180deg, #232425 0 8px, transparent 8px 16px);
    mix-blend-mode: lighten;
  }
  .pixel-bg > * {
    position: relative;
    z-index: 1;
  }
</style>
