if (!customElements.get('label-container')) {
	class ProductLabels extends HTMLElement {
        constructor() {
			super()
		}

		connectedCallback() {
			this.render()
		}

        render() {
            let labels = this.getAttribute('labels')
            if(labels === "undefined") return
            labels = labels.split(",")
            

            let html = ''
            labels.forEach(label => {
                html += 
                `
                <div class="flex border border-black rounded-[100px] w-15 md:w-24 ${label.includes("SAVE") ? "bg-[#5C7962]" : "bg-white"}">
                    <span class="text-[8px] md:text-[10px] m-auto uppercase font-subtitle ${label.includes("SAVE") ? "text-white": ""}">
                        ${label}
                    <span>
                </div>
                `
            });
            this.innerHTML = html
        }
    }
	customElements.define('label-container', ProductLabels)

}
