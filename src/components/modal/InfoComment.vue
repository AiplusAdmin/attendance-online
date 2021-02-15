<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        
			<v-btn
				color="orange mr-1"
				dark
				fab
				v-bind="attrs"
				v-on="on"
				>
					<v-icon large>mdi-information-outline</v-icon>
			</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline orange--text">Комментарии</span>
        </v-card-title>
        <v-card-text>
			<p><span class="text-h6 font-weight-bold grey--text text--darken-3">Блоки:</span></p>
			<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">A. Поведение.</span><br/>
			<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">B. Учебный процесс.</span><br/>
			<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">C. Домашнее задание.</span><br/>
			<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">E. Психологические характеристики ученика.</span><br/>
			<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">D. Общее состояние ученика во время урока.</span><br/><br/>
			
			<v-divider class="my-4"></v-divider>
			
			<p v-for="comment in comments" :key="comment.value">
				<span class="font-weight-bold grey--text text--darken-3">{{comment.value}}</span> : <span class="grey--text text--darken-2">{{comment.text}}</span>
			</p> 
		</v-card-text>
        <v-card-actions>
			<v-btn color="orange darken-1" block text @click="dialog = false">Ок</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
      }
	},
	computed:{
		comments(){
			return this.$store.state.comments;
		}
	}
  }
</script>
<style scoped>
	.information{
		text-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>