// Cute and Silly (Lindo y divertido)

const cute = [
	"Eres mi persona favorita para hacer tonterías",
	"Te quiero más que a la pizza... ¡y sabes lo mucho que me gusta la pizza!",
	"Si ser bobo contigo está mal, no quiero estar bien", 
	"Siento mariposas en mi estómago con solo pensarte", 
	"Creo que podrías ser una hechicera, porque me tienes embrujado",
]

// Sweet and Heartfelt (Dulce y sincero)
const sweet = [
	"Me enamoro de ti un poco más cada día",
	"Me inspiras a ser una mejor persona", 
	"Eres mi mejor amiga y mi alma gemela",
	"Siempre que me siento perdido, sé que puedo encontrar el camino a casa en tus brazos",
	"No puedo imaginar mi vida sin ti",
]


// Seriously Romantic (Seriamente romántico)
const romantic = [
	"El día que te conocí, mi vida cambió para siempre",
	"Mi corazón te pertenece, ahora y siempre",
	"Eres la mujer más hermosa, inteligente e increíble que conozco",
	"Contigo a mi lado, siento que puedo conquistar el mundo",
	"Iría hasta los confines de la tierra por ti",
]

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

let texts = [...cute, ...sweet, ...romantic]
	.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value);
texts = ['Maria Correa', ...texts]

const morphTime = 12;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();
