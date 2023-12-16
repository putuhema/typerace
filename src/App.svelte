<script lang="ts">
  import Timer from "./components/timer.svelte";
  import Navbar from "./components/navbar.svelte";
  let timerComponent: Timer;
  let time = 120;

  let words =
    "The sun set over the horizon, casting long shadows over the tranquil village nestled in the heart of the valley.";
  let typeWord = "";
  let carPosition = 0;
  let wordArray = words.split(" ");
  let currentWordIndex = 0;
  let correctWord: string[] = [];
  let typoWord: string[] = [];
  let wpm = 0;
  let typo = false;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    typeWord = target.value;
  };

  const handleSubmitWord = (e: KeyboardEvent) => {
    const trimmedTypeWord = typeWord.trim();
    if (trimmedTypeWord.length > 0 && e.key === " ") {
      if (trimmedTypeWord === wordArray[currentWordIndex]) {
        correctWord.push(wordArray[currentWordIndex]);
        currentWordIndex++;
        carPosition = (correctWord.length / wordArray.length) * 100;
        typeWord = "";
        typo = false;
      } else {
        typo = true;
        typoWord.push(wordArray[currentWordIndex]);
      }
      correctWord = correctWord;
      typoWord = typoWord;
    }
  };
</script>

<main class="container max-w-[760px] mx-auto">
  <Navbar />
  <div class="flex items-center justify-between mb-10">
    <h2 class="text-blue-500">The Race is On! Type the text below:</h2>
    <Timer bind:this={timerComponent} {time} />
  </div>
  <div class="w-full relative flex gap-2">
    <div class="w-full">
      <div class="flex-1 w-full relative h-[45px]">
        <div
          style="left:{carPosition}%;"
          class="text-3xl absolute transition-all duration-200 -top-8 transform scale-x-[-1]"
        >
          <img src="chibi.gif" alt="main dog" class="w-20 h-20" />
        </div>
      </div>
      <div class="border border-dashed"></div>
    </div>
    <div class="w-[100px] self-end font-bold">{wpm} wpm</div>
  </div>
  <section
    class="container max-w-[760px] mx-auto select-none mt-2 shadow-hard shadow-pink-600 border border-pink-600 p-2 text-pink-800 bg-pink-100 rounded-md"
  >
    {#each wordArray as word, i}
      <span
        class={wordArray[i] === correctWord[i]
          ? "text-green-500"
          : i <= currentWordIndex && typoWord.includes(word)
            ? "text-red-500 font-semibold"
            : ""}
      >
        {word}
      </span>
    {/each}
  </section>
  <div class=" rounded-md p-2">
    <div class="flex flex-col mb-4">
      <input
        class:shake={typo}
        class={`p-2 border w-full ${typo && "bg-red-200"}`}
        value={typeWord}
        on:input={handleInput}
        on:keydown={handleSubmitWord}
      />
    </div>
    <!-- <button
      on:click={() => timerComponent.startTimer()}
      class="rounded-md shadow-hard transition-all duration-100 translate-y-0 hover:translate-y-1 hover:translate-x-1 hover:shadow-normal shadow-pink-600 bg-pink-400 p-2 font-bold text-white"
    >
      Start Typing...
    </button> -->
  </div>
</main>

<style>
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  .shake {
    animation: shake 0.3s;
    animation-iteration-count: 1;
  }
</style>
