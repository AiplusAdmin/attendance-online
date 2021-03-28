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
			
			<div v-if="currentGroup.klass == '0' || currentGroup.klass == '1' || currentGroup.klass == '2' || currentGroup.klass == '3'">
				<div v-for="(comment,index) in commentsN" :key="index">
					<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">{{comment.block + '. ' + comment.title}}</span><br/>
					<v-divider class="my-4"></v-divider>
					<p v-for="com in comment.comments" :key="com.value">
						<span class="font-weight-bold grey--text text--darken-3">{{com.value}}</span> : <span class="grey--text text--darken-2">{{com.text}}</span>
					</p>
				</div>
			</div>
			<div v-else>
				<div v-for="(comment,index) in comments" :key="index">
					<span class="text-subtitle-2 font-weight-bold grey--text text--darken-2">{{comment.block + '. ' + comment.title}}</span><br/>
					<v-divider class="my-4"></v-divider>
					<p v-for="com in comment.comments" :key="com.value">
						<span class="font-weight-bold grey--text text--darken-3">{{com.value}}</span> : <span class="grey--text text--darken-2">{{com.text}}</span>
					</p>
				</div>
			</div> 
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
		},
		commentsN(){
			return this.$store.state.commentsN;
		},
		currentGroup(){
			return this.$store.state.currentGroup;
		}
	}
  }
</script>
<style scoped>
	.information{
		text-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>