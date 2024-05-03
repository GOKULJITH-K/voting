
    // Animate the circle shape
    anime({
        targets: '#circle',
        translateX: [-120, 120], // Move the circle along the x-axis
        duration: 2000, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function
        loop: true, // Loop the animation
        direction: 'alternate' // Alternate the direction of the animation
    });
    
    // Animate the square shape
    anime({
        targets: '#main',
        scale: [1, 1.1], // Scale the square shape up and down
        duration: 5000, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function
        loop: true, // Loop the animation
        direction: 'alternate' // Alternate the direction of the animation
    });
    anime({
        targets: '#square',
        scale: [1, 1.2], // Scale the square shape up and down
        duration: 1500, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function
        loop: true, // Loop the animation
        direction: 'alternate' // Alternate the direction of the animation
    });

    // Animate the hexagon shape
    anime({
        targets: '#hexagon',
        rotate: [0, 360], // Rotate the hexagon shape 360 degrees
        duration: 2000, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function
        loop: true, // Loop the animation
        direction: 'alternate' // Alternate the direction of the animation
    });

    // Animate the star shape
    anime({
        targets: '#star',
        translateX: [-120, 120], // Move the star along the y-axis
        duration: 2000, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function
        loop: true, // Loop the animation
        direction: 'alternate' // Alternate the direction of the animation
    });