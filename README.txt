I generated the word frequency using a HashMap in Java.

I used the Kumo Library to construct a word cloud in the shape of a stairway for the lyrics of Stairway to Heaven by Led Zeppelin.

command used to generate word cloud through terminal:
kumo --input "lyrics.txt" --output "stairway.png" --color "(102,51,153),(178,140,217),(57,0,77)" --width 600 --height 498 --background "stairs.png"