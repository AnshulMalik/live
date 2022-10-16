class Element {
    domElement
    counter
    name
    icon
    username
    constructor({name, icon, username}) {
      this.domElement = document.createElement("div")
      this.domElement.className = "single-item"

      let logoElement = document.createElement("img")
      logoElement.className = "logo"
      logoElement.src = icon
      this.domElement.appendChild(logoElement)

      let nameElement = document.createElement("h2")
      nameElement.className = "name-text"
      nameElement.innerText = name

      this.domElement.appendChild(nameElement)

      this.textElement = document.createElement("h1")
      this.textElement.className = "counter-text"
      this.textElement.innerText = "0"
      
      this.domElement.appendChild(this.textElement)
      this.counter = 0
      this.name = name

    }
  
    updateTo(number) {
      if (number > this.counter) {
        this.incrementTo(number)
      } else if (number < this.counter) {
        this.decrementTo(number)
      }
    }
    incrementTo(number) {
      this.textElement.style.color = "#a8faa8"
      
      animate(this.counter, number, this.textElement).then(() => {
        this.counter = number
        this.textElement.style.color = "#ffffffd6"
      }) 
      
    }
    decrementTo(number) {
      this.textElement.style.color = "#ff0000c7"
      
      animate(this.counter, number, this.textElement).then(() => {
        this.counter = number
        this.textElement.style.color = "#ffffffd6"
      }) 
    }
    
  }
  

  function animate(previous, number, textElement) {
    let timeToAnimate = 1000
    let start = Date.now()
    let diff = number - previous
    
    return new Promise(res => { 
      function onAnimate() {
        let now = Date.now()
        let elapsedPercent = (now - start) / timeToAnimate
        if (elapsedPercent >= 1) {
          elapsedPercent = 1
        }
  
        let numberNow = Math.ceil(diff * elapsedPercent) + previous
        textElement.innerText = numberNow
  
        if (elapsedPercent < 1) {
          requestAnimationFrame(onAnimate.bind(this))
        } else {
          res()
        }
      }

      requestAnimationFrame(onAnimate.bind(this))
    })
  }