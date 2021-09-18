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
            v-model="password"
            type="password"
            label="Password"
            :rules="passwordRules"
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
            Register
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    name: 'Login',
    data: () => ({
      valid: true,
      password: null,
      passwordRules: [
        v => !!v || 'Name is required',
      ],
      email: null,
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
