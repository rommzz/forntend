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
          Data Soal
        </div>
        <v-btn
          color="primary"
          class="ma-0"
          @click="newDialog = true"
        >
          edit data soal
        </v-btn>
      </v-card-title>
      <template v-if="data.soal">
        <v-list
          subheader
          two-line
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                Judul
              </v-list-item-title>
              <v-list-item-subtitle class="text-body-1">
                {{ data.judul }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                Matpel
              </v-list-item-title>
              <v-list-item-subtitle class="text-body-1">
                {{ data.matpel }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                Jenis
              </v-list-item-title>
              <v-list-item-subtitle class="text-body-1">
                {{ data.jenis }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                Kelas
              </v-list-item-title>
              <v-list-item-subtitle class="text-body-1">
                {{ data.kelas }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-sheet
          class="container"
          elevation="5"
        >
          <v-row>
            <v-col>
              <h3 class="pl-1">
                Soal
              </h3>
            </v-col>
            <v-spacer />
            <v-col class="text-right">
              <v-btn
                color="primary"
                @click="addSoal()"
              >
                tambah soal
              </v-btn>
            </v-col>
          </v-row>
          <v-simple-table>
            <thead>
              <tr>
                <th class="primary--text">
                  No
                </th>
                <th
                  colspan="3"
                  class="primary--text"
                >
                  Soal
                </th>
                <th class="text-right primary--text">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in data.soal"
                :key="index"
              >
                <td>
                  {{ index+1 }}
                </td>
                <td colspan="3">
                  <div style="text-transform: capitalize">
                    {{ item.soal }}
                  </div>
                  <div v-if="item.jenis == 'pilihan_ganda'">
                    <div>
                      <span class="primary--text">a.</span> jembot kreweol
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        color="secondary"
                        v-bind="attrs"
                        v-on="on"
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
        </v-sheet>
      </template>
      <v-card-text v-else>
        belum ada pertanyaan
      </v-card-text>
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
  const abjad = ('abcdefghijklmnopqrstuvwxyz').split('')
  export default {
    name: 'QuestionSoal',
    props: {
      id: {
        type: String,
        default: null,
      },
    },
    data () {
      return {
        abjad: abjad,
        data: {},
        user: this.$store.state.user.user,
        loadingProcess: false,
        valid: true,
        newDialog: false,
        form: this.formObject(),
      }
    },
    created () {
      console.log(this.id)
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
        axios.get('/quiz/' + this.id, {
        }).then(r => {
          this.data = r.data
        }).catch(function (error) {
          console.log(error)
        })
      },
    },
  }
</script>
