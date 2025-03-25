if (!customElements.get('product-card')) {
	class ProductCard extends HTMLElement {
		constructor() {
			super()
		}

		connectedCallback() {
			this.render()
		}

		render() {
			const featuredImage = this.getAttribute("image") || 'placeholder.jpg'
			const hoverImage = this.getAttribute("hoverImage") || 'placeholder.jpg'
            const title = this.getAttribute("title") || "Something special"
            const price = this.getAttribute("price") || "9.99"
            const reviews = this.getAttribute("reviews")
            const labels = this.getAttribute("labels")

			this.innerHTML = `
            <label-container class="absolute top-0 start z-1 flex justify-between mt-4 w-[90%]" style="justify-self: anchor-center" labels="${labels}"></label-container>
            <figure class="card__media relative rounded-[10px] w-[42vw] h-[42vw] md:w-[18.5vw] md:h-[18.5vw]">
                <a href="*" class="block rounded-[10px] pt-[100%]">
                    <img src="${featuredImage}" alt="" class="block rounded-[10px] object-cover absolute w-full h-full top-[0px] left-[0] card__main-image">
                    <img src="${hoverImage}" alt="" class="invisible opacity-[0] rounded-[10px] object-cover absolute block w-full h-full top-[0px] left-[0] card__hover-image">
                </a>
            </figure>
            <section class="flex flex-col flex-auto relative inline-block mx-4 mt-5">
                <h5 class="font-subtitle text-[16px] md:text-[18px] tracking-[1px] text-[#1C1D1D]">
                    ${title}
                </h5>
                <div class="">
                    <span class="text-[#1C1D1D]">★★★★★</span>
                    <span class="text-[11px] md:text-[12px] text-[#707070]">${reviews}</span>
                </div>
                <div class="flex grow items-end">
                    <span class="font-text text-[16px]">USD ${price}</span>
                </div>
            </section>
    `
		}
	}

	customElements.define('product-card', ProductCard)
}
