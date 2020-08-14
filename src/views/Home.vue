<template>
	<v-container fluid>
		<v-row>
			<v-img class="mx-auto mt-14 mb-12" src="@/assets/images/aiplusLogo.png" max-height="68" max-width="148"></v-img>
		</v-row>
		<v-row class="d-flex justify-center">
			<v-col class = "pa-0" cols="12" lg="4" md="5" sm="6" xs="12">
				<LoginForm />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm'

export default {
  name: 'Home',
  components: {
	LoginForm
  }
}
</script>
