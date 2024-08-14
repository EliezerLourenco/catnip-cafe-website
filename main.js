const app = Vue.createApp({
    data() {
        return {
            product: 'Hill\'s Science Diet - Cat Food', // Product title
            brand: "Hill's", // Product brand
            selectedOption: 0, // Index of the currently selected product option
            cart: 0, // Number of items in the cart
            options: [
                {
                    id: 1010, size: '7lb', price: 89.99, image: "images/hills-7lb.jpg", quantity: 5 // 7lb option with initial stock of 5
                },
                {
                    id: 1020, size: '3lb', price: 39.99, image: "images/hills-3lb.jpg", quantity: 3 // 3lb option with initial stock of 3
                }
            ],
            reviews: [], // Array to store reviews
            reviewName: '', // Model for the name input in the review form
            reviewText: '', // Model for the review text input
            reviewRating: null, // Model for the rating input
        }
    },
    methods: {
        addToCart() {
            let selectedProduct = this.options[this.selectedOption];
            if (selectedProduct.quantity > 0) { // Check if the product is in stock
                selectedProduct.quantity--; // Decrease the stock
                this.cart++; // Increase the cart count
            }
        },
        removeFromCart() {
            let selectedProduct = this.options[this.selectedOption];
            if (this.cart > 0 && selectedProduct.quantity < 5) { // Ensure stock isn't replenished beyond original
                selectedProduct.quantity++; // Increase the stock
                this.cart--; // Decrease the cart count
            }
        },
        updateImage(index) {
            this.selectedOption = index; // Update the selected product option
        },
        submitReview() {
            if (this.reviewName && this.reviewText && this.reviewRating) {
                let newReview = {
                    name: this.reviewName,
                    text: this.reviewText,
                    rating: this.reviewRating // Create a new review object
                };
                this.reviews.push(newReview); // Add the new review to the reviews array
                this.reviewName = '';
                this.reviewText = '';
                this.reviewRating = null; // Reset the form fields
            }
        }
    },
    computed: {
        image() {
            return this.options[this.selectedOption].image; // Return the image of the selected product
        },
        inStock() {
            return this.options[this.selectedOption].quantity > 0; // Check if the selected product is in stock
        },
        title() {
            return this.brand + ' ' + this.product; // Compute the full title of the product
        }
    }
});

app.mount('#app'); // Mount the Vue instance to the element with id 'app'
