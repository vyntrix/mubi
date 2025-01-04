<script>
  import { signOut } from "@auth/sveltekit/client";
</script>

<button class="btn-sec" aria-label="Log out" onclick={() => signOut()}>Logout</button>
