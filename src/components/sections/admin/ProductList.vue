<template>
    <base-card>
        <!-- Table name and button row -->
        <div class="table-header">
            <h2 class="table-name">{{ tableName }}</h2>
            <base-button @click="addRow">Add Product</base-button>
        </div>

        <!-- Table headings row -->
        <table>
            <thead>
                <tr class="table-headings">
                    <th>Top-Product</th>
                    <th>Product</th>
                    <th>Price($)</th>
                    <th>Modify</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index" @click="showDetails(product.name)">
                    <td><input type="checkbox" name="topProduct" id="topProduct" v-model="product.topProduct" @click="changeTop(product.name)"></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td class="modification-buttons">
                        <base-button mode="outline" @click.stop="editProduct">Edit</base-button>
                        <base-button mode="outline" @click.stop="deleteProduct(product.name)">Delete</base-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </base-card>

    <base-dialog v-if="openAddDialog" title="Add New Product" @close="confirmError">
        <template #default>
            <add-product></add-product>
        </template>

        <template #actions>
            <base-button mode="flat" @click="confirmError">Close</base-button>
        </template>
    </base-dialog>
</template>
  
<script lang="ts">
import { ref, onMounted, computed, defineComponent } from "vue";
import AddProduct from './AddProduct.vue'
import { useStore } from "vuex";
import Product from '@/types/Product'


export default defineComponent({
    components: { AddProduct },
    setup() {
        const store = useStore();
        const products = computed<Product[]>(() => store.getters.products);
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
        const fetchData = async () => {
            await store.dispatch('fetchProducts')
        };

        onMounted(() => {
            fetchData();
        });

        const showDetails = (product: string) => {
            // alert(product)
            console.log(product);
            
        }

        const editProduct = () => {
            console.log("hello");
        }
        const deleteProduct = (name: string) => {
            store.dispatch('deleteProduct', name);
            alert("Deleting: " + name);
            fetchData();
        }

        const changeTop= (name: string)=>{
            // alert(name)
            store.dispatch('changeTop', name)
            fetchData();
        }
        return {
            tableName,
            addRow,
            openAddDialog,
            confirmError, products, showDetails, editProduct, deleteProduct, changeTop
        };
    },
});
</script>
  
<style scoped>
.table-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.table-name {
    margin: 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th,
td {
    padding: 30px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.table-headings {
    font-weight: bold;
}

.modification-buttons {
    display: flex;
    gap: 10px;
}
input{
    margin: 0;
    padding: 0;
}
</style>
  