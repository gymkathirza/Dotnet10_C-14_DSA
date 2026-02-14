namespace DSA;

public class Random_algo
{
    // C# program to print 1 with 75% probability and 0 
    // with 25% probability 

    // Instantiate random number generator
    static readonly Random rand = new();
    
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
    static int Rand_1_75_Rand_0_25()
    {
        return Rand50() | Rand50();
    }

    // Random Function to that returns 1 with 25% 
    // probability and 0 with 75% probability using 
    // Bitwise AND
    static int Rand_1_25_Rand_0_75()
    {
        return Rand50() & Rand50();
    }
	
    public static void Run(RAND_ALGO_TYPE algoType)
    {
		var dict = new Dictionary<int, int>();
        for (int i = 0; i < 50; i++)
        {
            var random = algoType switch
            {
             RAND_ALGO_TYPE.Rand50 => Rand50(),
             RAND_ALGO_TYPE.Rand_1_75_Rand_0_25 => Rand_1_75_Rand_0_25(),
             RAND_ALGO_TYPE.Rand_1_25_Rand_0_75 => Rand_1_25_Rand_0_75(),
             _ => 0
            };
            
            Console.Write($"{random} ");            
			if(dict.ContainsKey(random))
			{
				dict[random] += 1;
				continue;
			}
			dict[random] = 1;
        }
		Console.WriteLine();
		foreach(var kv in dict)
		{
			var per = (double)kv.Value/50 * 100;
			Console.WriteLine($"key: {kv.Key}, value: {kv.Value}, per: {per}");
		}
    }

    public enum RAND_ALGO_TYPE
    {
        Rand50,
        Rand_1_75_Rand_0_25,
        Rand_1_25_Rand_0_75
    }
}