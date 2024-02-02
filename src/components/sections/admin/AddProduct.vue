<template>
    <div class="container">
        <base-card>
            <form @submit.prevent="saveProduct">
                <h2>Add a product</h2>
                <div class="form-control">
                    <label for="name">Name of the product:</label>
                    <input type="text" name="name" id="name" v-model="selectedName">
                </div>
                <div class="form-control">
                    <label for="category">Please select the catagory of the item: </label>
                    <select name="category" id="category" v-model="selectedCategory" @change="updateBrands">
                        <option value="phone">Phone</option>
                        <option value="laptop">Laptop</option>
                        <option value="tv">TV</option>
                        <option value="headphone">Headphone</option>
                        <option value="smart-watch">Smart Watch</option>
                        <option value="camera">Camera</option>
                        <option value="printer">Printer</option>
                        <option value="monitor">Monitor</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="mouse">Mouse</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="brand">Please select the brand: </label>
                    <select name="category" id="category" v-model="selectedBrand">
                        <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="description">Description of the product:</label>
                    <textarea name="description" id="description" cols="30" rows="5"
                        v-model="selectedDescription"></textarea>
                </div>
                <div class="form-control">
                    <label for="price">Price of the product:</label>
                    <input type="number" name="price" id="price" min="100" v-model="selectedPrice">
                </div>
                <div class="form-control">
                    <label for="photo">Upload the product photo here:</label>
                    <input type="file" name="photo" id="photo" @change="handleFileChange" ref="fileInput">
                </div>
                <div class="lower-container">
                    <base-button>Add</base-button>
                </div>

            </form>
        </base-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";


export default defineComponent({
    setup() {
        const store = useStore()
        const selectedCategory = ref('')
        const selectedBrand = ref('')
        const availableBrands = ref<string[]>([]);

        const getBrandsForCategory = (category: string) => {
            switch (category) {
                case 'phone':
                    return ['Apple', 'Samsung', 'Google', 'Redmi', 'HTC', 'OnePlus'];
                case 'laptop':
                    return ['Dell', 'HP', 'Lenovo'];
                case 'tv':
                    return ['Samsung', 'Sony', 'LG', 'Panasonic', 'TCL'];
                case 'headphone':
                    return ['Sony', 'Bose', 'Sennheiser'];
                case 'smart-watch':
                    return ['Apple', 'Samsung', 'Fitbit', 'Pixel'];
                case 'camera':
                    return ['Canon', 'Nikon', 'Sony'];
                case 'printer':
                    return ['HP', 'Epson', 'Brother'];
                case 'monitor':
                    return ['Dell', 'LG', 'Samsung', 'HP', 'Xiomi',];
                case 'keyboard':
                    return ['Logitech', 'Razer', 'Corsair'];
                case 'mouse':
                    return ['SteelSeries', 'Microsoft', 'Logitech'];
                default:
                    return [];
            }
        };

        const updateBrands = () => {
            availableBrands.value = getBrandsForCategory(selectedCategory.value);
            selectedBrand.value = ''; // Reset selected brand when the category changes
        };

        // Watch for changes in the selected category
        watch(selectedCategory, () => {
            updateBrands();
        });

        //for uploading data
        const selectedName = ref('')
        const selectedDescription = ref('')
        const selectedPrice = ref()
        const selectedPhoto = ref()

        const handleFileChange = (event: Event) => {
            const fileInput = event.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            selectedPhoto.value = file
        }

        const saveProduct = () => {
            const productData = {
                name: selectedName.value,
                price: selectedPrice.value,
                description: selectedDescription.value,
                category: selectedCategory.value,
                brand: selectedBrand.value,
                photo: selectedPhoto.value
            }
            store.dispatch('saveProduct', productData)
        }
        return { selectedName, selectedCategory, selectedBrand, availableBrands, updateBrands, selectedDescription, selectedPrice, selectedPhoto, handleFileChange, saveProduct }
    },
});
</script> 

<style scoped>

.form-control {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    gap: 10px;
}

input {
    height: auto;
    width: 300px;
    padding: 5px;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccc;
}

.lower-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;

}

button {

    padding: 12px;
    width: 300px;
}
</style>