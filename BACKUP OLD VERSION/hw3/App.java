package hw3;

import com.kennycason.kumo.nlp.FrequencyAnalyzer;
import com.kennycason.kumo.palette.ColorPalette;
import com.kennycason.kumo.bg.Background;
import com.kennycason.kumo.bg.RectangleBackground;
import com.kennycason.kumo.bg.PixelBoundryBackground;
import com.kennycason.kumo.CollisionMode;
import com.kennycason.kumo.WordCloud;
import com.kennycason.kumo.WordFrequency;
import com.kennycason.kumo.font.KumoFont;
import com.kennycason.kumo.font.scale.LinearFontScalar;
import java.awt.*;
import java.io.*;

public class App {
    public static void main( String[] args ) throws FileNotFoundException, java.io.IOException  {
        final FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        frequencyAnalyzer.setWordFrequenciesToReturn(300);
        frequencyAnalyzer.setMinWordLength(2);


        final java.util.List<WordFrequency> wordFrequencies = frequencyAnalyzer.load("Lyrics.txt");
        
        final Font[] FONTS = new Font[] { 
                new Font("Calibri", Font.PLAIN, 10)
        };
        
        final Dimension dimension = new Dimension(600, 498);
        final WordCloud wordCloud = new WordCloud(dimension, CollisionMode.PIXEL_PERFECT);
        wordCloud.setPadding(2);
        wordCloud.setBackground(new PixelBoundryBackground("stairs.png"));
        wordCloud.setKumoFont(new KumoFont(FONTS[0]));
        wordCloud.setFontScalar(new LinearFontScalar(10, 40));
        wordCloud.setBackgroundColor(null);
        wordCloud.setColorPalette(new ColorPalette(new Color(0x664389),
        		new Color(0x552299), new Color(0x331166)));

        wordCloud.build(wordFrequencies);
        wordCloud.writeToFile("Stairway.png");
    }
}