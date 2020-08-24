<template>
	<v-app id="inspire" fluid>
		<v-system-bar color="#fbab17"></v-system-bar>
		<v-main>
			<router-view/>
		</v-main>
		<v-footer class='justify-center' color="grey darken-2" >
			<v-row > 
				<v-col class="text-center"  cols="12">
					<span class="orange--text font-weight-bold">AIPLUS. </span>
					<span class="grey--text text--darken-1 font-weight-bold">ATTENDANCE . 2020</span>
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
