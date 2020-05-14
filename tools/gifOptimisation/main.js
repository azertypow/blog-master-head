import imagemin from "imagemin"
import imageminGifsicle from "imagemin-giflossy"


imagemin(["resources/Soft Robots/hJnlkyt.gif"], {
    destination: "resources/test/",
    plugins: [
        imageminGifsicle({
            interlaced: true,
            colors: 50,
            optimizationLevel: 3
        })
    ]
})
