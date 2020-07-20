let data;
fetch("quotes.json")
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        this.data = json;
        main(this.data);
    });

function main(data) {
    Vue.component("quotecard", {
        template: `
        <div class="row justify-content-end">
            <div class="card my-5">
                <div class="card-body">
                    <transition name="slide-fade">
                        <div v-if="show" class="card-text">
                            <p>"{{ currentQuote }}"</p>
                        </div>
                    </transition>
                </div>
            </div>
            <button v-on:click="newQuote" class="btn btn-primary w-25">
                New Quote
            </button>
        </div>
        `,
        data: function () {
            return {
                quotes: data,
                currentQuote: data[0],
                currentInt: 0,
                show: true,
            };
        },
        methods: {
            newQuote: function () {
                this.show = false;
                let randInt = Math.floor(Math.random() * this.quotes.length);
                while (this.currentInt === randInt) {
                    randInt = Math.floor(Math.random() * this.quotes.length);
                }
                this.currentQuote = this.quotes[randInt];
                this.currentInt = randInt;
            },
        },
        updated: function () {
            this.show = true;
        },
    });

    new Vue({
        el: "#app",
    });
}
