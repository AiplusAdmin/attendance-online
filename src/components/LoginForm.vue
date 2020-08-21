<template>
    <v-form class="myform mx-auto pt-9 pb-10 px-11">
		<v-container fluid>
			<v-row>
				<v-col class="pa-0">
					<div class="text-center text-lg-h4 font-weight-black">ДОБРО ПОЖАЛОВАТЬ</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pt-0">
					<div class="text-center text-lg-h4" color="orange--text">ATTENDANCE ONLINE</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field label="Почта" v-model="login.email" color="#fbab17"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="justify-center">
					<v-text-field
					label="Пароль"
					v-model="login.password"
					:type="showPassword ? 'text':'password'"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					color="#fbab17"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-checkbox label="Запомнить" v-model="login.remember"></v-checkbox>
				</v-col>
			</v-row>
			<v-row >
				<v-col class='d-flex justify-center'>
					<v-btn class="rounded-btn" @click="loginUser" width="168" height="55" primary>Войти</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      login: {
        email: "",
		password: "",
		remember: false
      },
      showPassword: false,
    };
  },
  beforeCreate() {
    var user = JSON.parse(window.localStorage.currentUser);
    if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
		this.$router.push({ path: `/teacher/${user.teacherId}` });
    }
  },
  methods: {
    async loginUser() {
		var data = await this.$store.dispatch("LogIn", this.login);
		if(data.status == 200)
			this.$router.push({ path: `/teacher/${data.teacherId}` });
		else if(data.status == 404)
			alert(data.message);
		else
			alert('Ошибка сервером')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.myform{
		background: rgba(255, 255, 255, 0.5);
		border-radius: 18px;
		margin-bottom: 145px;
	}
	.rounded-btn{
		border-radius: 18px;
	}
</style>
