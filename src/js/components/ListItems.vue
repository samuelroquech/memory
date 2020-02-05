<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{title}}</h1>

    <div class="w-full flex justify-center">
      <div class="w-1/2">
        <div>
          <vuetable ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :per-page="perPage"
            :data-manager="dataManager"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
            class="w-full"
          >
            <div slot="actions" slot-scope="props">
              <button 
                class="ui small button" 
                @click="onActionClicked('edit-item', props.rowData)"
              >
                <i class="edit icon">e</i>e
              </button>
              <button 
                class="ui small button" 
                @click="onActionClicked('delete-item', props.rowData)"
              >
                <i class="delete icon">b</i>b
              </button>
            </div>
          </vuetable>
        </div>
        
        <div class="w-full my-5">
          <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage" :css="css.pagination"></vuetable-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Vuetable, VuetablePagination} from "vuetable-2";

import _ from "lodash";

export default {
  name: "default",
  props: ['items'],
  components: {
    Vuetable,
    VuetablePagination
  },
  data() {
    return {
      title: "Lista de Temas",
      fields: [
        {
          name:'tags',
          title:'Tema',
          sortField: 'tags',
          titleClass: 'w-1/4 px-4 py-2',
          dataClass: 'border px-4 py-2'
        },{
          name:'text',
          title:'Texto',
          sortField: 'text',
          titleClass: 'w-2/4 px-4 py-2',
          dataClass: 'border px-4 py-2'
        },
        {
          name:'actions',
          title:'Actions',
          titleClass: 'w-1/4 px-4 py-2',
          dataClass: 'border px-4 py-2'
        }
      ],
      perPage: 10,
      data : [],
      css: {
        pagination: {
          wrapperClass: 'flex list-reset border border-grey-light rounded w-auto',
          activeClass: 'active text-white bg-teal-500',
          disabledClass: 'disabled',
          pageClass: 'block text-blue border-r border-grey-light px-3 py-2',
          linkClass: 'icon item',
          paginationClass: 'ui bottom attached segment grid',
          paginationInfoClass: 'left floated left aligned six wide column',
          dropdownClass: 'ui search dropdown',
          icons: {
            first: 'angle double left icon',
            prev: 'left chevron icon',
            next: 'right chevron icon',
            last: 'angle double right icon',
          }
        }
      }
    };
  },
  watch: {
    items: function(val){
      this.$refs.vuetable.refresh()
    }
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
     
      if (this.items.length < 1) return;

      console.log(this.items);

      let local = _.reverse(JSON.parse(JSON.stringify(this.items)));
      
      _.map(local, (o) => { 
        const tags = o.tags;
        
        o.tags = [];
        _.map(tags, (u) => { 
          if(_.trim(u.text).length)
            o.tags.push(u.text);
        });
        o.tags = _.join(o.tags,", ");
        o.text = _.truncate(o.text, {'length': 40, 'separator': ' ','omission': ' [...]'})
      });

      if (sortOrder.length > 0) {
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        );
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      );
      
      let from = pagination.from - 1;
      let to = from + this.perPage;

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      };
    },
    onActionClicked(action, data) {
      console.log("slot actions: on-click", data.name);
    }
  }
};
</script>

