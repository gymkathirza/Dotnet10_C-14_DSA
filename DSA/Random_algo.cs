namespace DSA;

// C# program to print 
// 1) 1 with 50% probability and 0 with 50% probability 
// 2) 1 with 75% probability and 0 with 25% probability 
// 3) 1 with 25% probability and 0 with 75% probability 
public class Random_algo
{
    // Instantiate random number generator
    static readonly Random rand = new();

    // Random Function to that returns 0 or 1 with 
    // equal probability 
    static int Rand50() =>
        // rand() function will generate 1 or 0 
        // with equal probability
        rand.Next(0, 2);

    // Random Function to that returns 1 with 75% 
    // probability and 0 with 25% probability using 
    // Bitwise OR 
    static int Rand_1_75_Rand_0_25() => Rand50() | Rand50();

    // Random Function to that returns 1 with 25% 
    // probability and 0 with 75% probability using 
    // Bitwise AND
    static int Rand_1_25_Rand_0_75() => Rand50() & Rand50();

    public static void Run(RAND_ALGO_TYPE algoType, int samplingIterations = 50)
    {
        var dict = new Dictionary<int, int>();
        for (int i = 0; i < samplingIterations; i++)
        {
            var random = algoType switch
            {
                RAND_ALGO_TYPE.Rand50 => Rand50(),
                RAND_ALGO_TYPE.Rand_1_75_Rand_0_25 => Rand_1_75_Rand_0_25(),
                RAND_ALGO_TYPE.Rand_1_25_Rand_0_75 => Rand_1_25_Rand_0_75(),
                _ => 0
            };

            Console.Write($"{random} ");
            if (dict.ContainsKey(random))
            {
                dict[random] += 1;
                continue;
            }
            dict[random] = 1;
        }
        PrintResults(dict);
    }

    private static void PrintResults(Dictionary<int, int> dict)
    {
        Console.WriteLine();
        foreach (var kv in dict)
        {
            var per = (int)((double)kv.Value / 50 * 100);
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