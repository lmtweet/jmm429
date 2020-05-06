const flightPath = {
    //curvy-ness: amount of curve that the animation is going to take i.e. how smooth it is
    curviness: 1.25,
    autoRotate: false,
    //points that you want to animate to
    values: [
        {x: 0, y: 350,}
    ],
    width: 200,
    
    
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to('.maineSwing', 1,{
        bezier: flightPath,
        ease: Power1.easeInOut,
        width: 110,
        
    })
)

const controller = new ScrollMagic.Controller();



const scene = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 1000,
    triggerHook: 0.5,
})

.setTween(tween)
.addIndicators()
.addTo(controller);


const bargraph = {
    //curvy-ness: amount of curve that the animation is going to take i.e. how smooth it is
    curviness: 1.25,
    autoRotate: false,
    //points that you want to animate to
    values: [
        {x: 0, y: 350,}
    ],
    width: 200,
    
    
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to('.arizona_colorado', 1,{
        bezier: bargraph,
        ease: Power1.easeInOut,
        width: 110,
        
    })
)

const controller = new ScrollMagic.Controller();



const scene = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 1000,
    triggerHook: 0.75,
})

.setTween(tween)
.addIndicators()
.addTo(controller);