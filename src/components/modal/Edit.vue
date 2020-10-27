<template>
  <v-row class="d-flex justify-end">
    <v-dialog  v-model="dialog" persistent max-width="400">
		<template  v-slot:activator="{ on, attrs }">
			<span class="d-flex align-center"
				v-bind="attrs"
				v-on="on">
					<v-icon>mdi-pencil</v-icon>
					Редактировать
			</span>
		</template>
		<v-card class="rounded-card py-2 px-5">
			<v-form v-model="valid" ref="form" class="pb-4"> 
				<v-card-title class="pb-2 d-flex justify-center align-center">
					<span class="pl-4 font-weight-bold text-h5">Личные данные</span>
					<v-icon class="ml-auto" @click="Cancel">mdi-close-thick</v-icon>
				</v-card-title>
				<v-divider></v-divider>
				<v-text-field class="pt-8 bordered" 
					v-model="params.fio"
					rounded label=" Ф.И.О" 
					outlined dense color="#fbab17" 
					clearable></v-text-field>
				<v-divider></v-divider>
				<span class="pl-1 grey--text text--darken-1 font-weight-bold text-subtitle-1">Старый пароль</span>
				<v-text-field class="pt-2 bordered" 
					v-model="params.oldPass"
					:type="showPast ? 'text':'password'"
					:append-icon="showPast ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showPast = !showPast"
					rounded placeholder="Старый пароль"
					:error-messages = errMessagePass
					outlined dense color="#fbab17" clearable >
				</v-text-field>
				
				<span class="pl-1 grey--text text--darken-1 font-weight-bold text-subtitle-1">Новый пароль</span>
				<v-text-field class="pt-2 bordered" 
					v-model="params.newPass"
					:type="showNew ? 'text':'password'"
					:append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showNew = !showNew"
					rounded placeholder="Новый пароль"
					:error-messages = errMessageNew
					outlined dense color="#fbab17" clearable >
				</v-text-field>

				<span class="pl-1 grey--text text--darken-1 font-weight-bold text-subtitle-1">Повторите пароль</span>
				<v-text-field class="pt-2 bordered"
					v-model="params.repeatPass" 
					:type="showRepeat ? 'text':'password'"
					:append-icon="showRepeat ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append="showRepeat = !showRepeat"
					rounded placeholder="Повторите пароль"
					outlined dense color="#fbab17"
					:error-messages = errMessageRepeat
					clearable></v-text-field>

				<v-card-actions class="px-0">
					<v-btn class="rounded-btn-orange white--text" :loading="click" :height="48" @click="Save" block rounded>Сохранить</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import validations from '@/utils/validations'

export default {
	name: 'Edit',
	data(){
		return {
			valid: true,
			dialog : false,
			click: false,
			showPast:false,
			showNew:false,
			showRepeat:false,
			errMessagePass:'',
			errMessageNew:'',
			errMessageRepeat:'',
			oldPassCheck: '',
			params:{
				teacherId: null,
				fio: null, 
				oldPass: null,
				newPass: null,
				repeatPass: null
			},
			...validations
		}
	},
	computed:{
		currentUser(){
			return this.$store.state.currentUser;
		}
	},
	methods: {
		Cancel(){
			this.dialog = false;
		},
		async Save(){
			if(this.valid){
				if(this.currentUser.teacherId == undefined)
					this.$router.push('/');
				else{
					this.params.teacherId = this.currentUser.teacherId;
					var response = await this.$store.dispatch('EditPersonal',this.params);
					if(response.status == 402){
						this.oldPassCheck = this.params.oldPass;
						this.errMessagePass = response.message;
					} else if(response.status == 200){
						this.params.oldPass = null;
						this.params.newPass = null;
						this.params.repeatPass = null;
						this.dialog = false;
					} else if(response.staus == 500){
						console.log('Ошибка');
					}
				}
			} else {
				this.$refs.form.validate();
			}
		}
	},
	watch:{
		params:{
			handler: function(newVal){
				if(newVal.oldPass != null){
					console.log(newVal);
					if(newVal.newPass === null){
						this.errMessageNew = 'Объязательное поле';
					}else {
						this.errMessageNew = '';
					}
					
					if(newVal.repeatPass === null){
						this.errMessageRepeat = 'Объязательное поле';
					}else {
						this.errMessageRepeat = '';
					}

				}
				
				if(newVal.newPass != null && newVal.oldPass != null && newVal.oldPass == newVal.newPass){
					this.errMessageNew = 'Одинаковые';
				} else if(newVal.newPass != null){
					this.errMessageNew = '';
				}

				if(newVal.repeatPass != null && newVal.newPass != null && newVal.repeatPass != newVal.newPass){
					this.errMessageRepeat = 'Не совпадает';
				} else if(newVal.repeatPass != null){
					this.errMessageRepeat = '';
				}

				if(newVal.oldPass != this.oldPassCheck){
					this.errMessagePass = '';
				}else{
					this.errMessagePass = 'Не подходит пароль';
				}
			},
			deep: true
		}
	}
}
</script>

<style scoped>
	.rounded-btn{
		border: 1px solid rgb(214,214,216);
		background-image: linear-gradient(to bottom,rgb(255,255,255) 0%,rgb(214,214,216) 100%);
	}

	.bordered .v-input__slot{
		border: 1px solid #9e9e9e;
	}

	.rounded-card{
		border-radius: 10px;
	}

	.rounded-btn-orange{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>