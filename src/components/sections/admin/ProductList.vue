<template>
    <base-card>
        <!-- Table name and button row -->
        <div class="table-header">
            <h2 class="table-name">{{ tableName }}</h2>
            <base-button @click="addRow">Add Product</base-button>
        </div>

        <!-- Table headings row -->
        <div class="table-row table-headings">
            <div>Product</div>
            <div>Price(TK)</div>
            <div>Modify</div>
        </div>

        <!-- Table data rows -->
        <div class="table-row" v-for="(product, index) in products" :key="index" @click="showDetails(product.name)">
            <div>{{ product.name }}</div>
            <div>{{ product.price }}</div>
            <div class="modification-buttons">
                <base-button mode="outline">Edit</base-button>
                <base-button mode="outline">Delete</base-button>
            </div>
        </div>
    </base-card>

    <base-dialog v-if="openAddDialog" title="Add New Product" @close="confirmError">
        <template #default>
            <add-product></add-product>
        </template>

        <template #actions>
            <base-button mode="flat" @click="confirmError">Close</base-button>
            <base-button mode="flat" @click="confirmError">Save</base-button>
        </template>
    </base-dialog>
</template>
  
<script lang="ts">
import { ref, onMounted, computed, defineComponent  } from "vue";
import AddProduct from './AddProduct.vue'
import { useStore } from "vuex";


export default defineComponent({
    components: { AddProduct },
    setup() {
        const store = useStore();
        const products = computed(() => store.getters.products);
        const tableName = "Product List";
        const openAddDialog = ref(false)
        const openDetailDialog = ref(false)

        const addRow = () => {
            openAddDialog.value = true
        };
        const confirmError = () => {
            openAddDialog.value = false;
            openDetailDialog.value = false;
        };



        // Function to fetch data from Firestore
        const fetchData = async() => {
            await store.dispatch('fetchProducts')
        };

        onMounted(() => {
            fetchData();
        });

        const showDetails= (product: string)=>{
            alert(product)
        }

        return {
            tableName,
            addRow,
            openAddDialog,
            confirmError, products, showDetails
        };
    },
});
</script>
  
<style scoped>
/* Add your styles for the table here */
.table-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.table-name {
    margin: 0;
}

.table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.table-headings {
    font-weight: bold;
}

.modification-buttons {
    display: flex;
    gap: 10px;
}
</style>
  