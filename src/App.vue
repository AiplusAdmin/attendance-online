<template>
	<v-app id="inspire" fluid>
		<v-system-bar color="#fbab17"></v-system-bar>
		<v-main>
			<router-view/>
		</v-main>
		<v-footer class='justify-center' color="grey darken-1" >
			<v-row > 
				<v-col class="text-center"  cols="12">
					<span class="orange--text font-weight-bold">AIPLUS. </span>
					<span class="white--text font-weight-bold">ATTENDANCE. 2020 г.</span>
				</v-col>
			</v-row>
		</v-footer>
	</v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
	.v-main{
		background: url('~@/assets/images/background.svg') no-repeat;
		background-attachment: fixed;
		background-size: cover;
	}
</style>
