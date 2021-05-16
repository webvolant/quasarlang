<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-form class="q-gutter-md" ref="form">
        <q-input filled dense v-model="item.text" label="Фраза" hint="" lazy-rules :rules="[ val => val && val.length > 0 || 'Обязательное поле']"/>
        <q-input filled dense v-model="item.text_translated" label="Translation" hint="" lazy-rules :rules="[ val => val && val.length > 0 || 'Обязательное поле']"/>

        <div>
          <q-btn label="Save" @click="onSubmit()" color="primary"/>
        </div>
      </q-form>
      <br/>

      <div class="row">
        <div class="col">
          <q-table title="Items" dense :data="data" :columns="columns" row-key="name">

          </q-table>
        </div>
      </div>

    </div>

  </q-page>
</template>
<!--@added="addedFilesFunc"-->

<script>
export default {
  data () {
    return {
      item:{
        text: '',
        text_translated: '',
      },
      data:[],
      /*item:{
        status: 1,
        description: '',
        title: '',
        slug: '',
        files: [],
      },*/
      columns: [
        { name: 'text', label: 'Text', field: 'text', align: 'left'},
        { name: 'text_translated', label: 'Translation', field: 'text_translated', align: 'left'},
      ],
    }
  },
  watch: {
    //'item.title'(newVal, oldVal){ if(this.$route.params.id === 'new') { console.log('changed title'); this.item.slug = this.convertStrToSlug(this.item.title) } },
  },
  created(){
    this.getItems();
  },
  mounted(){
  },
  methods: {
    getItems: function () {
      console.log('getItems');
      this.$axios.get(this.globalConstants.apiUrl + 'items').then((response) => {
        console.log(response)
        this.data = response.data.items
      })
        .catch(() => {
          this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
        })
    },
    /*getItem: function () {
      const that = this
      let id = this.$route.params.id
      this.$axios.get(this.globalConstants.apiUrl + 'items/'+id).then((response) => {
        //console.log(response)
        this.item = response.data.item
        this.tags = response.data.tags
        this.authors = response.data.authors

        that.$refs.formFields = []

        this.item.files.forEach(function (value, index) {
          //console.log(value)
          that.addons[value.name] = value.title;
        })

        //this.addons['1613332051_patrul-1.mp3'] = 'new';
        //const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png'
      })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: error.message
          })
        })
    }, */
    onSubmit: function () {
      const that = this
      this.$refs.form.validate().then(success=>{

        let fd = new FormData();

        /*if (this.editing===true) {
          fd.append("id", this.$route.params.id)
        }*/

        fd.append("text", this.item.text)
        fd.append("text_translated", this.item.text_translated)

        const headers = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$axios.post(this.globalConstants.apiUrl + 'item/save', fd, headers).then((response) => {
          //let slug = response.data.item.slug
          that.getItems();
        })
          .catch((error) => {
            console.log(error)
            this.$q.notify({
              type: 'negative',
              message: error.message
            })
          })
      })
    }
  }
}
</script>
