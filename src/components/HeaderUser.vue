<script>
import authService from "@/services/auth/auth.service";

export default {
  name: "HeaderUser",
  data(){
    return {
      username: localStorage.getItem('name')
    }
  },
  methods:{
    logout(){
      authService.logout() ? this.$router.push('/login') : console.log('Error Navbar logout')
    }
  },
  async mounted() {
    try {
      let userData = await authService.me()
      localStorage.setItem('name', userData.name)
      this.username = userData.name
    } catch (e){
      console.log(e)
      authService.logout()
    }
  }
}
</script>

<template>
  <Menubar style="margin-bottom: 20px;">
    <template #start>
      <div class="d-flex gap-2">
        <router-link to="/user">
          <Button type="button" class="p-button-success">Store</Button>
        </router-link>
        <router-link to="/user/cart">
          <Button type="button" class="p-button-info">Корзина</Button>
        </router-link>
        <router-link to="/user/users">
          <Button type="button" class="p-button-info">Пользователи</Button>
        </router-link>
        <router-link to="/admin/categories">
          <Button type="button" class="p-button-info">Категорий</Button>
        </router-link>
        <router-link to="/admin/admin-products">
          <Button type="button" class="p-button-info">Товары</Button>
        </router-link>
      </div>
    </template>
    <template v-if="$route.name !== 'login' && $route.name !== 'register'" #end>
      <div v-if="username">
        <router-link to="/user/profile">
              <span class="navbar-text me-2" style="font-size: 18px">
                {{ username }}
              </span>
        </router-link>
        <Button @click="logout" type="button" class="p-button-danger">Выйти</Button>
      </div>
      <div v-else>
        <Button @click="logout" type="button" class="p-button-primary">Войти</Button>
      </div>
    </template>
  </Menubar>
</template>

<style scoped>
</style>