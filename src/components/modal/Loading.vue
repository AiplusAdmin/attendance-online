<template>
	<v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
		color="orange"
        size="56"
		width="8"
      ></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
	name: 'InfoModel',
	props: {
		overlay : Boolean	
	}
}
</script>