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
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
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
        valid: true,
        newDialog: false,
        form: this.formObject(),
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
        axios({
          method: 'post',
          url: '/quiz/store',
          data: this.form,
        }).then(r => {
          console.log(r)
        })
      },
    },
  }
</script>
