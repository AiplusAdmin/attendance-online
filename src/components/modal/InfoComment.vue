<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
			class="information mr-4"
			large
			color="#fbab17"
			v-bind="attrs"
			v-on="on">
				mdi-information
		</v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline orange--text">Комментарии</span>
        </v-card-title>
        <v-card-text>
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