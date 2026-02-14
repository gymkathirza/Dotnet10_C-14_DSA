namespace DSA;

public class Random_algo
{
    // C# program to print 1 with 75% probability and 0 
// with 25% probability 


public class GFG
{
    // Instantiate random number generator
    static readonly Random rand = new Random();
    
    // Random Function to that returns 0 or 1 with 
    // equal probability 
    static int Rand50()
    {

        
        // rand() function will generate 1 or 0 
        // with equal probability
        return rand.Next(0, 2);
    }

    // Random Function to that returns 1 with 75% 
    // probability and 0 with 25% probability using 
    // Bitwise OR 
    static int Rand75()
    {
        return Rand50() & Rand50();
    }
	
    public static void Main(string[] args)
    {
		var dict = new Dictionary<int, int>();
        for (int i = 0; i < 50; i++)
        {
            var random = Rand75();
			if(dict.ContainsKey(random))
			{
				dict[random] += 1;
				continue;
			}
			dict[random] = 1;
        }
		
		foreach(var kv in dict)
		{
			var per = (((double)kv.Value/50)) * 100;
			Console.WriteLine($"key: {kv.Key}, value: {kv.Value}, per: {per}");
		}
    }
}

//this code is contributed by phasing17
}