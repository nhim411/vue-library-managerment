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
      :data.sync="users"
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
        cell-class="has-no-head-mobile is-image-cell"
      >
        <div class="image">
          <img
            :src="props.row.avatar"
            class="is-rounded"
          >
        </div>
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
        label="Email"
        field="email"
        sortable
        searchable
      >
        {{ props.row.email }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Role"
        field="role"
        sortable
        searchable
      >
        {{ props.row.role }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <router-link
            :to="{ name: 'users.edit', params: { id: props.row.id } }"
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
  name: 'UserManagerTable',
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
      if (this.users) {
        return this.users.length > this.perPage
      } else { return false }
    },
    ...mapGetters({ users: 'users' })
  },
  created () {
    this.$store.dispatch('fetchUsers').then(() => {
      this.isLoad = true
    })
  },
  methods: {
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm (id) {
      // confirm remove user
      this.$store.dispatch('deleteUser', id)
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Đã xoá',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
