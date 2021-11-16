<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="primary">
          <span class="text-h3 font-weight-bold white--text"> {{ method == 'store' ? 'Tambah' : 'Edit' }} Soal </span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="form.soal"
              :rules="[
                v => !!v || 'wajib diisi',
              ]"
              placeholder="contoh: Berikut ini yang bukan merupakan ciri hewan amfibi ialah..."
              label="Soal"
              required
            />
            <v-select
              v-model="form.jenis"
              :items="items"
              label="Jenis"
              :return-object="false"
            />
            <v-sheet v-if="form.jenis == 'pilihan_ganda'">
              <v-text-field
                v-model="pilihan"
                label="pilihan jawaban"
                @keydown.enter="pilihan && addPilihan()"
              />
              <template v-if="form.pilihan.length">
                <div
                  v-for="(item, index) in form.pilihan"
                  :key="index"
                >
                  <span>{{ abjad[index] + '. ' + item }}</span>
                </div>
              </template>
            </v-sheet>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="process()"
          >
            Simpan
          </v-btn>
          <v-btn
            color="secondary"
            @click="resetValidation(); dialog = false"
          >
            Batal
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-overlay
        class="text-center"
        :value="overlay"
      >
        <v-progress-circular
          indeterminate
          size="64"
          class="mb-5"
        />
        <div>
          Menambahkan data ...
        </div>
      </v-overlay>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.value"
      :timeout="1"
      top
      :color="snackbar.color"
      right
      text
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
  import axios from 'axios'
  const abjad = ('abcdefghijklmnopqrstuvwxyz').split('')
  export default {
    name: 'FormPertanyaan',
    data () {
      return {
        snackbar: {
          value: false,
          message: null,
          color: null,
        },
        method: null,
        overlay: false,
        abjad: abjad,
        pilihan: null,
        valid: true,
        dialog: false,
        form: this.getClearForm(),
        items: [
          {
            text: 'Pilihan ganda',
            value: 'pilihan_ganda',
          },
          {
            text: 'Uraian',
            value: 'uraian',
          },
          {
            text: 'Pertanyaan',
            value: 'pertanyaan',
          },
        ],
      }
    },
    watch: {
      dialog: function (val) {
        if (!val) {
          this.form = this.getClearForm()
          this.resetValidation()
        }
      },
    },
    methods: {
      validate () {
        return this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      getClearForm () {
        return {
          id: null,
          jenis: null,
          pilihan: [],
          soal: null,
          properties: {},
          quiz_id: null,
        }
      },
      open (id, method, data) {
        this.form.quiz_id = id
        this.method = method
        if (method === 'patch') {
          this.form = data
          console.log(this.form)
        }
        this.dialog = true
      },
      addPilihan () {
        this.form.pilihan.push(this.pilihan)
        this.pilihan = null
      },
      process () {
        if (!this.validate()) {
          return
        }
        this.overlay = true
        axios({
          method: this.method === 'store' ? 'post' : 'patch',
          url: '/soal/' + (this.method === 'store' ? 'store' : 'update'),
          data: this.form,
        }).then(r => {
          console.log(r)
          this.snackbar.message = 'Data berhasil ditambahkan.'
          this.snackbar.color = 'primary'
          this.pilihan = null
          this.form = this.getClearForm()
          this.resetValidation()
          this.$emit('passResult', r.data)
        }).catch(e => {
          console.log(e)
          this.snackbar.message = 'Data gagal ditambahkan.'
          this.snackbar.color = 'red'
        }).finally(() => {
          this.overlay = false
          this.snackbar.value = true
          this.dialog = false
        })
      },
    },
  }
</script>

<style>

</style>
