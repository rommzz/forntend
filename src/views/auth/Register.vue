<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          />

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          />

          <v-text-field
            v-model="passwordConfirm"
            label="Password"
            type="password"
            :rules="passwordConfirmRules"
            required
          />

          <v-btn
            color="primary"
            :loading="isLoading"
            class="mr-4"
            @click="login()"
          >
            Login
          </v-btn>

          <v-btn
            color="secondary"
            class="mr-4"
            @click="router.push({ name: 'Register' })"
          >
            Login
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Register',
    data: () => ({
      valid: true,
      name: null,
      password: null,
      passwordConfirm: null,
      email: null,
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      isLoading: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      login () {
        this.isLoading = true
        axios.post('register', {
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$router.push(this.$route.query.redirect || { name: 'Dashboard' })
        }).catch((e) => {
          console.log(e)
        }).finally(() => {
          this.isLoading = false
        })
      },
    },
  }
</script>
