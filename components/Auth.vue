<script setup lang="ts">
const username = ref('')
const password = ref('')
const email = ref('')
const error = ref('')
const store = useTasksStore()
async function login() {
  try {
    // Отправить запрос на сервер для аутентификации
    // Здесь вы можете использовать Axios или другую библиотеку для выполнения HTTP-запросов
    // Пример: const response = await axios.post('/api/login', { username: this.username, password: this.password });
    // После успешной аутентификации можно выполнить какие-то действия, например, перенаправить пользователя на другую страницу
    // Пример: this.$router.push('/dashboard');
  } catch (e) {
    // Обработка ошибок аутентификации
    error.value = 'Ошибка при входе: неверное имя пользователя или пароль'
    console.error('Ошибка при входе:', e)
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="store.registerUser(username, password, email)">
      <div class="field-container">
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="field-container">
        <label for="email">Почта:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="field-container">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
</style>
