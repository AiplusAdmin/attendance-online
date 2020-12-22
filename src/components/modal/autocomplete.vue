<template>
	<div>
		<v-text-field
		v-model="search"
		label="ФИО ученика"
		color="#fbab17"
		:loading="isLoading"
		@input="onChange"
		:append-outer-icon="newStudent.icon" @click:append-outer="remove"
		clearable
		dense
		rounded
		outlined
		hide-details
		></v-text-field>
		<v-card
			class="mx-auto"
			max-width="400"
			tile
		>
			<v-list v-if="isLoading" dense>
				<v-list-item-group>
					<v-list-item v-for="(item, i) in items" :key="i" selectable @click="selecStudent(item)">
						<v-list-item-content>
							<v-list-item-title >{{item.FullName}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card>
	</div>
</template>

<script>
import validations from '@/utils/validations'
export default {
	name: 'autocomplete',
	props:{
		newStudent: Object,
		index: Number
	},
    data() {
      return {
		search: '',
		items: [],
		isLoading: false,
		value: null,
		...validations
      }
    },
    methods: {
		async onChange() {
			this.isLoading = true;
			this.items = await this.$store.dispatch('SearchStudent',{value:this.search,group: this.$store.state.currentGroup.name});
		},
		selecStudent(value){
			this.search = value.FullName;
			this.newStudent.value = value;
			this.isLoading = false;
		},
		remove(){
			this.$store.dispatch('RemoveNewStudent',this.index);
		}
    }
}
</script>

<style scoped>
	.autocomplete-results {
		padding: 0;
		margin: 0;
		border: 1px solid #eeeeee;
		height: 120px;
		overflow: auto;
	}

	.autocomplete-result {
		list-style: none;
		text-align: left;
		padding: 4px 2px;
		cursor: pointer;
	}

	.autocomplete-result:hover {
		background-color: #4AAE9B;
		color: white;
	}
</style>