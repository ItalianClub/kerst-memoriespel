/* Algemene reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body en algemene styling */
body {
  font-family: 'Montserrat', sans-serif;
  background-color: #ebe5dc; /* Zachte achtergrond */
  color: #4d4d4d;
  text-align: center;
}

/* Header styling */
header {
  background-color: #e6ded0; /* Huisstijl beige */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  margin-bottom: 10px;
}

.logo {
  width: 150px;
}

.title {
  font-family: 'Your-Italian-Script-Font', serif; /* Speciaal lettertype */
  font-size: 2.8em;
  color: #9c1925; /* Diep Italiaans rood */
}

.subtitle {
  font-size: 1.2em;
  color: #4d4d4d;
}

/* Speelbord */
#game-board {
  display: grid;
  grid-template-columns: repeat(5, 120px);
  grid-gap: 15px;
  justify-content: center;
  margin: 30px auto;
  max-width: 90%;
}

/* Kaarten */
.card {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  border-radius: 10px;
}

.card.flipped {
  transform: rotateY(180deg);
}

/* Voorkant en achterkant */
.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card .front {
  background-color: #e6ded0; /* Huisstijl beige */
  color: transparent;
  background-image: url('kerst-icoon.png'); /* Voeg een kersticoon toe */
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
}

.card .back {
  background-color: #9c1925; /* Italiaans rood */
  color: #ffffff;
  transform: rotateY(180deg);
}

/* Footer */
footer {
  background-color: #9c1925;
  color: #e6ded0;
  padding: 10px 0;
  margin-top: 20px;
  font-size: 1em;
}
