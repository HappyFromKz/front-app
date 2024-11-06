<script>
import httpClient from "@/services/http.service";

export default {
  name: "UsersList",
  data(){
    return{
      users: [],
    }
  },
  methods:{
    async getUsers(){
        try {
          const {data, status} = await httpClient.get('users');
          if (status == 200) {
            this.users = data.data
          }
        } catch (e) {
          console.log(e)
        }
    }
  },
  async mounted() {
    await this.getUsers()
  }
}
</script>

<template>
  <div class="container">
    <h4>Пользователи</h4>
    <div class="row">
      <div class="col-md-4" v-for="user in users" :key="user.id">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text">{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>

</style>