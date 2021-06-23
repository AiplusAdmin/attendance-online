<template>
	<v-container fluid>
		<v-row class="d-flex justify-space-around align-center">
			<Header/>
		</v-row>
		<v-row :class="isMobile ? 'd-flex justify-center':'d-flex justify-center px-8'">
			<v-col cols="12" lg="10">
				<router-link class="orange--text text-decoration-none" :to="`/teacher/${currentTeacher.Id}`">Главная</router-link>
			</v-col>
		</v-row>
		<v-row :class="isMobile?'d-flex justify-center':'d-flex justify-center px-8'">
			<v-col cols="12" lg="10">
				<div class="tab-slider--nav">
					<ul class="tab-slider--tabs">
						<li class="tab-slider--trigger active" rel="tab1">Журнал</li>
						<li class="tab-slider--trigger" rel="tab2">Тесты</li>
					</ul>
				</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" lg="12">
				<div class="tab-slider--container">
					<div id="tab1" class="tab-slider--body">
						<JournalForm />
					</div>
					<div id="tab2" class="tab-slider--body">
						<PersonalTestJournal />
					</div>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import JournalForm from '@/components/JournalForm'
import PersonalTestJournal from '@/components/PersonalTestJournal'
import Header from '@/components/Header'

export default {
	name: 'Journal',
	components: {
		JournalForm,
		PersonalTestJournal,
		Header
	},
	data(){
		return{
			isMobile: false
		}
	},
	mounted() {
		this.onResize();
		var user = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{};
		
		if (user == undefined || (Object.keys(user).length === 0 && user.constructor === Object)) {
			this.$router.push({path:'/'});
		} else {
			this.$store.state.currentUser = user;
		}

		this.$nextTick(() => {			
			$("document").ready(function(){
				$(".tab-slider--body").hide();
				$(".tab-slider--body:first").show();
			});

			$(".tab-slider--nav li").click(function() {
				$(".tab-slider--body").hide();
				var activeTab = $(this).attr("rel");
				$("#"+activeTab).fadeIn();
					if($(this).attr("rel") == "tab2"){
						$('.tab-slider--tabs').addClass('slide');
					}else{
						$('.tab-slider--tabs').removeClass('slide');
					}
				$(".tab-slider--nav li").removeClass("active");
				$(this).addClass("active");
			});
		});
	},
	computed: {
		currentUser(){
			return this.$store.state.currentUser;
		},
		currentTeacher(){
			return this.$store.state.currentTeacher;
		}
	},
	methods: {
		LogOut(){
			this.$store.dispatch('LogOut');
			this.$router.push('/');
		},
		onResize(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': 
					this.isMobile = true;
					break;
				case 'sm': 
					this.isMobile = true;
					break;
				default:
					this.isMobile = false;
			}
		}
	}
}
</script>

<style scoped>

.tab-slider--nav{
	width: 100%;
	float: left;
	margin-bottom: 20px;
}
.tab-slider--tabs{
	width: 100%;
	border: 1px solid #a6a6a6;
	display: block;
	float: left;
	margin: 0;
	padding: 6px 0;
	list-style: none;
	position: relative;
	border-radius: 35px;
	overflow: hidden;
	background: #fff;
	height: 50px;
	user-select: none; 
}

.tab-slider--tabs:after{
	content: "";
	width: 50%;
	background: #fbab17;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transition: all 250ms ease-in-out;
	border-radius: 35px;
}

.tab-slider--tabs.slide:after{
	left: 50%;
}

.tab-slider--trigger {
	width: 50%;
	font-size: 17px;
	line-height: 1;
	color: #969696;
	text-align: center;
	padding: 10px 20px;
	position: relative;
	z-index: 2;
	cursor: pointer;
	display: inline-block;
	transition: color 250ms ease-in-out;
	user-select: none; 
}

.active{
	color: #ffffff !important;
}

.tab-slider--body{
	margin-bottom: 20px;
}
</style>