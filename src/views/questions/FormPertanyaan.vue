<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title class="primary">
        <span class="text-h3 font-weight-bold white--text"> Tambah Soal </span>
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
          <v-combobox
            v-model="form.jenis"
            :items="items"
            label="Jenis"
            :return-object="false"
          />
          <v-sheet v-if="form.jenis == 'pilihan_ganda'">
            <v-text-field
              v-model="pilihan"
              label="pilihan jawaban"
              @keydown.enter="addPilihan"
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
          :loading="loading"
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
  </v-dialog>
</template>

<script>
  import axios from 'axios'
  const abjad = ('abcdefghijklmnopqrstuvwxyz').split('')
  export default {
    name: 'FormPertanyaan',
    data () {
      return {
        abjad: abjad,
        pilihan: null,
        loading: false,
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
          jenis: null,
          pilihan: [],
          soal: null,
          properties: {},
          quiz_id: null,
        }
      },
      open (id) {
        this.dialog = true
        this.form.quiz_id = id
      },
      addPilihan () {
        this.form.pilihan.push(this.pilihan)
        this.pilihan = null
      },
      process () {
        if (!this.validate()) {
          return
        }
        this.loadingProcess = true
        axios({
          method: 'post',
          url: '/soal/store',
          data: this.form,
        }).then(r => {
          console.log(r)
        }).catch(e => console.log(e)).finally(() => { this.loadingProcess = false })
      },
    },
  }
</script>

<style>

</style>
