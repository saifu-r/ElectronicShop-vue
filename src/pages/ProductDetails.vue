<template>
    <div class="container">
        <div class="section__image">
            <img :src="image" alt="image">
        </div>
        <div class="section__details">
            <div class="section__product__name">
                <h2>{{ prodName }}</h2>
            </div>
            <div class="section__product__brand">
                <h3>Brand: {{ brand }}</h3>
            </div>
            <div class="section__product__description">
                <p>Details: {{ description }}</p>
            </div>
            <div class="section__product__price">
                <base-badge :title='price' type="price"></base-badge>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";


export default defineComponent({
    props: ['prodName'],
    setup(props) {
        const store = useStore()
        const selectedProduct= ref('')

        onBeforeMount(()=>{
            selectedProduct.value= store.getters.products.find((product)=> product.name=== props.prodName)
        })

        const brand= computed(()=>{
            return selectedProduct.value.brand
        })
        const description= computed(()=>{
            return selectedProduct.value.description
        })
        const price= computed(()=>{
            return selectedProduct.value.price
        })
        const image= computed(()=>{
            return selectedProduct.value.imageUrl
        })

        return {selectedProduct, brand, description, price, image}

    },
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    padding: 80px;
    gap: 40px;
}

.section__image img {
    width: 400px;
    height: 400px;
}

.section__details {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 700px;
}
</style>