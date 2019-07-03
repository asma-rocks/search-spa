<script>
	export let query = "";
	export let answer = Promise.resolve({hits: []});
	export let module = null;

	async function getSearchResults() {
		const res = await fetch(`http://localhost:8080/prefix?q=${encodeURIComponent(query)}`);		
		const json = res.json();
		if (res.ok) {
			return json;
		} else {
			throw new Error(res.text())
		}
	}

	function click() {
		answer = getSearchResults()
	}

	function play(id) {
		console.log(id)
		// jukebox.fetchUrl(`/asma/${id}`);
		module = jukebox.getInfo(`/asma/${id}`);
	}
</script>

<style>
	.search {
		width: 400px;
		border-right: 0;
		border-radius: 0;
	}

	.search, .submit {
		/* box-shadow: 4px 4px 4px #ddd; */
	}

	ul { 
		margin: 0 auto; 
		padding: 2em;
		width: 75%;
		background-color: rgb(0,102,118);
		color: rgb(88, 200, 216)
	}

	li {
		list-style-type: none;
		text-align: left;
	}
</style>

<section>
	<input bind:value={query} class="search"><button class="submit" on:click={click}>Search</button>
</section>

<section>
{#await answer}
<p>Loading...</p>
{:then results}
{#if results.took}
<p>hits: {results.total_hits}</p>
<p>{Math.round(results.took / 1000)}ms</p>
{/if}
<ul>
{#each results.hits as hits}
<li on:click={() => play(hits.id)}>{hits.id}</li>
{/each}
</ul>
{:catch err}
<p class="error">{err.message}</p>
{/await}
</section>

<section>
{#await module}
<p>No module picked</p>
{:then info}
{#if info}
<p>{info.getAuthor()}</p>
<p>{info.getTitle()}</p>
<p>{info.getDate()}</p>
<p>{info.getSongs()}</p>
{/if}
{/await}
</section>
