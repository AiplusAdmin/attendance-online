<template>
	<v-container>
		<v-row>
			<v-col>
				Алматы
			</v-col>
		</v-row>
		<v-form class="myform">
			<h3>Рассылка Онлайн Уроков</h3>
			<v-select
					v-model="online.class"
					:items="classes"
					label="Класс"
					color="#fbab17"
					solo rounded outlined flat dense
					:rules="[required('Класс')]" required>
			</v-select>
			<v-select
					v-model="online.branch"
					:items="branches"
					label="Отделение"
					color="#fbab17"
					solo rounded outlined flat dense
					:rules="[required('Отделение')]" required>
			</v-select>
			<v-row v-for="(testLink,index) in online.testLinks" :key="index">
				<v-col>
					<v-text-field
					v-model="testLink.text"
					label="Текст на Тест"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('Текст')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="testLink.link"
					label="Ссылка на Тест"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('ссылка')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="testLink.id"
					label="Место для ID"
					color="#fbab17"
					background-color="white"
					rounded outlined flat dense
					:rules="[required('Место для ID')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-btn
					fab dark small
					color="indigo" @click="testLink.btn.method == 'add' ? AddLink() : RemoveLink(index)">
						<v-icon dark>
							{{testLink.btn.text}}
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row v-for="(videoLink,index) in online.videoLinks" :key="index">
				<v-col>
					<v-text-field
					v-model="videoLink.text"
					label="Текст на Видео"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('Текст')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="videoLink.link"
					label="Ссылка на Видео"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('ссылка')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-btn
					fab dark small
					color="indigo" @click="videoLink.btn.method == 'add' ? AddVideo() : RemoveVideo(index)">
						<v-icon dark>
							{{videoLink.btn.text}}
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field
					v-model="online.homework"
					label="Вопросы д/з"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('Текст')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="online.answer"
					label="Ответы д/з"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('ссылка')]" required
					></v-text-field>
				</v-col>
			</v-row>
			<v-btn @click="Online">Отправить</v-btn>
		</v-form>
		<v-form class="myform my-5">
			<h3>Рассылка Интенсив</h3>
			<v-select
					v-model="intensiv.school"
					:items="schools"
					item-text="Name"
					label="Филиал"
					color="#fbab17"
					item-color='#fbab17'
					multiple rounded outlined flat dense
					:rules="[required('Филиал')]" required>
			</v-select>
			<v-select
					v-model="intensiv.branch"
					:items="branches"
					label="Отделение"
					color="#fbab17"
					solo rounded outlined flat dense
					:rules="[required('Отделение')]" required>
			</v-select>
			<v-row v-for="(testLink,index) in intensiv.testLinks" :key="index">
				<v-col>
					<v-text-field
					v-model="testLink.text"
					label="Текст на Тест"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('Текст')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="testLink.link"
					label="Ссылка на Тест"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('ссылка')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="testLink.id"
					label="Место для ID"
					color="#fbab17"
					background-color="white"
					rounded outlined flat dense
					:rules="[required('Место для ID')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-btn
					fab dark small
					color="indigo" @click="testLink.btn.method == 'add' ? AddLinkIntensiv() : RemoveLinkIntensiv(index)">
						<v-icon dark>
							{{testLink.btn.text}}
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row v-for="(videoLink,index) in intensiv.videoLinks" :key="index">
				<v-col>
					<v-text-field
					v-model="videoLink.text"
					label="Текст на Видео"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('Текст')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-text-field
					v-model="videoLink.link"
					label="Ссылка на Видео"
					color="#fbab17"
					rounded outlined flat dense
					:rules="[required('ссылка')]" required
					></v-text-field>
				</v-col>
				<v-col>
					<v-btn
					fab dark small
					color="indigo" @click="videoLink.btn.method == 'add' ? AddVideoIntensiv() : RemoveVideoIntensiv(index)">
						<v-icon dark>
							{{videoLink.btn.text}}
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-btn @click="Intensiv">Отправить</v-btn>
		</v-form>
		<v-form class="myform my-5">
			<h3>Attendance оповещение</h3>
			<v-row>
				<v-col>
					<v-select
						v-model="attendence.school"
						:items="schools"
						label="Филиал"
						item-text="Name"
						color="#fbab17"
						return-object
						solo rounded outlined flat dense
						:rules="[requiredObject('Филиал')]" required>
					</v-select>
				</v-col>
				<v-col>
					<v-menu
						ref="attendence.menu"
						v-model="attendence.menu"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="attendence.date"
								label="Дата"
								prepend-icon="mdi-calendar"
								readonly
								rounded outlined flat dense
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="attendence.date"
							no-title
							@input="attendence.menu = false"
							>
						</v-date-picker>
					</v-menu>
				</v-col>
				<v-col>
					<v-btn @click="Attendance">Отправить</v-btn>
				</v-col>
			</v-row>			
		</v-form>
		<v-form class="myform my-5">
			<h3>Attendance оповещение ученика</h3>
			<v-row>
				<v-col>
					<v-menu
						ref="attendenceind.menu1"
						v-model="attendenceind.menu1"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="attendenceind.from"
								label="Дата"
								prepend-icon="mdi-calendar"
								readonly
								rounded outlined flat dense
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="attendenceind.from"
							no-title
							@input="attendenceind.menu1 = false"
							>
						</v-date-picker>
					</v-menu>
				</v-col>
				<v-col>
					<v-menu
						ref="attendenceind.menu2"
						v-model="attendenceind.menu2"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="attendenceind.to"
								label="Дата"
								prepend-icon="mdi-calendar"
								readonly
								rounded outlined flat dense
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="attendenceind.to"
							no-title
							@input="attendenceind.menu2 = false"
							>
						</v-date-picker>
					</v-menu>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field
						v-model="attendenceind.studentId"
						label="StudentId"
						color="#fbab17"
						rounded outlined flat dense
					></v-text-field>
				</v-col>
				<v-col>
					<v-btn @click="AttendancePersonal">Отправить</v-btn>
				</v-col>
			</v-row>		
		</v-form>
		<v-form class="myform my-5">
			<h3>Рассылка персональных тестов</h3>
			<v-row>
				<v-col>
					<v-menu
						ref="personalTest.menu"
						v-model="personalTest.menu"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="personalTest.date"
								label="Дата"
								prepend-icon="mdi-calendar"
								readonly
								rounded outlined flat dense
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							v-model="personalTest.date"
							no-title
							@input="personalTest.menu = false"
							>
						</v-date-picker>
					</v-menu>
				</v-col>
				<v-col>
					<v-btn @click="PersonalTest" >Отправить</v-btn>
				</v-col>
			</v-row>			
		</v-form>
		<v-form class="myform my-5">
			<h3>Объявление</h3>
			<v-select
					v-model="notification.school"
					:items="schools"
					label="Филиал"
					item-text="Name"
					color="#fbab17"
					item-color='#fbab17'
					multiple rounded outlined flat dense
					:rules="[required('Филиал')]" required>
			</v-select>
			<v-select
					v-model="notification.class"
					:items="classes"
					label="Класс"
					color="#fbab17"
					item-color='#fbab17'
					multiple rounded outlined flat dense
					:rules="[required('Класс')]" required>
			</v-select>
			<v-select
					v-model="notification.branch"
					:items="branches"
					label="Отделение"
					color="#fbab17"
					solo rounded outlined flat dense
					:rules="[required('Отделение')]" required>
			</v-select>
			<v-textarea
				v-model="notification.message"
				label="Сообщение"
				color="#fbab17"
				clearable outlined
			></v-textarea>
			<v-btn @click="Notification">Отправить</v-btn>
		</v-form>
		<v-form  enctype="multipart/form-data">
			<h3>Оповещение Интенсива</h3>
			<v-file-input
				show-size
				counter
				multiple
				label="File input"
				@change="selectFile"
			></v-file-input>
			<v-btn @click="Upload">Отправить</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import validations from '@/utils/validations'
import Api from '../service/api'

export default {
	name: 'AdminBotForm',
	components: {
		
	},
	data(){
		return {
			classes: [0,1,2,3,4,5,6,7,8,9,10,11],
			branches: ['КО','РО','КОРО'],
			schools: [],
			online : {
				class: null,
				branch: null,
				testLinks: [
					{
						text: null,
						link: null,
						id: null,
						btn: {
							text: 'mdi-plus',
							method: 'add'
						}
					}
				],
				videoLinks: [
					{
						text: null,
						link: null,
						btn: {
							text: 'mdi-plus',
							method: 'add'
						}
					}
				],
				homework: null,
				answer: null
			},
			intensiv: {
				school: null,
				branch: null,
				testLinks: [
					{
						text: null,
						link: null,
						id: null,
						btn: {
							text: 'mdi-plus',
							method: 'add'
						}
					}
				],
				videoLinks: [
					{
						text: null,
						link: null,
						btn: {
							text: 'mdi-plus',
							method: 'add'
						}
					}
				],
			},
			attendence: {
				school: null,
				date: new Date().toISOString().substr(0, 10),
				menu: false,
			},
			attendenceind: {
				from: new Date().toISOString().substr(0, 10),
				to: new Date().toISOString().substr(0, 10),
				menu1: false,
				menu2: false,
				studentId: null
			},
			personalTest: {
				date : new Date().toISOString().substr(0, 10),
				menu: false
			},
			notification: {
				school: null,
				class: null,
				branch: null,
				message:null
			},
			currentFile: undefined,
			...validations
		}
	},
	async mounted(){
		this.schools = await this.$store.dispatch('GetOffices');
	},
	methods:{
		AddLink(){
			this.online.testLinks.push({
				text: null,
				link: null,
				id: null,
				btn: {
					text: 'mdi-minus',
					method: 'remove'
				}
			});
		},
		RemoveLink(index){
			this.online.testLinks.splice(index,1);
		},
		AddVideo(){
			this.online.videoLinks.push({
				text: null,
				link: null,
				btn: {
					text: 'mdi-minus',
					method: 'remove'
				}
			});
		},
		RemoveVideo(index){
			this.online.videoLinks.splice(index,1);
		},
		AddLinkIntensiv(){
			this.intensiv.testLinks.push({
				text: null,
				link: null,
				id: null,
				btn: {
					text: 'mdi-minus',
					method: 'remove'
				}
			});
		},
		RemoveLinkIntensiv(index){
			this.intensiv.testLinks.splice(index,1);
		},
		AddVideoIntensiv(){
			this.intensiv.videoLinks.push({
				text: null,
				link: null,
				btn: {
					text: 'mdi-minus',
					method: 'remove'
				}
			});
		},
		RemoveVideoIntensiv(index){
			this.intensiv.videoLinks.splice(index,1);
		},
		Online(){
			this.$store.dispatch('TelegramOnline',this.online);
		},
		Intensiv(){
			this.$store.dispatch('TelegramIntensiv',this.intensiv);
		},
		Attendance(){
			this.$store.dispatch('TelegramAttendance',this.attendence);
		},
		AttendancePersonal(){
			this.$store.dispatch('TelegramAttendancePersonal',this.attendenceind);
		},
		PersonalTest(){
			this.$store.dispatch('TelegramPersonalTest',this.personalTest);
		},
		Notification(){
			this.$store.dispatch('TelegramNotification',this.notification);
		},
		selectFile(file){
			this.currentFile = file[0];
		},
		async Upload(){
			try{
				const formData = new FormData();
				formData.append('files',this.currentFile);
				console.log(this.currentFile);
				console.log(formData);
				await Api().post('/telegram/upload',formData);
			}catch(err){
				console.log(err);
			}
		}
	}
}
</script>
<style scoped>
	.myform{
		background: #ffffff;
		border-radius: 12px;
	}
</style>
