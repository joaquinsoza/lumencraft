<script lang="ts">
  import { onMount } from 'svelte';
  import Notification from '$lib/components/Notification.svelte';
  import { notifications } from '$lib/stores/notifications';
  import QRCode from 'qrcode';
  import { writable } from 'svelte/store';
  
  const SERVER_IP = 'lumencraft.xyz';
  const STELLAR_ADDRESS = 'GAPPCK2C2MZ7AVKSXVAXSALMRDZ6ZRPKUZENFUP2YSDE5LMQQQETZQYJ';

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      notifications.add('Server IP copied to clipboard!', 'success');
    }).catch(() => {
      notifications.add('Failed to copy server IP', 'error');
    });
  }

  // Popup state
  const showDonate = writable(false);
  const qrDataUrl = writable('');

  async function openDonatePopup() {
    showDonate.set(true);
    const url = await QRCode.toDataURL(STELLAR_ADDRESS, { width: 200, margin: 2, color: { dark: '#0F0F0F', light: '#fff' } });
    qrDataUrl.set(url);
  }
  function closeDonatePopup() {
    showDonate.set(false);
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
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-row gap-4 justify-center">
          <button
            on:click={() => copyToClipboard(SERVER_IP)}
            class="bg-[#FDDA24] text-[#0F0F0F] px-8 py-4 rounded-lg inline-block font-['Inter'] font-semibold text-xl hover:bg-[#e6c520] transition-colors cursor-pointer"
          >
            {SERVER_IP}
          </button>
          <button
            on:click={openDonatePopup}
            class="bg-[#B7ACE8] text-[#0F0F0F] px-6 py-4 rounded-lg inline-block font-['Inter'] font-semibold text-xl hover:bg-[#a49ad1] transition-colors cursor-pointer border border-[#FDDA24]"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  </section>
</main>

<Notification />

{#if $showDonate}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    on:click|self={closeDonatePopup}
  >
    <div class="bg-white rounded-xl shadow-2xl p-8 max-w-xs w-full relative flex flex-col items-center">
      <button 
        type="button"
        class="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-700 transition-colors"
        on:click={closeDonatePopup}
        aria-label="Close donation modal"
      >
        ×
      </button>
      <h2 class="font-['Anton'] text-2xl text-[#002E5D] mb-2">Support the Server</h2>
      <p class="font-['Lora'] text-base text-[#0F0F0F] mb-4 text-center">Donations are very welcome and help keep the server running! All funds go directly to hosting costs.</p>
      {#if $qrDataUrl}
        <button
          type="button"
          class="mb-4 w-40 h-40 mx-auto cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-0 p-0"
          on:click={() => {navigator.clipboard.writeText(STELLAR_ADDRESS); notifications.add('Stellar address copied!', 'success');}}
          on:keydown={(e) => e.key === 'Enter' && (navigator.clipboard.writeText(STELLAR_ADDRESS), notifications.add('Stellar address copied!', 'success'))}
          aria-label="Copy Stellar address to clipboard"
        >
          <img src="{$qrDataUrl}" alt="Stellar QR Code" class="w-full h-full" />
        </button>
      {/if}
      <button
        type="button"
        class="font-['Inter'] text-xs text-[#002E5D] break-all mb-2 text-center cursor-pointer hover:underline bg-transparent border-0 p-0 w-full"
        on:click={() => {navigator.clipboard.writeText(STELLAR_ADDRESS); notifications.add('Stellar address copied!', 'success');}}
        on:keydown={(e) => e.key === 'Enter' && (navigator.clipboard.writeText(STELLAR_ADDRESS), notifications.add('Stellar address copied!', 'success'))}
        aria-label="Copy Stellar address to clipboard"
      >
        {STELLAR_ADDRESS}
      </button>
    </div>
  </div>
{/if}

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

  /* Ensure notifications appear above modal */
  :global(.fixed.bottom-4.right-4) {
    z-index: 60;
  }
</style>
