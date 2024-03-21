<script setup lang="ts">
const props = defineProps<{
  reg: boolean
}>()
const username = ref('')
const password = ref('')
const email = ref('')
const error = ref(false)
const store = useTasksStore()
function submitForm() {
  if (props.reg) {
    store.registerUser(username.value, password.value, email.value)
  } else {
    store.createUserToken(username.value, password.value)
  }
}

watch(store, () => {
  if (store.authErrorMessage) {
    error.value = true
  } else if (
    (store.regErrorMessage.username && store.regErrorMessage.username[0]) ||
    (store.regErrorMessage.password && store.regErrorMessage.password[0])
  ) {
    error.value = true
  }
})
</script>

<template>
  <div class="form-container">
    <h2>{{ props.reg ? 'Регистрация' : 'Авторизация' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="field-container">
        <label for="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          @focus="error = false"
          required
        />
      </div>
      <p v-if="error" class="error">
        {{ store.regErrorMessage.username?.join() }}
      </p>
      <div v-if="props.reg" class="field-container">
        <label for="email">Почта:</label>
        <input type="email" id="email" v-model="email" @focus="error = false" />
      </div>
      <div class="field-container">
        <label for="password">Пароль:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @focus="error = false"
          required
        />
      </div>
      <p v-if="error" class="error">
        {{ store.regErrorMessage.password?.join(' ') }}
      </p>
      <button type="submit">
        {{ props.reg ? 'Создать аккаунт' : 'Войти' }}
      </button>
    </form>
    <p v-if="error" class="error">{{ store.authErrorMessage }}</p>
    <NuxtLink to="/auth" v-if="props.reg" class="routerLink">Войти</NuxtLink>
    <NuxtLink to="/register" v-else class="routerLink">Регистрация</NuxtLink>
  </div>
</template>

<style scoped>
.form-container {
  width: 300px;
  margin: auto;
}

.field-container {
  display: flex;
  flex-direction: column;
}

input {
  width: auto;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4e5052;
  color: #fff;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
}

.routerLink {
  display: flex;
  color: green;
  width: 100%;
  justify-content: center;
  padding: 8px;
  margin-top: 10px;
}
</style>
