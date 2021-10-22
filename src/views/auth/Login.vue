<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-card-text>
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
                clearable
              />

              <v-text-field
                v-model="password"
                type="password"
                label="Password"
                :rules="passwordRules"
                required
                clearable
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
                Register
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    data: () => ({
      valid: true,
      password: null,
      passwordRules: [
        v => !!v || 'Password tidak boleh kosong',
      ],
      email: null,
      emailRules: [
        v => !!v || 'E-mail tidak boleh kosong',
        v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
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
      facebookLogin () {
        console.log('picek')
        axios.defaults.baseURL = 'http://localhost:8000/'
        axios.get('auth/facebook').then(() => {
          console.log('berhasil')
        }).catch(e => {
          console.log('error', e)
        })
      },
      login () {
        this.isLoading = true
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$router.push(this.$route.query.redirect || { name: 'Dashboard' })
        }).catch(err => {
          console.log(err.message)
        }).finally(() => {
          this.isLoading = false
        })
      },
    },
  }
</script>
