<script>
import authService from "@/services/auth/auth.service";
import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "RegisterPage",
  components: {HeaderUser},
  data(){
    return {
      role: localStorage.getItem('role') || '',
      form:{
        password: null,
        password_confirmation: null,
        email: '',
        last_name_doc: '',
        first_name_doc: '',
      }
    }
  },
  methods:{
    async register(event){
      event.preventDefault();
      if (this.form.password === this.form.password_confirmation){
        this.form.name = this.form.last_name_doc + ' ' + this.form.first_name_doc
        if (await authService.register(this.form)){
          if (await authService.login(this.form)){
            this.$router.push('/user')
          }
        }
      } else {
        alert("Пароли не совпадают")
      }
    }
  },
}
</script>

<template>
  <HeaderUser v-if="role !== 'admin'"/>
  <div class="container">
    <div class="w-50 mx-auto mt-5">
      <form>
        <div>
          <p class="mt-3 mb-1">Фамилия</p>
          <InputText type="text" v-model="form.last_name_doc" placeholder="Фамилия"/>
          <p class="mt-3 mb-1">Имя</p>
          <InputText type="text" v-model="form.first_name_doc" placeholder="Имя"/>
          <p class="mt-3 mb-1">Почта</p>
          <InputText type="text" v-model="form.email" placeholder="Почта"/>
          <p class="mt-3 mb-1">Пароль</p>
          <Password v-model="form.password" toggleMask placeholder="Пароль"/>
          <p class="mt-3 mb-1">Повторите пароль</p>
          <Password v-model="form.password_confirmation" toggleMask placeholder="Повторите пароль"/>
        </div>
        <Button @click="register" type="submit" style="margin-top: 20px">Зарегистрироваться</Button>
      </form>
    </div>
    <div class="mt-3">
      <span>Есть аккаунт?</span> <router-link to="/login">Войти</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>