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
      <div
        v-if="loadingData"
        class="pa-11 text-center"
      >
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        />
      </div>
      <template v-else>
        <v-card-title
          class="d-flex justify-space-between align-center"
        >
          <div
            class=""
            @click="snackbar = true"
          >
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
        <template v-if="data.soal.length">
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
                  <td
                    colspan="3"
                    :class="item.jenis == 'pilihan_ganda' ? 'py-2' : ''"
                  >
                    <div style="text-transform: capitalize">
                      {{ item.soal }}
                    </div>
                    <div v-if="item.jenis == 'pilihan_ganda'">
                      <div
                        v-for="(pilihan, idx) in item.pilihan"
                        :key="idx"
                      >
                        <span class="primary--text">{{ abjad[idx] }}</span> {{ pilihan }}
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
                          @click="editSoal(item)"
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
                          @click="deleteSoal(item, index)"
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
        <v-card-text
          v-else
          class="d-flex justify-space-between align-center"
        >
          <div class="text-center text-capitalize">
            belum ada pertanyaan
          </div>
          <v-btn
            color="primary"
            class="mr-0"
            @click="addSoal()"
          >
            tambah soal
          </v-btn>
        </v-card-text>
      </template>
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
            class="mr-0"
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
    <form-pertanyaan
      :id="data.id"
      ref="formPertanyaan"
      @passResult="v => data.soal = v"
    />
    <v-dialog
      v-model="deleteDialog"
      max-width="300"
      :persistent="overlay"
    >
      <v-overlay
        :value="overlay"
      >
        <div class="d-flex flex-column">
          <v-progress-circular
            class="mx-auto mb-2"
            indeterminate
            size="64"
          />
          <span>menhapus data ...</span>
        </div>
      </v-overlay>
      <v-card>
        <v-card-text class="text-center">
          <v-btn
            class=""
            text
            @click="deleteDialog = false"
          >
            Yakin menghapus soal "{{ deleteData.soal }}" ?
          </v-btn>

          <v-btn
            color="success"
            text
            @click="confirmDelete(deleteData)"
          >
            Ya
          </v-btn>
          <v-btn
            color="red"
            text
            @click="deleteDialog = false"
          >
            Batal
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      timeout="1"
      top
      color="primary"
      right
      text
    >
      data berhasil dihapus
    </v-snackbar>
  </v-container>
</template>
<script>
  import axios from 'axios'
  import formPertanyaan from './FormPertanyaan.vue'
  const abjad = ('abcdefghijklmnopqrstuvwxyz').split('')
  export default {
    name: 'QuestionSoal',
    components: {
      formPertanyaan,
    },
    props: {
      id: {
        type: String,
        default: null,
      },
    },
    data () {
      return {
        loadingData: false,
        deleteDialog: false,
        deleteData: {},
        abjad: abjad,
        data: {},
        snackbar: false,
        user: this.$store.state.user.user,
        loadingProcess: false,
        overlay: false,
        valid: true,
        newDialog: false,
        form: this.formObject(),
      }
    },
    created () {
      this.getData()
    },
    methods: {
      addSoal () {
        this.$refs.formPertanyaan.open(this.data.id, 'store')
      },
      editSoal (item) {
        const data = Object.assign({}, item)
        console.log(data)
        this.$refs.formPertanyaan.open(this.data.id, 'patch', data)
      },
      deleteSoal (item, index) {
        this.deleteData = Object.assign(item, { index: index })
        console.log(this.deleteData)
        this.deleteDialog = true
      },
      confirmDelete (item) {
        this.overlay = true
        axios.delete('/soal/destroy/' + item.id).then(() => {
          console.log('data dihapus')
          this.data.soal.splice(item.index, 1)
        }).catch(e => { console.log(e) }).finally(() => {
          this.deleteDialog = false
          this.overlay = false
        })
      },
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
        this.loadingData = true
        axios.get('/quiz/' + this.id, {
        }).then(r => {
          this.data = r.data
        }).catch(function (error) {
          console.log(error)
        }).finally(() => { this.loadingData = false })
      },
    },
  }
</script>
