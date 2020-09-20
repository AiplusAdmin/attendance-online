<template>
    <v-form v-model="valid"  ref="form" class="myform mx-auto pt-9 pb-10 px-11">
		<v-container fluid>
			<v-row>
				<v-col class="pa-0">
					<div class="text-center text-lg-h4 text-md-h5 text-sm-h6 text-h6 font-weight-bold">ДОБРО ПОЖАЛОВАТЬ</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="pt-0">
					<div class="text-center text-lg-h4 text-md-h5 text-sm-h6 text-h6 font-weight-medium orange--text">ATTENDANCE ONLINE</div>
				</v-col>
			</v-row>
			<v-row class="mt-6">
				<v-col>
					<v-text-field label="Почта" v-model="login.email" color="#fbab17" :rules="[required('email'),emailFormat()]" required></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="justify-center pb-0">
					<v-text-field
					label="Пароль"
					v-model="login.password"
					:type="showPassword ? 'text':'password'"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPassword = !showPassword"
					color="#fbab17"
					:rules="[required('password')]" required
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="py-0">
					<v-checkbox label="Запомнить" v-model="login.remember" color="#fbab17"></v-checkbox>
				</v-col>
			</v-row>
			<v-row class='d-flex justify-center'>
				<v-col cols="12" lg="6" >
					<v-btn class="rounded-btn grey--text text--darken-2 font-weight-bold" @click="loginUser" height="60" primary block>Войти</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
import validations from '@/utils/validations'

export default {
  name: "LoginForm",
  data() {
    return {
		valid: true,
		login: {
			email: "",
			password: "",
			remember: false
		},
		showPassword: false,
		...validations
    }
  },
  beforeCreate() {
    var user = JSON.parse(window.localStorage.currentUser);
    if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
		this.$router.push({ path: `/teacher/${user.teacherId}` });
    }
  },
  methods: {
    async loginUser() {
		if(!this.valid)
			this.$refs.form.validate();
		else {
			var data = await this.$store.dispatch("LogIn", this.login);
			if(data){
				if(data.roleId == 2)
					this.$router.push({ path: `/teacher/${data.teacherId}` });
				else if(data.roleId == 3)
					this.$router.push({ path: '/statistics'});
				else if(data.roleId == 4)
					this.$router.push({ path: '/journals'});
			}
			else
				alert(data.message);
		} 
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
		border: 1px solid rgb(214,214,216);
		border-radius: 18px;
		background-image: linear-gradient(to bottom,rgb(255,255,255) 0%,rgb(214,214,216) 100%);
		box-shadow: 0px 8px 5px rgba(196, 197, 197);
	}
</style>
