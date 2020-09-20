<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-icon 
			large
			color="#fbab17"
			v-bind="attrs"
			v-on="on">
				mdi-information
		</v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Комментарии</span>
        </v-card-title>
        <v-card-text>
			<p v-for="comment in comments" :key="comment.value">
				{{comment.value}} : {{comment.text}}
			</p> 
		</v-card-text>
        <v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="green darken-1" text @click="dialog = false">Ок</v-btn>
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