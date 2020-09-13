<template>
	<div class="text-center">
		<v-dialog
		v-model="checkdialog"
		persistent
		width="500">
			<v-card>
				<v-card-title class="align-center justify-center headline py-10">
					Подтвердите
				</v-card-title>

				<v-card-text class="align-center justify-center text-center">
					<v-text-field v-model="checkcode">

					</v-text-field>
				</v-card-text>
			<v-divider></v-divider>

			<v-card-actions class="align-center justify-center"> 
				<v-btn
					color="orange"
					text
					@click="CloseModal">
					Подтвердить
				</v-btn>
			</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: 'InfoModel',
	props: {
		checkdialog: Boolean,
		code: Number
	},
	data () {
		return {
			checkcode: null
		}
	},
	methods:{
		CloseModal(){
			if(this.code == this.checkcode){
				this.$store.dispatch('ResetEqual',true);
				this.$parent.setAttendence();
				this.$parent.checkdialog = false;
			} else {
				alert('Ошбика не подходит');
			}
		}
	}
}
</script>