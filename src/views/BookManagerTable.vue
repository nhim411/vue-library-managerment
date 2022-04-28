<template>
  <div v-if="isLoad">
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null"
      @confirm="trashConfirm(trashObject.id)"
      @cancel="trashCancel"
    />

    <b-table
      :paginated="paginated"
      :per-page="perPage"
      :data.sync="books"
      :debounce-search="500"
      default-sort="name"
      hoverable
    >
      <b-table-column
        v-slot="props"
        width="80"
        b-table-column
        field="id"
        label="ID"
        numeric
        sortable
        searchable
      >
        {{
          props.row.id
        }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Name"
        field="name"
        sortable
        searchable
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Category"
        field="category"
        sortable
        searchable
      >
        {{ props.row.category }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Author"
        field="author"
        sortable
        searchable
      >
        {{ props.row.author }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Inventory"
        field="inventory"
        sortable
        searchable
      >
        {{ props.row.inventory }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <router-link
            :to="{ name: 'books.edit', params: { id: props.row.id } }"
            class="button is-small is-info"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          <b-button
            type="is-danger"
            size="is-small"
            @click.prevent="trashModalOpen(props.row)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button>
        </div>
      </b-table-column>

      <section
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Nothing's here&hellip;</p>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalBox from '@/components/ModalBox.vue'

export default {
  name: 'BookManagerTable',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      isLoad: false,
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },
  computed: {
    paginated () {
      if (this.books) {
        return this.books.length > this.perPage
      } else { return false }
    },
    ...mapGetters({ books: 'books' })
  },
  created () {
    this.$store.dispatch('fetchBooks').then(() => {
      this.isLoad = true
    })
  },
  methods: {
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm (id) {
      // confirm remove
      this.$store.dispatch('deleteBook', id)
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
