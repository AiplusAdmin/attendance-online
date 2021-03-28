<template>
	<v-container>
		<v-form v-model="valid"  ref="form">
			<v-row class="d-flex flex-row primary" align="center">
				<v-col>
					<router-link class=" orange--text text-decoration-none" :to="`/teacher/${currentTeacher.Id}`" v-text="'Изменить группу'"><v-icon color="#fbab17">mdi-chevron-left</v-icon></router-link>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
			<v-divider></v-divider>
			<v-row align="center">		
				<v-col cols = "6" lg="6" class="currentTeacher primary">
					<v-list class="primary">
						<v-subheader class="px-0 font-weight-bold grey--text text--darken-2">Тренер</v-subheader>
						<v-list-item inactive class="teacher-rounded">
							<v-list-item-content>
								<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="currentTeacher.LastName"></v-list-item-title>
								<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="currentTeacher.FirstName"></v-list-item-title>	
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col v-if="currentGroup.change" cols = "6" lg="6" class="currentTeacher primary">
					<v-list class="primary">
						<v-subheader class="px-0 font-weight-bold  grey--text text--darken-2">Заменяю</v-subheader>
						<v-list-item inactive class="teacher-rounded">
							<v-list-item-content>
								<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="subTeacher.LastName"></v-list-item-title>
								<v-list-item-title class="text-h6 grey--text text--darken-1" v-text="subTeacher.FirstName"></v-list-item-title>	
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col v-else class="d-flex align-self-stretch primary">
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row>
				<v-col class="px-0 py-0" cols = "12">
					<v-list subheader flat class="primary">
					<v-list-item-group>
							<v-list-item inactive>
								<v-list-item-content class="pb-0">
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Группа</v-list-item-title>
								</v-list-item-content>
								<v-list-item-content class="pb-0">
									<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.name"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item inactive>
								<v-list-item-content class="pb-0">
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Дни обучения</v-list-item-title>
								</v-list-item-content>
								<v-list-item-content class="pb-0">
									<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.days"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item inactive>
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Время</v-list-item-title>
								</v-list-item-content>
								<v-list-item-content>
									<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.time"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item inactive>
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Предмет</v-list-item-title>
								</v-list-item-content>
								<v-list-item-content>
									<v-list-item-title class="grey--text text--darken-1 text-right" v-text="currentGroup.subject"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item inactive>
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Отделение</v-list-item-title>
								</v-list-item-content>
								<v-list-item-content>
									<v-list-item-title v-if="currentGroup.branch == 'РО'" class="grey--text text--darken-1 text-right" v-text="'Русское'"></v-list-item-title>
									<v-list-item-title v-else class="grey--text text--darken-1 text-right" v-text="'Казахское'"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item inactive>
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Ученики</v-list-item-title>
								</v-list-item-content>
								<v-list-item-content>
									<v-list-item-title class="grey--text text--darken-1 text-right" v-text="groupStudents.length"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item inactive>
								<v-col cols="9" class="pa-0">
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Уровень группы</v-list-item-title>
								</v-list-item-content>
								</v-col>
								<v-col cols="3" class="pa-0">
								<v-list-item-content>
										<v-select
											v-model="extraparams.level"
											:items="srezLevel"
											color="#fbab17"
											flat dense hide-details
											:rules="[required('Уровень среза')]" required>
											>
										</v-select>
								</v-list-item-content>
								</v-col>
							</v-list-item>
							<v-list-item inactive>
								<v-col cols="9" class="pa-0">
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Кабинет</v-list-item-title>
								</v-list-item-content>
								</v-col>
								<v-col cols="3" class="pa-0">
								<v-list-item-content>
									<v-select
										v-model="extraparams.room"
										:items="groupRooms"
										item-text="Room"
										color="#fbab17"
										return-object
										flat dense hide-details
										:rules="[requiredObject('Кабинет')]" required>
										>
									</v-select>
								</v-list-item-content>
								</v-col>
							</v-list-item>
							<v-list-item inactive v-if="currentGroup.symbol == 'E' && (currentGroup.klass == '5' || currentGroup.klass == '7' || currentGroup.klass == '4')">
								<v-col cols="9" class="pa-0">
								<v-list-item-content>
									<v-list-item-title class="font-weight-bold grey--text text--darken-2">Уровень</v-list-item-title>
								</v-list-item-content>
								</v-col>
								<v-col cols="3" class="pa-0">
								<v-list-item-content>
									<v-select
										v-model="engLevel"
										:items="levels"
										item-text="Name"
										color="#fbab17"
										@change="SelectEngLevel"
										return-object
										flat dense hide-details
										:rules="[requiredObject('Уровень')]" required>
										>
									</v-select>
								</v-list-item-content>
								</v-col>
							</v-list-item>
							<v-list-item class="py-2" inactive v-if="(currentGroup.klass == '5' || currentGroup.klass == '7' || currentGroup.klass == '6' || currentGroup.klass == '4') && currentGroup.symbol =='M'">
								<v-col cols="9" class="pa-0">
									<v-list-item-content>
										<v-list-item-title class="font-weight-bold grey--text text--darken-2">Дисциплина</v-list-item-title>
									</v-list-item-content>
								</v-col>
								<v-col cols="3" class="pa-0">
									<v-list-item-content>
										<v-select
											v-model="theme"
											:items="themes"
											color="#fbab17"
											@change="SelectTheme"
											flat dense hide-details
											:rules="[requiredObject('Предмет тем')]" required>
											>
										</v-select>
									</v-list-item-content>
								</v-col>
							</v-list-item>
							<v-list-item class="py-2" inactive v-if="currentGroup.klass == '5' || currentGroup.klass == '7' || currentGroup.klass == '6' || currentGroup.klass == '4'">
								<v-col cols="9" class="pa-0">
									<v-list-item-content>
										<v-list-item-title class="font-weight-bold grey--text text--darken-2">Тема</v-list-item-title>
									</v-list-item-content>
								</v-col>
								<v-col v-if="isMobile" cols="3" class="pa-0">
									<v-dialog
										ref="topicMenu"
										v-model="topicModal"
										width="290px"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="topicName"
												placeholder="Темы"
												color="#fbab17"
												flat dense
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-card
											class="mx-auto"
											max-width="300"
											tile
										>
											<v-list dense>
												<v-subheader>
													<v-list-item inactive>
														<v-list-item-content>
															<v-list-item-title class="grey--text text--darken-3 font-weight-bold text-subtitle-1">Темы</v-list-item-title>
														</v-list-item-content>
														<v-list-item-action>
															<v-icon @click="closeThemeModal" color="#fbab17">mdi-close-thick</v-icon>
														</v-list-item-action>
													</v-list-item>
												</v-subheader>
												<v-list-item-group>
													<v-list-item v-for="topic in topics" :key="topic.Id" @click="SetTopic(topic)">
														<v-list-item-content>
															<v-list-item-title >{{topic.Name}}</v-list-item-title>
														</v-list-item-content>
													</v-list-item>
												</v-list-item-group>
											</v-list>
										</v-card>
									</v-dialog>
								</v-col>
								<v-col v-else cols="3" class="pa-0">
									<v-list-item-content>
										<v-select
											v-model="topic"
											:items="topics"
											item-text="Name"
											color="#fbab17"
											return-object
											flat dense hide-details
											:rules="[requiredObject('Тема')]" required>
											>
										</v-select>
									</v-list-item-content>
								</v-col>
							</v-list-item>
						</v-list-item-group>
						</v-list>
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<v-row>
				<v-col cols="12" class="pa-0">
					<div class="pa-4 text-h5 orange--text primary" v-text="'Список учеников'"></div>
				</v-col>
			</v-row>
			<v-row>
				<v-col v-if="!isMobile" class="pa-0" cols="12" lg="12" >
					<v-data-table  class='studentsTable'
							:value = "groupStudents"
							:headers = "headers"
							:items = "groupStudents"
							item-key = "clientid"
							:loading="isLoading"
							loading-text = "Загрузка... Пожалуйста подождите"
							no-data-text = "Нет учеников"
							hide-default-footer
							disable-pagination
						>
							<template v-slot:top>
								<v-toolbar flat>
									<v-toolbar-title>Срез не писали</v-toolbar-title>
									<v-spacer></v-spacer>
									<v-switch v-model="srez" class="mt-5" color="#fbab17"></v-switch>
								</v-toolbar>
								<v-toolbar flat>
									<v-toolbar-title>Воскресный тест</v-toolbar-title>
									<v-spacer></v-spacer>
									<v-switch v-model="foskres" class="mt-5" color="#fbab17"></v-switch>
								</v-toolbar>
								<v-toolbar flat>
									<v-toolbar-title>Количественные характеристики</v-toolbar-title>
									<v-spacer></v-spacer>
									<v-switch v-model="kolhar" class="mt-5" color="#fbab17"></v-switch>
								</v-toolbar>
							</template>
							<template v-slot:[`item.index`]="{ item }" >
								<p>{{groupStudents.indexOf(item) + 1}}</p>
							</template>
							<template v-slot:[`item.name`]="{ item }" >
								<p >{{item.name}}</p>
							</template>
							<template  v-slot:[`item.attendence`]="{ item }">
								<v-checkbox v-model="item.attendence" color="#fbab17"></v-checkbox>
							</template>
							<template v-slot:[`item.homework`]="{ item }">
								<v-select    v-show="item.attendence"
									v-model="item.homework" 
									:disabled="!item.attendence"
									:items="homeworks"
									item-text="text"
									item-value="value"
									color="#fbab17"
									hide-selected
									item-color='#fbab17'
									:rules="[requiredNumber('Д/з',item.attendence)]" required>
								</v-select>
							</template>
							<template  v-slot:[`item.kolhar`]="{ item }">
								<v-text-field v-model="item.kolhar" v-show="item.attendence && kolhar"
									type="number" 
									:disabled="!item.attendence" 
									min="0" max="100"
									color="#fbab17"
									:rules="[requiredNumber('Кол. хар',item.attendence && kolhar), numberBetween('кол. хар',item.attendence && kolhar)]" required>
								</v-text-field>
							</template>
							<template  v-slot:[`item.foskres`]="{ item }">
								<v-text-field v-model="item.foskres" v-show="item.attendence && foskres"
									type="number" 
									:disabled="!item.attendence" 
									min="0" max="100"
									color="#fbab17"
									:rules="[requiredNumber('воскрес',item.attendence && foskres), numberBetween('воскрес',item.attendence && foskres)]" required>
								</v-text-field>
							</template>
							<template v-slot:[`item.test`]="{ item }">
								<v-select  v-show="item.attendence"
									v-model="item.test" 
									:disabled="!item.attendence"
									:items="tests"
									item-text="text"
									item-value="value"
									item-color='#fbab17'
									color="#fbab17"
									:rules="[requiredNumber('Срез',item.attendence)]" required>
								</v-select>
							</template>
							<template  v-slot:[`item.lesson`]="{ item }">
								<v-text-field v-model="item.lesson" v-show="item.attendence"
									type="number" 
									:disabled="!item.attendence" 
									min="0" max="100"
									color="#fbab17"
									:rules="[requiredNumber('Активность',item.attendence), numberBetween('Активность',item.attendence)]" required>
								</v-text-field>
							</template>
							<template v-slot:[`item.comment`]="{ item }">
								<v-select v-show="item.attendence"
									v-model="item.comment"
									:items="comments"
									item-text="value"
									item-value="text"
									color="#fbab17"
									:disabled="!item.attendence"
									item-color='#fbab17'
									label="Комментарии"
									multiple
								>
								</v-select>
							</template>
					</v-data-table>
				</v-col>
				<v-col v-else>
						<v-toolbar flat>
							<v-toolbar-title>Срез не писали</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-switch v-model="srez" class="mt-5" color="#fbab17"></v-switch>
						</v-toolbar>
						<v-toolbar flat>
							<v-toolbar-title>Воскресный тест</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-switch v-model="foskres" class="mt-5" color="#fbab17"></v-switch>
						</v-toolbar>
						<v-toolbar flat>
							<v-toolbar-title>Кол. хар.</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-switch v-model="kolhar" class="mt-5" color="#fbab17"></v-switch>
						</v-toolbar>
						<v-card  class="rounded-card my-4 mx-2" elevation="5" v-for="(student,index) in groupStudents" :key="index">
							<v-list class = "pa-0" shaped flat :class="student.delete?'grey lighten-2':'white'">
								<v-subheader :class="student.loyalty==0?'loyalty_bad':student.loyalty==2?'loyalty_good':student.loyalty==1?'loyalty_norm':''">
									<v-list-item class="px-0"
											:key="`name-${student.clientid}`"
											inactive
										>
											<v-list-item-content>
												<v-list-item-title :class="student.loyalty != undefined?'white--text font-weight-bold text-subtitle-1':'grey--text text--darken-3 font-weight-bold text-subtitle-1'">{{student.name}}</v-list-item-title>
											</v-list-item-content>
											<v-list-item-action>
													<v-icon @click="RemoveStudent(index)" :color="student.loyalty != undefined?'#ffffff':'#fbab17'">{{student.icon}}</v-icon>
											</v-list-item-action>
									</v-list-item>
								</v-subheader>
								<v-subheader>
									<v-list-item class="px-0"
											v-if="student.lessonleft"
											:key="`lessonleft-${student.clientid}`"
											inactive
										>
											<v-list-item-content>
												<v-list-item-title :class="'grey--text text--darken-1 font-weight-bold text-subtitle-1'" v-text="'Осталось уроков'"></v-list-item-title>
											</v-list-item-content>
											<v-list-item-action class="pt-5 ">
												<p class="text-right grey--text text--darken-2 font-weight-bold text-subtitle-1">{{student.lessonleft}}</p>
											</v-list-item-action>
									</v-list-item>
								</v-subheader>
								<v-list-item-group>
									<v-list-item>
										<v-list-item-content>
											<v-list-item-subtitle>
												<v-chip-group active-class="">
													<v-chip :class="dynamic.class+' chis pa-4 text-subtitle-1'"  large text-color="black"  v-for="dynamic in student.dynamics" :key="dynamic.Value">
														{{ dynamic.Name}}
														<!--<v-icon :color="dynamic.iconcolor" large>{{dynamic.progress}}</v-icon>
														{{ dynamic.Value}}-->
													</v-chip>
												</v-chip-group>
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
								<v-divider></v-divider>
									<v-list-item-group>
										<v-list-item
											v-show="!student.delete"
											:key="index"
											:value="index"
											inactive
										>
											<v-list-item-content>
												<v-list-item-title class="grey--text text--darken-3">№</v-list-item-title>
											</v-list-item-content>
											<v-list-item-content>
												<v-list-item-title class="text-right" v-text="index+1"></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
										<v-list-item
											v-show="!student.delete"
											:key="`attendence-${student.clientid}`"
											:value="student.attendence"
											inactive
										>
											<template v-slot:default="{ active }">
												<v-list-item-content>
													<v-list-item-title class="grey--text text--darken-3">Присутствовал</v-list-item-title>
												</v-list-item-content>
												<v-list-item-action>
													<v-checkbox
														v-model="student.attendence"
														:input-value="active"
														color="#fbab17"
													></v-checkbox>
												</v-list-item-action>
											</template>
										</v-list-item>
										<v-list-item
											v-show="student.attendence && currentGroup.klass == '6'"
											:key="`iswatch-${student.clientid}`"
											:value="student.attendence"
											inactive
										>
											<template v-slot:default="{ active }">
												<v-list-item-content>
													<v-list-item-title class="grey--text text--darken-3">Смотрел разбор</v-list-item-title>
												</v-list-item-content>
												<v-list-item-action>
													<v-checkbox
														v-model="student.iswatched"
														:input-value="active"
														color="#fbab17"
													></v-checkbox>
												</v-list-item-action>
											</template>
										</v-list-item>
										<v-list-item
											v-show="student.attendence && kolhar"
											:key="`kolhar-${student.clientid}`"
											:value="student.homework"
											class="pr-0"
											inactive>
											<v-row class="align-center">
												<v-col cols='9' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3">Колличественные характеристики</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col cols='3' class="py-0">
													<v-list-item-action class="mr-2">
														<v-text-field 
															v-model="student.kolhar"
															type="number" 
															min="0" max="60"
															color="#fbab17"
															item-color='#fbab17'
															:rules="[requiredNumber('Кол. хар.',student.attendence && kolhar), numberBetween('Кол. хар.',student.attendence && kolhar)]" required>
														</v-text-field>
													</v-list-item-action>
												</v-col>
											</v-row>
										</v-list-item>
										<v-list-item
											v-show="student.attendence && foskres"
											:key="`foskres-${student.clientid}`"
											:value="student.homework"
											class="pr-0"
											inactive>
											<v-row class="align-center">
												<v-col cols='9' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3">Воскресный тест</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col cols='3' class="pa-0">
													<v-list-item-action class="mr-2">
														<v-text-field 
															v-model="student.foskres"
															type="number" 
															min="0" max="100"
															color="#fbab17"
															item-color='#fbab17'
															:rules="[requiredNumber('Воскрес. тест',student.attendence && foskres), numberBetween('Воскрес. тест',student.attendence && foskres)]" required>
														</v-text-field>
													</v-list-item-action>
												</v-col>
											</v-row>
										</v-list-item>
										<v-list-item
											v-show="student.attendence"
											:key="`homework-${student.clientid}`"
											:value="student.homework"
											class="pr-0"
											inactive>
											<v-row class="align-center">
												<v-col cols='7' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3">Д/з</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col cols='5' class="pa-0">
													<v-list-item-action class="mr-7">
														<v-select
															v-model="student.homework"
															:items="homeworks"
															item-text="text"
															item-value="value"
															color="#fbab17"
															item-color="#fbab17"
															hide-selected
															:rules="[requiredNumber('Д/з',student.attendence)]" required>
														</v-select>
													</v-list-item-action>
												</v-col>
											</v-row>
										</v-list-item>
										<v-list-item
											v-show="student.attendence"
											:key="`test-${student.clientid}`"
											:value="student.test"
											class="pr-0"
											inactive
										>
											<v-row class="align-center">
												<v-col cols='5' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3">Срез</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col cols='7' class="pa-0">
													<v-list-item-action class="mr-7">
														<v-select
															v-model="student.test"
															:items="tests"
															item-text="text"
															item-value="value"
															color="#fbab17"
															item-color='#fbab17'
															hide-selected
															:rules="[requiredNumber('Д/з',student.attendence)]" required>
														</v-select>
													</v-list-item-action>
												</v-col>
											</v-row>
										</v-list-item>
										<v-list-item
											v-show="student.attendence"
											:key="`lesson-${student.clientid}`"
											:value="student.lesson"
											class="pr-0"
											inactive
										>
											<v-row class="align-center">
												<v-col cols='7' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3">Активность</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-spacer></v-spacer>
												<v-col cols='3' class="pa-0">
													<v-list-item-action class="mr-2">
														<v-text-field 
															v-model="student.lesson"
															type="number" 
															min="0" max="100"
															color="#fbab17"
															item-color='#fbab17'
															:rules="[requiredNumber('Активность',student.attendence), numberBetween('Активность',student.attendence)]" required>
														</v-text-field>
													</v-list-item-action>
												</v-col>
											</v-row>
										</v-list-item>
										<v-list-item
											v-show="student.attendence"
											:key="`comment-${student.clientid}`"
											:value="student.comment"
											class="pr-0"
											inactive
										>
											<v-row class="align-center">
												<v-col cols='7' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3">Комментарии</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col  cols='5' class="pa-0" v-if="currentGroup.klass == '0' || currentGroup.klass == '1' || currentGroup.klass == '2' || currentGroup.klass == '3'">
													<v-list-item-action>
														<v-select
															v-model="student.comment"
															:items="commentsN"
															item-text="value"
															item-value="text"
															color="#fbab17"
															item-color='#fbab17'
															clearable
															placeholder="Комментарии"
															multiple>
														</v-select>
													</v-list-item-action>
												</v-col>
												<v-col v-else cols='5' class="pa-0">
													<v-list-item-action>
														<v-select
															v-model="student.comment"
															:items="comments"
															item-text="value"
															item-value="text"
															color="#fbab17"
															item-color='#fbab17'
															clearable
															placeholder="Комментарии"
															multiple>
														</v-select>
													</v-list-item-action>
												</v-col>
											</v-row>
										</v-list-item>
										<v-divider v-if="student.mentor"></v-divider>
										<v-list-item
											v-if="student.mentor"
											v-show="student.attendence"
											:key="`mentor-${student.clientid}`"
											:value="student.comment"
											class="pl-0 pr-3"
											inactive
										>
												<v-col cols='8' class="py-0">
													<v-list-item-content>
														<v-list-item-title class="grey--text text--darken-3 font-weight-bold">Ответственный</v-list-item-title>
														<v-list-item-title class="grey--text text--darken-3">{{student.mentor}}</v-list-item-title>
													</v-list-item-content>
												</v-col>
												<v-col cols='2' class="pa-0">
													<v-list-item-action>
														<v-btn class="btnwhatsapp pa-6" icon large :href="`https://wa.me/${student.tel}?text=${student.text}`">
															<v-icon  class="iconphone" size="32" >mdi-whatsapp</v-icon>
														</v-btn>
													</v-list-item-action>
												</v-col>
												<v-col cols='2' class="pa-0">
													<v-list-item-action>
														<v-btn class="btntel pa-6" large icon :href="`tel:${student.tel}`">
															<v-icon  class="iconphone" size="26" >mdi-phone</v-icon>
														</v-btn>
													</v-list-item-action>
												</v-col>
										</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-card>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-divider color="black"></v-divider>
				</v-col>
			</v-row>
		<!--	<v-row v-if="currentGroup.symbol == 'M'">
				<v-col class="py-0 px-2">
					<v-select
						v-model="homework.level"
						:items="homeWorkLevels"
						color="#fbab17"
						item-color='#fbab17'
						background-color='white'
						clearable
						placeholder="Уровень домашки"
						multiple rounded outlined flat dense hide-details>
					</v-select>
				</v-col>
			</v-row>
			<v-row>
				<v-col class="py-0">
					<v-textarea
						class="pt-0"
						v-model="homework.text"
						label="Домашнее задание"
						color="#fbab17"
						background-color="white"
						rows="3"
						clearable counter
					></v-textarea>
				</v-col>
			</v-row>-->
			<v-row>
				<v-col cols="12" lg="4" class="px-0">
					<v-btn class="rounded-btn white--text"  height="50" :loading="click" @click="setAttendence" block rounded>Отправить</v-btn>
				</v-col>
			</v-row>
		</v-form>
		<v-speed-dial
			bottom
			right
			fixed
		>
			<template v-slot:activator>
				<AddStudent/>
			</template>
		</v-speed-dial>
		<v-speed-dial
			class="ml-1"
			bottom
			left
			fixed
		>
			<template v-slot:activator>
				<InfoComment />
			</template>
		</v-speed-dial>
				
		<InfoModal :dialog="dialog" :message="messageModal" :path="path"/>
		<Check :checkdialog ="checkdialog" :code="code"/>
		<Loading :overlay="overlay"/>
		<v-snackbar
			text
			color="black"
			v-model="snackbar"
			:timeout="timeout"
			top>
			<v-icon class="shadow-icon pl-2">mdi-email</v-icon>
			{{snackbarMessage}}
		</v-snackbar>
	</v-container>
</template>

<script>
import AddStudent from '@/components/modal/Add'
import InfoModal from '@/components/modal/Info'
import validations from '@/utils/validations'
import InfoComment from '@/components/modal/InfoComment'
import Check from '@/components/modal/Check'
import Loading from '@/components/modal/Loading'

export default {
    name: 'AttendenceForm',
	components: {
		AddStudent,
		InfoModal,
		InfoComment,
		Check,
		Loading
	},
    data (){
		return {
			valid: true,
			headers : [
				{
					text : '№',
					value : 'index',
					sortable: false
				},
				{
					text : 'ФИО ребенка',
					value : 'name',
				},
				{
					text : 'Присутствовал',
					value : 'attendence',
				},
				{
					text : 'Кол. хар.',
					value: 'kolhar',
					sortable: false
				},
				{
					text : 'Тест',
					value: 'foskres',
					sortable: false
				},
				{ 
					text : 'Д/з',
					value: 'homework',
					sortable: false
				},
				{ 
					text : 'Срез',
					value: 'test',
					sortable: false
				},
				{
					text : 'Активность',
					value : 'lesson',
					sortable: false

				},
				{
					text : 'Комментарии',
					value : 'comment',
					sortable: false
				}
			],
			extraparams:{
				room: null,
				level: null
			},
			groupRooms:[],
			isLoading: true,
			dialog: false,
			checkdialog: false,
			srez: false,
			foskres: false,
			kolhar: false,
			code:null,
			messageModal: '',
			path: null,
			click: false,
			isMobile: false,
			...validations,
			overlay: false,
			engLevel: null,
			topic: null,
			topicModal: false,
			topicMenu: false,
			topicName: null,
		/*	homework: {
				level: null,
				text: null
			},*/
			snackbar:false,
			timeout: 8000,
			snackbarMessage: null,
			theme: 'Математика',
			themes:['Математика','Логика']
		}
	},
	computed : {
		currentGroup(){
			return this.$store.state.currentGroup;
		},
		currentTeacher(){
			return this.$store.state.currentTeacher;
		},
		subTeacher(){
			return this.$store.state.subTeacher;
		},
		homeworks(){
			return this.$store.state.homeworks;
		},
		tests(){
			return this.$store.state.tests;
		},
		groupStudents(){
			var teacher = this.currentTeacher.LastName+'%20'+this.currentTeacher.FirstName;
			var klass = this.currentGroup.klass;
			var subject = this.currentGroup.subject;
			var group = this.currentGroup.name;
			this.$store.state.groupStudents.map((student) => {
				if(student.text){
					student.text = student.text.replace('[тренер]',teacher);
					student.text = student.text.replace('[ученик]',student.name);
					student.text = student.text.replace('[класс]',klass);
					student.text = student.text.replace('[пердмет]',subject);
					student.text = student.text.replace('[группа]',group);
				}
			});

			return this.$store.state.groupStudents;
		},
		equal(){
			return this.$store.state.equal;
		},
		comments(){
			var comments = [];
			this.$store.state.comments.map(el => comments = comments.concat(el.comments));
			return comments;
		},
		commentsN(){	
			var commentsN = [];
			this.$store.state.commentsN.map(el => commentsN = commentsN.concat(el.comments));
			return commentsN;
		},
		srezLevel(){
			return this.$store.state.srezLevel;
		},
		levels(){
			return this.$store.state.levels;
		},
		topics(){
			return this.$store.state.topics;
		},
		homeWorkLevels(){
			return this.$store.state.homeWorkLevels;
		}
	},
	beforeCreate(){
		var user = window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):{};
		if ((Object.keys(user).length === 0 && user.constructor === Object)){
			this.$router.push('/');
		}
		var group = window.localStorage.currentGroup?JSON.parse(window.localStorage.currentGroup):{};
		if((Object.keys(group).length === 0 && group.constructor === Object)){
			this.$router.push('/teacher');
		}
	},
	async mounted(){
		this.onResize();
		this.$store.dispatch('SetLevels');
		this.GetOfficeRooms(this.currentGroup);
		this.SelectEngLevel();

		if(!localStorage.groupStudents || JSON.parse(localStorage.groupStudents).length == 0){
			this.overlay = true;
			var response = await this.$store.dispatch('GetStudents',{groupId : this.currentGroup.Id,inweek: this.currentGroup.inweek, date: this.currentGroup.date,teacherId: this.currentTeacher.Id});
			this.overlay = false;
			if(response.status == 200){
				this.SortStudent();
				this.isLoading = false;
				var res = await this.$store.dispatch('GetLastLessonRoom', { groupId: this.currentGroup.Id});
				console.log(res);
				if(res.status == 200){
					this.extraparams.room = res.data.room;
					this.extraparams.level = res.data.level;
				}
			}
			else if(response.status==400 || response.status==401){
				this.messageModal = 'Ваше время в системе истекло перезайдите';
				this.path = '/';
				this.dialog = true;
			}

			if(this.currentGroup.change)
				this.$store.dispatch('ResetEqual',false);
		} else {
			this.SortStudent();
			this.isLoading = false;
			var r = await this.$store.dispatch('GetLastLessonRoom', { groupId: this.currentGroup.Id});
			console.log(r);
			if(r.status == 200){
				this.extraparams.room = r.data.room;
				this.extraparams.level = r.data.level;
			}
			
		}
	},
	created(){
		if(localStorage.currentGroup)
			this.$store.state.currentGroup = JSON.parse(localStorage.currentGroup);
		if(localStorage.currentTeacher)
			this.$store.state.currentTeacher = JSON.parse(localStorage.currentTeacher);
		if(localStorage.groupStudents)
			this.$store.state.groupStudents = JSON.parse(localStorage.groupStudents);
		if(localStorage.subTeacher)
			this.$store.state.subTeacher = JSON.parse(localStorage.subTeacher);
	},
	methods : {
		async setAttendence(){
			if(!this.valid){
				this.$refs.form.validate();
				this.ScrollToError(this.$refs.form.errorBag);
			}
			if(this.valid){
				if(!this.click){
					this.click = true;
					if(this.currentGroup.change && !this.equal){
						var code = await this.$store.dispatch('GetCode',{Id: this.subTeacher.Id});
						this.snackbarMessage = `Ваш код ${code.data}`;
						this.snackbar = true;
						this.click = false;
						if(code.status == 200){
							this.code = code.data;
							this.checkdialog = true;
						}else if(code.status == 400 || code.status == 401){
							this.$router.push('/');
						}
					}else if(this.equal){
						var total = 0;
						this.groupStudents.map(function(student){
							if(student.attendence){
								if(student.aibaks == 0){
									if(student.homework >3 && student.homework <= 7)
										student.aibaks+=1;
									else if(student.homework >7 && student.homework <= 10)
										student.aibaks+=2;
									if(student.lesson > 50 && student.lesson <= 100)
										student.aibaks+=1;
								}
								total+=student.aibaks;
							}
						});
						this.$store.dispatch('SetExtraFieldsGroup',{params: this.extraparams});
						this.overlay = true;
						var response = await this.$store.dispatch('SetAttendence',{group: this.currentGroup, students: this.groupStudents, teacherId: this.$store.state.currentTeacher.Id, teacherName: this.$store.state.currentTeacher.LastName + ' ' + this.$store.state.currentTeacher.FirstName,Aibucks: total,topic: this.topic, homework: this.homework,foskres: this.foskres, kolhar: this.kolhar});
						this.overlay = false;
						if(response.status == 200){
							this.messageModal = `Успешно добавлен.\n Количество Айбаксов - ${total}.\nПроверьте ЖУРНАЛ пожалуйста`;
							this.path = '/journal';
							this.click = false;
							this.dialog = true;
						} else if(response.status == 500){
							this.messageModal = `Обновите и попробуйте еще раз либо перезайдите`;
							this.path = null;
							this.click = false;
							this.dialog = true;
						}else if(response.status == 401 || response.status == 400){
							this.messageModal = response.text;
							this.path = '/';
							this.click = false;
							this.dialog = true;
						} else if(response.status == 410){
							this.messageModal = response.text;
							this.path = '/journal';
							this.click = false;
							this.dialog = true;
						}
					}
				}
			}
		},
		ScrollTop(){
			window.scrollTo(0, 0); 
		},
		ScrollToError(obj){
			var keys = Object.keys(obj);
			var errors = [];
			keys.map(function(key){
				if(obj[key] == true)
					errors.push({id:key,value:obj[key]});		
			});
			var error = errors.find(elem => elem.value == true);
			var element = document.getElementById(`input-${error.id}`);			
			element.scrollIntoView({block: "center", behavior: "smooth"});
		},
		async GetOfficeRooms(group){
			this.groupRooms = await this.$store.dispatch('GetOfficeRooms',{officeId:group.officeId});
		},
		onResize(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': 
					this.isMobile = true;
					break;
				default:
					this.isMobile = false;
			}
		},
		RemoveStudent(index){
			if(this.groupStudents[index].delete){
				this.groupStudents[index].icon= 'mdi-close-thick';
				this.groupStudents[index].delete = false;
				this.SortStudent();
			}else{
				this.groupStudents[index].icon= 'mdi-pencil';
				this.groupStudents[index].delete = true;
				this.groupStudents[index].attendence = false;
				this.SortStudent();
			}
		},
		SortStudent(){
			this.groupStudents.sort(function(a,b){
				if(a.delete)
					return 1;
				if(b.delete)
					return -1;
				if(a.name > b.name)
					return 1;
				if(a.name < b.name)
					return -1;

				return 0;
			});
		},
		SelectEngLevel(){
			var level = this.engLevel ? this.engLevel.Id: null;
			this.$store.dispatch('GetTopics',{klass: this.currentGroup.klass,branch: this.currentGroup.branch,subject: this.currentGroup.subject, level: level});
		},
		SelectTheme(){
			var level = this.engLevel ? this.engLevel.Id: null;
			this.$store.dispatch('GetTopics',{klass: this.currentGroup.klass,branch: this.currentGroup.branch,subject: this.theme, level: level});
		},
		SetTopic(topic){
			this.topic = topic;
			this.topicName = topic.Name;
			this.topicModal = false;
		},
		closeThemeModal(){
			this.topicModal = false;
		}
	},
	watch:{
		groupStudents:{
			handler: function(newValues) {
				localStorage.groupStudents = JSON.stringify(newValues);
			},
			deep: true
		},
		srez:function(val){
			if(val){
				this.groupStudents.map(function(student){
					student.test = 12;
				});
			} else {
				this.groupStudents.map(function(student){
					student.test = null;
				});
			}
		}
	}
  }
</script>
<style scoped>
	.v-data-table-header{
		border-radius: 10px;
	}

	.rounded-btn{
		background-image: linear-gradient(to right,rgb(251, 171, 23) 0%,rgb(250, 191, 82) 100%);
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}

	.rounded-card{
		border-radius: 10px;
	}

	.teacher-rounded{
		border:rgba(196, 197, 197) solid 1px;
		border-radius: 10px;
	}
	
	.chis{
		border: solid 3px;
		border-radius: 120px;
	}
	
	.snacbar{
		background-color: #e0e0e0;
	}

	.shadow-icon{
		color: #fabb47 !important;
	}

	.iconphone{
		color: #ffffff !important;
	}

	.btntel{
		background-color:#5f9255;
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}

	.btnwhatsapp{
		background-color:#3CDC56;
		box-shadow: 0px 5px 5px rgba(196, 197, 197);
	}
</style>