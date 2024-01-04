<script>
  import { onMount } from "svelte";
  import * as contentful from "contentful";
  import { createClient } from 'contentful';

//   console.log(contentful);

//   let entry = [];

//   onMount(async () => {
//     const client = contentful.createClient({
//       space: "g4027mkrwnn3",
//       accessToken: "1LemAsBMnTt5PAJtk846SrUCQScy-w-eynZKx5_WpuA",
//     });

//     await client.getEntry("64FoTxZyb67frt7SlJl7TJ").then(function (entry) {
//       // logs the entry metadata
//       entry = entry;

//       console.log(entry)
//     });
//   });

const contentfulClient = createClient({
    space: "g4027mkrwnn3",
    accessToken: "1LemAsBMnTt5PAJtk846SrUCQScy-w-eynZKx5_WpuA",
  });

  let entries = [];

  onMount(async () => {
    try {
      const response = await contentfulClient.getEntries();
      entries = response.items;
    } catch (error) {
      console.error('Error fetching content from Contentful:', error);
    }
  });
</script>

<main>
    <ul>
      {#each entries as entry (entry.sys.id)}
      {#if entry.fields.dialogueBox }
      <li>
        <h3>💀{entry.fields.text}💀</h3>
        <img src={entry.fields.photo.fields.file.url} alt={entry.fields.title} />
        {@html entry.fields.dialogueBox}
      </li>
      {/if}
      {/each}
    </ul>
  </main>
