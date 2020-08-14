<template>
	<v-app id="inspire" fluid>
		<v-system-bar color="#fbab17"></v-system-bar>
		<v-main>
			<router-view/>
		</v-main>
		<v-footer class='justify-center' color="#616161" >
			<v-row > 
				<v-col class="text-center"  cols="12">
					<span>AIPLUS. </span>
					<span>ATTENDENCE . 2020</span>
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
<style>
	@font-face {
		font-family: "GoodPro-Medium";
		src: url('~@/assets/fonts/FontFont - GoodPro-Medium_0.otf');
	}
	.v-applicatio .text-lg-h4{ 
		font-family: "GoodPro-Medium" !important;
	}
</style>
<style scoped>
	.v-main{
		background: url('~@/assets/images/background.svg') no-repeat;
	}
</style>
