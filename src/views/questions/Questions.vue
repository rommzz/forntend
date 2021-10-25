<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Simple Tables"
      link="components/simple-tables"
    />

    <v-card>
      <v-card-title
        class="d-flex justify-space-between align-center"
      >
        <div class="">
          Daftar Soal
        </div>
        <v-btn
          color="primary"
          class="ma-0"
          @click="newDialog = true"
        >
          tambah soal
        </v-btn>
      </v-card-title>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Judul Soal
            </th>
            <th class="primary--text">
              Mata pelajaran
            </th>
            <th class="primary--text">
              Kelas
            </th>
            <th class="primary--text">
              Jenis
            </th>
            <th class="text-right primary--text">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="index"
          >
            <td>{{ item.judul }}</td>
            <td>{{ item.matpel }}</td>
            <td>{{ item.kelas }}</td>
            <td>{{ item.jenis }}</td>
            <td class="text-right">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    color="secondary"
                    v-bind="attrs"
                    v-on="on"
                    @click="$router.push({ path: `/questions/${item.id}` })"
                  >
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Edit Soal</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    class="ml-1"
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Hapus Soal</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-dialog
      v-model="newDialog"
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
              v-model="form.judul"
              :rules="[
                v => !!v || 'wajib diisi',
              ]"
              placeholder="contoh: Uts biologi kelas 8b."
              label="Judul"
              required
            />
            <v-text-field
              v-model="form.matpel"
              label="Matpel"
            />
            <v-text-field
              v-model="form.kelas"
              label="Kelas"
            />
            <v-text-field
              v-model="form.jenis"
              label="Jenis"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :loading="loadingProcess"
            @click="process()"
          >
            Simpan
          </v-btn>
          <v-btn
            color="secondary"
            @click="resetValidation(); newDialog = false"
          >
            Batal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'QuestionIndex',
    data () {
      return {
        data: [],
        user: this.$store.state.user.user,
        loadingProcess: false,
        valid: true,
        newDialog: false,
        form: this.formObject(),
      }
    },
    created () {
      this.getData()
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
      formObject () {
        return {
          idUser: JSON.parse(localStorage.getItem('user')).user.id,
          judul: null,
          matpel: null,
          kelas: null,
          jenis: null,
        }
      },
      process () {
        if (!this.validate()) {
          return
        }
        this.loadingProcess = true
        axios({
          method: 'post',
          url: '/quiz/store',
          data: this.form,
        }).then(r => {
          console.log(r)
        }).catch(e => console.log(e)).finally(() => { this.loadingProcess = false })
      },
      getData () {
        axios.get('/quiz', {
          params: {
            id: this.user.id,
          },
        }).then(r => {
          this.data = r.data.data
        }).catch(function (error) {
          console.log(error)
        })
      },
    },
  }
</script>
