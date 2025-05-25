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

<main class="min-h-screen bg-[#E8E9EA] text-[#0F0F0F]">
  <!-- Hero Section -->
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-[#002E5D] opacity-90"></div>
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

  <!-- Features Section -->
  <section class="py-20 px-4 bg-[#D6D2C4]">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-['Anton'] text-4xl md:text-5xl text-[#002E5D] mb-12 text-center">
        JOIN THE COMMUNITY
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h3 class="font-['Lora'] text-2xl text-[#00A7B5] mb-4">Build Together</h3>
          <p class="font-['Inter'] text-[#0F0F0F]">Collaborate with fellow Stellar developers in a creative environment.</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h3 class="font-['Lora'] text-2xl text-[#00A7B5] mb-4">Learn & Share</h3>
          <p class="font-['Inter'] text-[#0F0F0F]">Exchange knowledge about blockchain development while having fun.</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h3 class="font-['Lora'] text-2xl text-[#00A7B5] mb-4">Future Integration</h3>
          <p class="font-['Inter'] text-[#0F0F0F]">Coming soon: Stellar smart wallet integration within the game.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-4 bg-[#B7ACE8]">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="font-['Anton'] text-4xl md:text-5xl text-[#0F0F0F] mb-8">
        READY TO JOIN?
      </h2>
      <p class="font-['Lora'] text-xl text-[#0F0F0F] mb-8">
        Connect with fellow Stellar developers in a unique gaming environment
      </p>
      <button
        on:click={() => copyToClipboard(SERVER_IP)}
        class="bg-[#FDDA24] text-[#0F0F0F] px-8 py-4 rounded-lg inline-block font-['Inter'] font-semibold text-xl hover:bg-[#e6c520] transition-colors cursor-pointer"
      >
        Server IP: {SERVER_IP}
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
</style>
