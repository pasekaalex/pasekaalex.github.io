package hw3;
import java.io.*;
import java.util.*;

public class WordCount {

	public static HashMap<String, Integer> sortByValue(HashMap<String, Integer> hm) {
		//list of elements of hm
		List<Map.Entry<String, Integer>> list = new LinkedList<Map.Entry<String, Integer> >(hm.entrySet());
		//sort
		Collections.sort(list, new java.util.Comparator<Map.Entry<String, Integer> >() {
	      	public int compare(Map.Entry<String, Integer> o1,
	                           Map.Entry<String, Integer> o2) {
	        	return (o2.getValue()).compareTo(o1.getValue());
	        }
	    });
		//data from sorted list into hashmap
		HashMap<String, Integer> temp = new LinkedHashMap<String, Integer>();
	    	for (Map.Entry<String, Integer> aa : list) {
	    		temp.put(aa.getKey(), aa.getValue());
	    	}
	    	return temp;
	    }
	
	
	public static void main(String[] args) throws IOException {
		//use a hashmap to store words
		HashMap<String,Integer> map = new HashMap<String,Integer>();
		
		//use scanner to read a text file
		File mytxtFile = new File("lyrics.txt");
		Scanner txtFile = new Scanner(mytxtFile);
		while (txtFile.hasNext()) {
			String word = txtFile.next().toLowerCase();
			if(map.containsKey(word)) {
				//increase count to 1 if this word has already appeared in map
				int count = (int) map.get(word) +1 ;
				map.put(word,count);
			}
			else {
				boolean notallowed = false;
				if(word == ("?")) notallowed = true;
				if(word == (",")) notallowed = true;
				if(word == ("(")) notallowed = true;
				if(word == (")")) notallowed = true;
				if(notallowed == false) map.put(word,1);
			}
		}
		System.out.println("Total words = " + map.size());
		txtFile.close();
		HashMap<String, Integer> sortedMapAsc = sortByValue(map);
		
		PrintWriter out = new PrintWriter("WordFrequencyDataResults.txt");
		
		//Report frequencies into output file
		for(String word: sortedMapAsc.keySet()) {
			int count = sortedMapAsc.get(word);
			out.println(count + ":\t"+ word);
		}
		out.flush();
		out.close();
	}

}
