
if (!customElements.get('carousel-slider')) {
	class CarouselSlider extends HTMLElement {
		constructor() {
			super()
			this.container = this.querySelector('.products-grid-container')
			this.content = this.querySelector('.slider__grid')
			this.scrollbar = this.querySelector('.scrollbar')
			this.thumb = this.querySelector('.thumb')
			this.showMoreBtn = this.querySelector('.show-more')
			this.isDragging = false
			this.startX
			this.scrollLeft

			this.init()
		}

		async init() {
            await this.addProducts()
			this.slides = this.querySelectorAll('.slider__item')

			this.initSlider()
			this.updateScrollbar()
			this.hideProductsOnMobile()
			if (this.showMoreBtn) {
				this.showMoreBtn.addEventListener('click', () => this.toggleProducts())
			}
		}

		initSlider() {
			this.addListeners()
		}

        async addProducts(){
            const res = await fetch('./products.json')
            const products =  await res.json()
            let html = ''
            products.forEach(product => {
                html += `
                <li class="slider__item w-[42vw] md:w-[18.5vw]">
                <product-card class="flex flex-col relative h-full" title="${product.title}" price="${product.price}" reviews="${product.reviews}" image="${product.image}" hoverImage="${product.hoverImage}" labels="${product.labels}">
                </product-card>
                </li>`
            });
            this.content.innerHTML = html
            
        }

		addListeners() {
			this.thumb.addEventListener('mousedown', this.handleMouseDown)
			document.addEventListener('mousemove', this.handleMouseMove)
			document.addEventListener('mouseup', this.handleMouseUp)
			this.content.addEventListener('scroll', () => {
				const scrollPercentage = this.content.scrollLeft / (this.content.scrollWidth - this.container.offsetWidth)
				const thumbPosition = scrollPercentage * (this.scrollbar.offsetWidth - this.thumb.offsetWidth)
				this.thumb.style.left = `${thumbPosition}px`
			})

			window.addEventListener('resize', this.updateScrollbar)
			window.addEventListener('resize', this.hideProductsOnMobile)

			this.container.addEventListener(
				'wheel',
				(e) => {
					if (e.deltaX !== 0 || e.shiftKey) {
						e.preventDefault()
						this.content.scrollLeft += e.deltaX || e.deltaY
						this.updateScrollbar()
					}
				},
				{ passive: false }
			)
		}

		// scrollbar:
		updateScrollbar = () => {
			const contentWidth = this.content.scrollWidth
			const containerWidth = this.container.offsetWidth

			const scrollbarWidth = containerWidth * (containerWidth / contentWidth)

			this.thumb.style.width = `${scrollbarWidth}px`

			const scrollPercentage = this.content.scrollLeft / (this.content.scrollWidth - this.container.offsetWidth)
			const thumbPosition = scrollPercentage * (this.scrollbar.offsetWidth - this.thumb.offsetWidth)
			this.thumb.style.left = `${thumbPosition}px`
		}

		handleMouseDown = (e) => {
			this.isDragging = true
			this.startX = e.pageX - this.thumb.offsetLeft
			this.scrollLeft = this.content.scrollLeft
		}

		handleMouseMove = (e) => {
			if (!this.isDragging) return
			const x = e.pageX - this.startX
			const scrollPercentage = x / (this.scrollbar.offsetWidth - this.thumb.offsetWidth)
			this.content.scrollLeft = scrollPercentage * (this.content.scrollWidth - this.container.offsetWidth)
		}

		handleMouseUp = () => {
			this.isDragging = false
		}

		hideProductsOnMobile = () => {
            if (this.slides.length <= 0) return
			const isMobile = window.outerWidth <= 767

			if (isMobile) {
				this.isExpanded = false
				this.showMoreBtn.textContent = 'Show More'

				this.slides.forEach((slide, index) => {
					if (index >= 4) slide.classList.add('remove')
				})
			} else {
				this.slides.forEach((slide) => slide.classList.remove('remove'))
			}
		}

		toggleProducts() {
			if (!this.slides) return

			this.isExpanded = !this.isExpanded
			this.slides.forEach((slide, index) => {
				if (index >= 4) slide.classList.toggle('remove', !this.isExpanded)
			})

			this.showMoreBtn.textContent = this.isExpanded ? 'Show Less' : 'Show More'
		}
	}

	customElements.define('carousel-slider', CarouselSlider)
}
