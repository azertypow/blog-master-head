export class FontIsLoading {

  fontIsLoaded = false

  private canvas = document.createElement("canvas")
  private context = this.canvas.getContext("2d") as CanvasRenderingContext2D

  constructor(private fontFamilyName: string, private onFontLoaded: () => void ) {

    this.testStringLength()

    document.body.appendChild( this.canvas )
    this.canvas.width = 1200
    this.canvas.height = 5000

  }

  private setInterval = window.setInterval(() => {

    this.testStringLength()

  }, 1000)

  private testStringLength() {

    const text = "QW@HhsXJ"

    // ref font width
    this.context.font = `1000px initial`
    const referenceFontWidth = this.context.measureText( text ).width
    this.context.fillText("text test", 0, 1000)

    // loading test font width
    this.context.font = `1000px ${this.fontFamilyName}`
    const loadingTestFontWidth = this.context.measureText( text ).width

    console.log( "----" )
    console.log( "referenceFontWidth: ", referenceFontWidth )
    console.log( "loadingTestFontWidth: ", loadingTestFontWidth )
    console.log( "referenceFontWidth !== loadingTestFontWidth: ", referenceFontWidth !== loadingTestFontWidth )

    this.context.fillText("text test", 0, 2000)

    // if( referenceFontWidth !== loadingTestFontWidth ) {
    //   this.fontLoaded()
    // }
  }

  private fontLoaded() {
    window.clearInterval( this.setInterval )
    this.fontIsLoaded = true
    this.onFontLoaded()
  }
}
